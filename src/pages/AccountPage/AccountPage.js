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
