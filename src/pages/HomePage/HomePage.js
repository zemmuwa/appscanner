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
      showLoading: false,
      saved: 0
    };
  },
  methods: {
    dialogDownloadData() {
      this.$q
        .dialog({
          title: "Download Data",
          message:
            "Download data baru akan menghapus data lama, Apakah anda yakin sudah meng-sinkron data lama?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
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
          title: "Sinkron Data",
          message: "Apakah anda yakin untuk meng-sinkron data ?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.syncToServer();
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
        this.showNotif("Data Jadwal Berhasil di Simpan", "blue");
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
              JSON.stringify(element)
            ]);
            _this.saved++;
          });
          _this.showLoading = false;
          this.showNotif(
            values.countData + " Data Penumpang Berhasil di Simpan",
            "blue"
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
    loadData() {}
  },
  mounted() {
    this.setBarTitle("Roro");
  }
};
