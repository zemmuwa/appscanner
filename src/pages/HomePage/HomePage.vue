<template>
  <q-page class="q-pt-md">
    <transition appear enter-active-class="animated fadeIn">
      <div v-if="isShowBG" class="fixed-center">
        <div class="rotate-90">
          <div class="trapesium-up"></div>
          <div class="trapesium-down"></div>
        </div>
      </div>
    </transition>
    <div class="row justify-between">
      <div class="col-4">
        <q-card class="row justify-center b-rad-left height-52">
          <div class="row justify-center">
            <q-img
              class="q-mt-md q-mx-md"
              style="max-heigth: 18px;"
              src="statics/img/roro.jpeg"
              contain
            />
            <span class="q-mb-sm text-6 text-roro-primary"
              >Digital E-Ticketing Platform</span
            >
          </div>
        </q-card>
      </div>
      <div class="col-3">
        <q-card class="row justify-center b-rad-right height-52">
          <div class="col-12 self-center text-center">
            <q-icon
              @click="loadData()"
              name="refresh"
              color="primary"
              size="32px"
            />
          </div>
          <div class="text-8 text-roro-primary">Reload</div>
        </q-card>
      </div>
    </div>
    <div class="row q-my-sm">
      <span class="text-caption q-px-md text-white">{{ namaPT }}</span>
    </div>
    <div class="fixed-center full-width" style="height:65vh">
      <div class="column justify-evenly full-height">
        <div class="row justify-center full-width fit-height">
          <q-card class="col-10" style="border-radius:20px">
            <q-card-section>
              <span class="text-caption text-grey-14"
                >Selamat Datang Petugas Scan,</span
              >
              <div class="row">
                <div class="col-shrink">
                  <q-avatar>
                    <img :src="imgPetugas" />
                  </q-avatar>
                </div>
                <div class="col-grow">
                  <div class="column justify-between q-px-md full-height">
                    <span>{{ namaPetugas }}</span>
                    <span class="text-caption text-primary">{{
                      namaKantor
                    }}</span>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="row justify-center full-width fit-height">
          <q-card class="col-10" style="border-radius:20px">
            <q-card-section>
              <div class="text-subtitle2 text-primary">DATA SCANNER</div>
              <div class="text-10">
                Silahkan download untuk mengambil data terbaru
              </div>
            </q-card-section>
            <q-card-section>
              <div class="row justify-around">
                <div class="col-6">
                  <div class="column text-center">
                    <q-btn
                      style="border-radius:10px"
                      class="bg-roro2-to-left q-mx-md"
                      icon="cloud_download"
                      text-color="white"
                      size="xl"
                      @click="openDialog('download')"
                    />
                    <span class="text-10">Download Data Jadwal</span>
                  </div>
                </div>
                <div class="col-6">
                  <div class="column text-center">
                    <q-btn
                      style="border-radius:10px"
                      class="bg-roro-to-left q-mx-md"
                      icon="sync"
                      size="xl"
                      text-color="white"
                      @click="openDialog('sync')"
                    />
                    <span class="text-10">Sinkronkan Data Scan</span>
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <span class="text-10 text-primary"
                >Sinkronkan untuk upload hasil scan ke Manifest</span
              >
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <q-inner-loading :showing="showLoading">
      <q-spinner-gears size="50px" color="primary" />
      <span class="text-h6 text-primary text-bold"
        >{{ saved }}/{{ data.length }}</span
      >
    </q-inner-loading>
  </q-page>
</template>

<script src="./HomePage.js"></script>
<style scoped>
.height-52 {
  height: 52px;
}
.trapesium-up {
  border-top: calc(100vw / 2) solid white;
  border-left: 10vh solid transparent;
  border-right: 10vh solid transparent;
  height: 0;
  width: 65vh;
}
.trapesium-down {
  border-bottom: calc(100vw / 2) solid white;
  border-left: 10vh solid transparent;
  border-right: 10vh solid transparent;
  height: 0;
  width: 65vh;
}
.fit-height {
  height: fit-content;
}
</style>
