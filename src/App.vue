<template>
  <div id="q-app">
    <router-view :key="keyId" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {
      keyId: this.$router.currentRoute.fullPath
    };
  },
  mounted() {
    const _this = this;
    window.addEventListener("unload", _this.handler);
    document.addEventListener("backbutton", _this.onBackKeyDown, false);
    // eslint-disable-next-line no-undef
    universalLinks.subscribe("doResetPassword", _this.resetPassword);
  },
  computed: {
    ...mapState("WebService", ["token", "role", "expTime", "uuid", "id"])
  },
  methods: {
    ...mapMutations("WebService", ["setIdentity"]),
    resetPassword(eventData) {
      this.$router.push("/login");
      this.$router.push("/resetPassword/" + eventData.params.kode);
    },
    onBackKeyDown() {
      if (
        this.$router.currentRoute.name == "login-page" ||
        this.$router.currentRoute.name == "home-page"
      ) {
        if (this.$q.platform.is.cordova) {
          navigator.app.exitApp();
        }
      } else if (this.$router.currentRoute.name.includes("password")) {
        this.$router.replace("/login");
      }
    },

    handler() {
      const _this = this;
      if (this.token) {
        let data = {
          token: _this.token,
          role: _this.role,
          expTime: _this.expTime,
          uuid: _this.uuid,
          userID: parseInt(_this.userID)
        };
        if (!this.$q.platform.is.cordova) {
          this.$q.localStorage.set("identity", JSON.stringify(data));
        }
      }
      return null;
    }
  }
};
</script>
