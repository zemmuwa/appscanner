import Vue from "vue";
export default {
  mixins: [Vue.prototype.$mixinStore],
  name: "splash",
  data() {
    return {
      version: "1.2.b5"
    };
  },
  methods: {
    async loadDataAPK() {
      let _this = this;
      let data = await this.post({
        url: `${_this.baseURL}getVersionAPK`,
        data: {
          token: this.token,
          UserID: this.userID
        }
      });
      if (data.info!=this.versionAPK) {
        alert('Harap perbarui aplikasi anda')
        window.open(data.link);
      }
    },
  },
  mounted() {
    this.$q.localStorage.set("isNotSplash", true);
    this.loadDataAPK()
    setTimeout(() => {
      this.$router.replace("/");
    }, 4000);
  }
};
