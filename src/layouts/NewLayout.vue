<template>
  <q-layout view="hHh lpr fFf">
    <q-header
      v-if="
        barTitle == 'Check-in' ||
          barTitle == 'Boarding' ||
          barTitle == 'Akun Saya'
      "
      class="bg-roro-to-rigth"
    >
      <q-toolbar>
        <q-btn v-show="false" flat dense round icon="menu" aria-label="Menu" />
        <q-toolbar-title class="text-body1 q-pl-lg">{{
          barTitle
        }}</q-toolbar-title>
        <q-btn @click="reload()" flat round dense icon="refresh" />
      </q-toolbar>
    </q-header>
    <!-- Be sure to play with the Layout demo on docs -->
    <q-page-container
      :class="
        barTitle == 'Check-in' || barTitle == 'Boarding'
          ? 'bg-roro-to-bottom'
          : 'bg-primary'
      "
    >
      <transition
        mode="out-in"
        appear
        :leave-active-class="`animated ${animasiOut}`"
        :enter-active-class="`animated ${animasiIn}`"
      >
        <router-view
          :key="watcher"
          ref="contentPage"
          style="animation-duration:0.5s"
        />
      </transition>
    </q-page-container>
    <q-footer class="bg-white">
      <div class="row justify-evenly">
        <div class="col-3">
          <div class="column items-center q-pt-sm">
            <q-btn
              :to="{ name: 'home-page' }"
              icon="home"
              label="Home"
              stack
              dense
              no-caps
              flat
              :color="barTitle == 'Home' ? 'primary' : 'grey-14'"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="column items-center q-pt-sm">
            <q-btn
              @click="goTo('checkin-page')"
              icon="location_on"
              label="Check-in"
              stack
              dense
              no-caps
              flat
              :color="barTitle == 'Check-in' ? 'primary' : 'grey-14'"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="column items-center q-pt-sm">
            <q-btn
              @click="goTo('boarding-page')"
              icon="anchor"
              label="Boarding"
              stack
              dense
              no-caps
              flat
              :color="barTitle == 'Boarding' ? 'primary' : 'grey-14'"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="column items-center q-pt-sm">
            <q-btn
              :to="{ name: 'akunSaya-page' }"
              icon="account_circle"
              label="Akun Saya"
              stack
              dense
              no-caps
              flat
              :color="barTitle == 'Akun Saya' ? 'primary' : 'grey-14'"
            />
          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import Vue from "vue";
export default {
  // name: 'LayoutName',
  mixins: [Vue.prototype.$mixinStore],
  data() {
    return {
      key: this.$router.currentRoute.fullPath,
      activeNow: "Home",
      watcher: 0
    };
  },
  watch: {
    reloadPage(val) {
      this.watcher = val;
    }
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
    reload() {
      this.doReloadPage();
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
    async goTo(routeName) {
      let userData = await this.loadDataUser();
      if (
        routeName == "checkin-page" &&
        (userData.data.role == "ALL" || userData.data.role == "CEK-IN")
      ) {
        this.$router.push({ name: routeName });
      } else if (
        routeName == "boarding-page" &&
        (userData.data.role == "ALL" || userData.data.role == "BOARDING")
      ) {
        this.$router.push({ name: routeName });
      } else {
        this.showNotif("Anda tidak punya akses menuju Halaman ini !");
      }
    }
  },
  computed: {
    getTitle() {
      let title = "";
      switch (this.$router.currentRoute.name) {
        case "checkin-page":
          title = "Check-in";
          break;
        case "boarding-page":
          title = "Boarding";
          break;

        default:
          break;
      }
      return title;
    }
  }
};
</script>
<style lang="stylus">
main {
  animation-duration: 1500ms;
}
</style>
