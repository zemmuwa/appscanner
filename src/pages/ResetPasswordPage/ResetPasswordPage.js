/* eslint-disable no-unused-vars */
import { dom } from "quasar";
import { setTimeout } from "timers";
import { uid } from "quasar";
import Vue from "vue";
const { height, width } = dom;

export default {
  name: "login",
  props: ["paramKode"],
  mixins: [Vue.prototype.$mixinStore],
  data() {
    return {
      email: "",
      bounce: false,
      confirmPassword: "",
      password: ""
    };
  },
  computed: {
    getBgTheme() {
      return {
        "background-color": this.theme
      };
    },
    getTextTheme() {
      return {
        color: this.theme
      };
    }
  },
  methods: {
    onSubmit() {
      let _this = this;
      this.post({
        url: `${_this.baseURL}sendEmailResetPassword`,
        data: {
          email: this.email,
          kode: uid()
        }
      }).then(values => {
        if (values.info == "success") {
          this.showNotif(
            "Email Reset Password telah dikirim ke email anda",
            "green"
          );
        } else {
          this.showNotif("Reset Password Gagal");
          this.removeJello();
        }
      });
    },
    onSubmitPassword() {
      let _this = this;
      this.post({
        url: `${_this.baseURL}resetPassword`,
        data: {
          password: this.password,
          kode: this.paramKode
        }
      }).then(values => {
        if (values.info == "success") {
          this.showNotif("Reset Password Berhasil", "green");
          this.$router.replace("/login");
        } else {
          this.showNotif("Reset Password Gagal");
          this.removeJello();
        }
      });
    },
    clearForm() {
      this.confirmPassword = "";
      this.password = "";
      this.email = "";
    },
    removeJello() {
      this.bounce = true;
      const _this = this;
      setTimeout(() => {
        _this.bounce = false;
      }, 1000);
    }
  },
  mounted() {}
};
