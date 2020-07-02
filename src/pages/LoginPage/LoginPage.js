import Vue from "vue";
import { setTimeout } from "timers";
import { uid } from "quasar";

export default {
  name: "login",
  mixins: [Vue.prototype.$mixinStore],
  data() {
    return {
      email: "",
      password: "",
      bounce: false,
      isPwd: true
    };
  },
  computed: {},
  methods: {
    openWA() {
      window.open(
        "https://api.whatsapp.com/send?phone=6281132291988",
        "_system"
      );
    },
    goToForgotPassword() {
      this.$router.push("/forgot-password");
    },
    onSubmit() {
      let _this = this;
      this.post({
        url: `${_this.baseURL}login`,
        data: {
          email: this.email,
          password: this.password,
          device_id: uid()
        }
      }).then(values => {
        if (values.info == "success") {
          const data = values.data;
          this.setIdentity({
            token: data.token,
            role: data.role,
            expTime: data.expTime,
            uuid: data.uuid,
            userID: data.userID
          });
          if (!this.$q.platform.is.cordova) {
            this.$q.localStorage.set("identity", JSON.stringify(data));
          } else {
            // eslint-disable-next-line no-undef
            sayang.insertUser(JSON.stringify(data));
          }
          this.$router.push("/home");
        } else {
          this.showNotif(values.msg);
          this.removeJello();
        }
      });
    },
    onReset() {
      this.email = "";
      this.password = "";
      this.isPwd = true;
    },
    removeJello() {
      this.bounce = true;
      const _this = this;
      setTimeout(() => {
        _this.bounce = false;
      }, 1000);
    },
    onClickEye() {
      this.isPwd = !this.isPwd;
      if (!this.password && this.isPwd) {
        this.$refs.password.blur();
      }
    }
  },
  mounted() {
    this.setAnimIn("slideInDown");
    this.setAnimOut("slideOutDown");
    // this.$q.localStorage.remove("isNotSplash");
    // alert(this.$q.localStorage.getItem("isNotSpalsh"));
  }
};
