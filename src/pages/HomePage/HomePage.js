/* eslint-disable no-unused-vars */
import Vue from "vue";
import * as sql from "boot/initSQLite";
import * as sp from "boot/sharedPref";
import { Loading } from "quasar";
export default {
  mixins: [Vue.prototype.$mixinStore],
  name: "PageIndex",
  data() {
    return {
      data: [],
      isShowBG: false,
      showLoading: false,
      saved: 0,
      namaPT: "",
      namaPetugas: "",
      namaKantor: "",
      imgPetugas: "statics/img/no-photo.png"
    };
  },
  methods: {
    async openDialog(param) {
      let response = await this.loadDataUser();
      switch (param) {
        case "download":
          if (response.data.role == "ALL" || response.data.role == "BOARDING") {
            this.dialogDownloadData();
          } else {
            this.showNotif("Anda tidak punya akses untuk aksi ini !");
          }
          break;
        case "sync":
          if (response.data.role == "ALL" || response.data.role == "BOARDING") {
            this.dialogSyncData();
          } else {
            this.showNotif("Anda tidak punya akses untuk aksi ini !");
          }
          break;

        default:
          break;
      }
    },
    dialogDownloadData() {
      this.$q
        .dialog({
          title: `<span class="text-primary">Download Data Jadwal</span>`,
          message: `Pastikan anda sudah me-sinkronkan data scan, sebelum mendownload data jadwal! karena : <br><span class="text-accent">Download data baru akan menghapus data lama!</span><br><br> Apakah anda yakin sudah meng-sinkronkan data lama?`,
          persistent: true,
          html: true,
          ok: {
            push: true,
            label: "Ya"
          },
          cancel: {
            push: true,
            color: "accent",
            label: "Tidak"
          }
        })
        .onOk(async () => {
          this.downloadData();
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    dialogSyncData() {
      this.$q
        .dialog({
          title: `<span class="text-primary">Sinkronkan Data Scan</span>`,
          message: "Apakah anda yakin untuk meng-sinkron data scan ?",
          persistent: true,
          ok: {
            push: true,
            label: "Ya"
          },
          html: true,
          cancel: {
            push: true,
            color: "accent",
            label: "Tidak"
          }
        })
        .onOk(async () => {
          let response = await this.loadDataUser();
          if (response.data.role == "ALL" || response.data.role == "BOARDING") {
            this.syncToServer();
          } else {
            this.showNotif("Anda tidak punya akses untuk aksi ini !");
          }
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    async downloadData() {
      let _this = this;
      let arrData = [];
      let dataJadwal = await this.getDataJadwal();
      if (dataJadwal.hasOwnProperty("data")) {
        arrData = dataJadwal.data;
        this.showNotif("Data Jadwal Berhasil di Download", "secondary", "done");
      } else {
        this.showNotif("Data Jadwal Gagal di Simpan");
      }
      sp.remove("jadwal", x => {
        return null;
      });
      sp.insert("jadwal", arrData, x => {
        return null;
      });
      this.post({
        url: `${_this.baseURL}getDetailBookingByPetugasID`,
        data: {
          token: this.token,
          PetugasID: this.userID
        }
      }).then(values => {
        this.syncToServer();
        if (values.info == "success") {
          this.data = values.data;
          _this.showLoading = true;
          sql.clearDetailBookingData();
          this.data.forEach(element => {
            sql.insertDetailBookingData([
              element.ID,
              element.JadwalID,
              element.nomer_booking,
              0,
              element.status_tiket,
              JSON.stringify(element)
            ]);
            _this.saved++;
          });
          _this.showLoading = false;
          
          this.showNotif(
            `Data berhasil di download (${values.countData}) `,
            "secondary",
            "done"
          );
          // eslint-disable-next-line no-console
        } else {
          this.showNotif();
        }
      });
    },
    syncToServer() {
      let _this = this;
      let data = sql.getDetailBookingData();
      setTimeout(() => {
        _this.onlineScan(JSON.stringify(data));
      }, 500);
    },
    onlineScan(data) {
      let _this = this;
      this.post({
        url: `${_this.baseURL}scanDataQRBoarding`,
        data: {
          token: this.token,
          data: data
        }
      }).then(values => {
        if (values.info == "success") {
          this.showNotif(
            `Data berhasil di Sinkron ${values.data.Sync} dari ${values.data.Scanned} Data Boarding`,
            "blue"
          );
        } else {
          this.showNotif(values.message);
        }
      });
    },
    async getDataJadwal() {
      let _this = this;
      let data = await this.post({
        url: `${_this.baseURL}getDetailJadwal`,
        data: {
          token: this.token,
          PetugasID: this.userID
        }
      });
      return data;
    },
    async loadDataUser() {
      let _this = this;
      let data = await this.post({
        url: `${_this.baseURL}getUser`,
        data: {
          token: this.token,
          UserID: this.userID
        }
      });
      return data;
    },
    async loadData() {
      setTimeout(() => {
        this.isShowBG = true;
      }, 100);
      let userData = await this.loadDataUser();

      if (userData.info == "success") {
        this.namaPT = userData.data.NamaOperator;
        this.namaPetugas = userData.data.NamaPetugas;
        this.namaKantor = userData.data.Cabang;
        this.imgPetugas = userData.data.LogoOperator;
      }
    },
    async cekMaintain() {
      let _this = this;
      this.post({
        url: `${_this.baseURL}cekmainten`
      }).then(values => {
        if (values.info == "nottrue") {
          this.$router.push("/maintance");
          return 1;
        }
        return 1;
      });
    }
  },
  mounted() {
    this.setAnimIn("slideInDown");
    this.setAnimOut("slideOutDown");
    this.setBarTitle("Home");
    this.loadData();
    this.cekMaintain();
  }
};
