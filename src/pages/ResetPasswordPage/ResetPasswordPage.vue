<template>
  <q-page class="flex flex-center">
    <div :class="`column${bounce ? ' jello-vertical' : ''}`" style="width:80%">
      <div style="z-index:1" class="col-xs-12"></div>
      <div class="col-xs-12">
        <div class="row items-stretch">
          <div class="col">
            <q-card style="width:100%">
              <q-card-section class="row justify-center">
                <q-form
                  v-if="paramKode"
                  @submit="onSubmitPassword"
                  @reset="clearForm"
                  style="width:95%"
                  class="q-gutter-md"
                >
                  <q-input
                    color="primary"
                    v-model="password"
                    label="Password"
                    lazy-rules
                    type="Password"
                    :rules="[
                      val => (val && val.length > 0) || 'Please input Password'
                    ]"
                  />

                  <q-input
                    color="primary"
                    v-model="confirmPassword"
                    type="Password"
                    label="Confirm Password"
                    lazy-rules
                    :rules="[
                      val =>
                        val == password ||
                        'Confirm password must be same with password'
                    ]"
                  />

                  <div class="flex justify-around">
                    <q-btn
                      ref="tombol"
                      label="Submit"
                      type="submit"
                      color="primary"
                    />
                    <q-btn
                      label="Reset"
                      type="reset"
                      color="primary"
                      flat
                      class="q-ml-sm"
                    />
                  </div>
                </q-form>
                <q-form
                  v-else
                  @submit="onSubmit"
                  style="width:95%"
                  class="q-gutter-md"
                >
                  <q-input
                    color="primary"
                    v-model="email"
                    label="Email"
                    hint="Masukan alamat email yang akan direset password"
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || 'Please input Email'
                    ]"
                  />

                  <div class="flex justify-around">
                    <q-btn
                      ref="tombol"
                      label="Submit"
                      type="submit"
                      color="primary"
                    />
                    <q-btn
                      label="Reset"
                      type="reset"
                      color="primary"
                      flat
                      class="q-ml-sm"
                    />
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script src="./ResetPasswordPage.js"></script>

<style scoped>
.my-card {
  width: 100%;
  height: 100px;
}
</style>
