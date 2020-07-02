<template>
  <q-page class="">
    <div :class="`column justify-center window-height`" style="width:100%">
      <div class="col-4"></div>
      <div class="col-4 column justify-center">
        <div class="row justify-center">
          <div class="col-12 text-center">
            <q-img
              class="q-mt-md q-mx-md"
              style="max-width: 200px;"
              src="statics/img/roro.jpeg"
              contain
            />
          </div>
          <span class="q-mb-md text-body1 text-roro-primary"
            >Digital E-Ticketing Platform</span
          >
          <div class="full-width text-center">
            <q-spinner-dots color="primary" size="2em" />
          </div>
          <div class="full-width text-center">
            <span class="text-primary text-caption text-bold"
              >V{{ version }}</span
            >
          </div>
        </div>
      </div>
      <div class="col-4 column justify-center">
        <div class="row justify-center">
          <span class="text-caption">powered by</span>
          <div class="col-12 text-center">
            <q-img
              style="max-width: 200px;"
              src="statics/img/prahu-raw-green.png"
              contain
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script src="./SplashPage.js"></script>
<style scoped>
.my-card {
  width: 100%;
  height: 100px;
}
.b-rad-7 {
  border-radius: 7%;
}
.bg-roro-to-left {
  background-image: linear-gradient(to left, #0780cc, #5ab6f6);
}
.bg-roro2-to-left {
  background-image: linear-gradient(to left, #08cab3, #56daca);
}
.mt-40 {
  margin-top: 40px;
}
.b-rad-left {
  border-radius: 0px 50px 50px 0px;
}
</style>
