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
            <q-card style="width:100%" class="b-rad-7">
              <q-card-section class="row justify-center">
                <div class="row" style="width:95%">
                  <div class="col-12">
                    <span class="text-body1 text-weight-bold text-roro-primary">
                      LOGIN
                    </span>
                  </div>
                  <div class="col-12">
                    <span class="text-roro-caption">
                      Silahkan masuk ke akun petugas scan
                    </span>
                  </div>
                </div>
                <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                  style="width:95%"
                  class="q-gutter-md"
                >
                  <q-input
                    ref="email"
                    color="primary"
                    v-model="email"
                    label="Email"
                    @blur="$refs.email.resetValidation()"
                    lazy-rules="ondemand"
                    :rules="[
                      val => (val && val.length > 0) || 'Masukkan Email'
                    ]"
                  />

                  <q-input
                    color="primary"
                    ref="password"
                    v-model="password"
                    :type="isPwd ? 'password' : 'text'"
                    label="Password"
                    @blur="$refs.password.resetValidation()"
                    lazy-rules="ondemand"
                    :rules="[
                      val => (val !== null && val !== '') || 'Masukkan password'
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="onClickEye()"
                      />
                    </template>
                  </q-input>
                  <div class="row justify-center">
                    <q-btn
                      class="full-width bg-roro-to-left"
                      ref="tombol"
                      label="LOGIN"
                      type="submit"
                      text-color="white"
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
                  </div>
                  <!-- <div class="flex justify-center">
                    <q-btn
                      flat
                      no-caps
                      ref="tombol"
                      label="Forgot Password ?"
                      type="submit"
                      color="primary"
                      :to="{ name: `reset-password-page` }"
                    />
                  </div> -->
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script src="./LoginPage.js"></script>
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
