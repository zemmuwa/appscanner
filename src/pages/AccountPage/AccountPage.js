/* eslint-disable no-unused-vars */
import Vue from "vue";
import * as sql from "boot/initSQLite";
import * as sp from "boot/sharedPref";
import { Loading } from "quasar";
import dialogCustom from "components/dialogCustom";
export default {
  mixins: [Vue.prototype.$mixinStore],
  name: "PageIndex",
  data() {
    return {
      data: [],
      showLoading: false,
      saved: 0,
      namaPT: "",
      namaPetugas: "",
      namaKantor: "",
      imgPetugas: "statics/img/no-photo.png",
      emailPetugas: "",
      nomorWA: "",
      bagian: "",
      jenisAkses: ""
    };
  },
  methods: {
    logOut() {
      this.setIdentity({
        token: "",
        uuid: "",
        userID: ""
      });
      if (!this.$q.platform.is.cordova) {
        this.$q.localStorage.remove("identity");
      } else {
        // eslint-disable-next-line no-undef
        sayang.deleteUser();
      }
      this.$router.replace("/login");
    },
    dialogLogout() {
      this.$q
        .dialog({
          title: `<span class="text-primary">Logout</span>`,
          message: "Apakah anda yakin ingin keluar dari aplikasi scan ?",
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
          this.logOut();
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
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
      let userData = await this.loadDataUser();
      if (userData.info == "success") {
        this.namaPT = userData.data.NamaOperator;
        this.namaPetugas = userData.data.NamaPetugas;
        this.namaKantor = userData.data.Cabang;
        this.imgPetugas = userData.data.LogoOperator;
        this.emailPetugas = userData.data.email;
        this.nomorWA = userData.data.wa;
        this.bagian = userData.data.BagianStaff;
        this.jenisAkses = userData.data.JenisAkses;
      }
    }
  },
  mounted() {
    this.setBarTitle("Akun Saya");
    this.loadData();
  }
};
