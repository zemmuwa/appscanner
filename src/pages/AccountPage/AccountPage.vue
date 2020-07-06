<template>
  <q-page class="q-pt-lg">
    <div class="row justify-center">
      <q-card class="col-10">
        <q-card-section>
          <div class="row">
            <div class="col-shrink">
              <q-avatar>
                <img :src="imgPetugas" />
              </q-avatar>
            </div>
            <div class="col-grow">
              <div class="column justify-between q-px-md full-height">
                <span>{{ namaKantor }}</span>
                <span class="text-caption text-primary">{{ namaPT }}</span>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="row justify-center q-pt-md q-mb-sm">
      <q-card class="q-my-sm col-10">
        <q-card-section>
          <div class="row full-height full-width justify-center">
            <div class="full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Nama</span>
                <span class="h-min-15 text-uppercase">{{ namaPetugas }}</span>
              </div>
            </div>
            <div class="full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Email</span>
                <span class="h-min-15">{{ emailPetugas }}</span>
              </div>
            </div>
            <div class="full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Nomer Whatsapp</span>
                <span class="h-min-15">{{ nomorWA }}</span>
              </div>
            </div>
            <div class="full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Bagian Staff</span>
                <span class="h-min-15">{{ bagian }}</span>
              </div>
            </div>
            <div class="full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Jenis Akses Aplikasi</span>
                <span class="h-min-15">{{ jenisAkses }}</span>
              </div>
            </div>
            <q-btn
              style="width:80%"
              icon="exit_to_app"
              label="Logout"
              @click="dialogLogout()"
              class="bg-roro3-to-left text-white q-my-sm"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-inner-loading :showing="showLoading">
      <q-spinner-gears size="50px" color="primary" />
      <span class="text-h6 text-primary text-bold"
        >{{ saved }}/{{ data.length }}</span
      >
    </q-inner-loading>
  </q-page>
</template>

<script src="./AccountPage.js"></script>
<style scoped>
.height-52 {
  height: 52px;
}
.h-min-15 {
  min-height: 15px;
}
</style>
