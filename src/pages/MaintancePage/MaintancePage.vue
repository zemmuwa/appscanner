<template>
  <q-page class="flex flex-center">
    <div :class="`column${bounce ? ' jello-vertical' : ''}`" style="width:100%">
      <div class="col">
        <div class="row mt-20 q-mb-lg">
          <div class="col-8">
            <q-card class="row justify-center b-rad-left">
              <div class="row justify-center">
                <q-img
                  class="q-mt-md q-mx-md"
                  style="max-width: 150px;"
                  src="statics/img/roro.jpeg"
                  contain
                />
                <span class="q-mb-md text-caption text-roro-primary"
                  >Digital E-Ticketing Platform</span
                >
              </div>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row justify-center window-width">
          <div class="col-10">
            <q-card style="width:100%;" class="b-rad-7">
              <q-card-section class="row justify-center">
                <q-img
                  class="q-mt-md q-mx-md"
                  style=";"
                  src="statics/img/maintance.png"
                  contain
                />
                <span class="text-primary text-roro-caption q-mt-md q-mb-sm"
                  >Ada Pertanyaan? Silahkan klik Pusat bantuan :</span
                >
                <q-btn
                  icon="fab fa-whatsapp"
                  label="Hubungi Kami"
                  class="q-ml-sm full-width bg-roro2-to-left"
                  text-color="white"
                  @click="openWA()"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script src="./MaintancePage.js"></script>
<style scoped>
.my-card {
  width: 100%;
  height: 100px;
}
.b-rad-7 {
  border-radius: 7%;
}
.mt-40 {
  margin-top: 40px;
}
</style>
