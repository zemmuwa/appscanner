<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>{{ barTitle }}</q-toolbar-title>
        <q-btn @click="reload()" flat round dense icon="refresh" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <div class="column" style="height: 100vh">
        <div class="col">
          <q-list>
            <q-item-label header class="text-grey-8">Menu</q-item-label>
            <q-item clickable to="/home">
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Home</q-item-label>
              </q-item-section>
            </q-item>
            <template v-for="(data, index) in essentialLinks">
              <q-item
                v-if="role == data.show || role == 'ALL'"
                clickable
                :to="{ name: data.name }"
                @click="changeHeader(data.title)"
                :key="'menu' + index"
              >
                <q-item-section avatar>
                  <q-icon :name="data.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ data.title }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </div>
        <div class="col full-height full-width">
          <q-btn
            style="position:absolute;bottom:15px;left:calc(50% - 60px)"
            color="negative"
            icon="exit_to_app"
            label="LogOut"
            @click="logOut()"
          />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view
        :key="keyLayout"
        ref="contentPage"
        style="animation-duration:0.5s"
      />
    </q-page-container>
  </q-layout>
</template>

<script>
import Vue from "vue";

export default {
  name: "MainLayout",
  mixins: [Vue.prototype.$mixinStore],

  data() {
    return {
      leftDrawerOpen: false,
      keyLayout: this.$router.currentRoute.fullPath + "layout",
      essentialLinks: [
        // {
        //   title: "Pilih Jadwal",
        //   icon: "school",
        //   link: "https://quasar.dev"
        // },
        {
          title: "Check In",
          icon: "fas fa-ticket-alt",
          link: "checkin",
          name: "checkin-page",
          show: "CEK-IN"
        },
        {
          title: "Boarding",
          icon: "fas fa-anchor",
          link: "boarding",
          name: "boarding-page",
          show: "BOARDING"
        }
        // {
        //   title: "Laporan Checkin",
        //   icon: "chat",
        //   link: "laporan-checkin",
        //   name: "laporanCheckin-page"
        // },
        // {
        //   title: "Laporan Boarding",
        //   icon: "chat",
        //   link: "laporan-boarding",
        //   name: "laporanBoarding-page"
        // }
        // {
        //   title: "Laporan Check In",
        //   icon: "record_voice_over",
        //   link: "https://forum.quasar.dev"
        // },
        // {
        //   title: "Laporan Boarding",
        //   icon: "rss_feed",
        //   link: "https://twitter.quasar.dev"
        // }
      ]
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
    changeHeader(param) {
      this.setBarTitle(param);
    },
    reload() {
      this.$refs.contentPage.loadData();
    }
  },
  mounted() {}
};
</script>
