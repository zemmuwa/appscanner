<template>
  <q-page class="flex flex-center">
    <img
      style="max-width: 90vw"
      alt="Quasar logo"
      src="statics/img/prahu-raw-green.png"
    />
    <q-btn
      v-if="role == 'BOARDING' || role == 'ALL'"
      color="primary"
      label="Download Jadwal"
      @click="dialogDownloadData()"
    />
    <q-btn
      v-if="role == 'BOARDING' || role == 'ALL'"
      color="blue"
      label="Sync Jadwal"
      @click="dialogSyncData()"
    />
    <q-inner-loading :showing="showLoading">
      <q-spinner-gears size="50px" color="primary" />
      <span class="text-h6 text-primary text-bold"
        >{{ saved }}/{{ data.length }}</span
      >
    </q-inner-loading>
  </q-page>
</template>

<script src="./HomePage.js"></script>
