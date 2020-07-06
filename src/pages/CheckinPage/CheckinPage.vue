<template>
  <q-page class="flex q-px-md">
    <q-card class="q-mt-sm full-width">
      <q-card-section>
        <div class="row">
          <div class="col-4">
            <span class="text-caption text-primary">Rute</span>
          </div>
          <div class="col-8 text-right">
            <span class="text-caption text-primary">Keberangkatan</span>
          </div>
          <div class="col-4">
            <span class="text-caption text-no-wrap">{{ data.POL }}</span>
            <q-icon color="primary" class="q-mx-sm" name="arrow_right_alt" />
            <span class="text-caption text-no-wrap">{{ data.POD }}</span>
          </div>
          <div class="col-8 text-right">
            <span class="text-caption">{{ data.TglKeberangkatan }}</span>
          </div>
        </div>
        <hr class="dashed text-primary" />
        <span class="text-caption text-primary">{{ data.Kapal }}</span>
      </q-card-section>
    </q-card>

    <q-card class="q-my-sm">
      <q-card-section>
        <div class="row full-height full-width q-mt-md">
          <div class="border-dashed-roro full-width">
            <div class="column q-pa-sm">
              <q-form @submit="onSubmit()">
                <q-input
                  ref="nomorBooking"
                  stack-label
                  dense
                  @focus="scrollToElement(getRefs('nomorBooking').$el)"
                  class="full-width"
                  v-model="nomer_booking"
                  label="Nomor Booking"
                  color="primary"
                  placeholder="Masukan Nomor Booking"
                  input-class="text-primary"
                  input-style="border-bottom: 1px solid;"
                />
              </q-form>
            </div>
          </div>
          <div class="border-dashed-roro full-width">
            <div class="column q-pa-sm">
              <span class="text-10 text-primary">Jenis Tiket</span>
              <span class="text-caption h-min-15">{{ data.JenisTiket }}</span>
            </div>
          </div>
          <template v-if="data.Pembeda == 'CHECKIN_PENUMPANG'">
            <div class="border-dashed-roro full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Nama Penumpang</span>
                <span class="text-caption h-min-15">{{
                  data.NamaPenumpang
                }}</span>
              </div>
            </div>
            <div class="border-dashed-roro full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary"
                  >Jenis - Nomer Identitas</span
                >
                <span class="text-caption h-min-15">{{
                  data.JenisNomorIdentitas
                }}</span>
              </div>
            </div>
            <div class="border-dashed-roro full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Kelas Tiket</span>
                <span class="text-caption h-min-15">{{ data.KelasTiket }}</span>
              </div>
            </div>
            <div class="border-dashed-roro full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Tanggal Lahir (Umur)</span>
                <span class="text-caption h-min-15">{{
                  data.TglLahirUmur
                }}</span>
              </div>
            </div>
          </template>
          <template v-if="data.Pembeda == 'CHECKIN_KENDARAAN_PROFIT'">
            <div class="border-dashed-roro full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Nama Pemilik / STNK</span>
                <span class="text-caption h-min-15">{{
                  data.NamaPemilik
                }}</span>
              </div>
            </div>
            <div class="border-dashed-roro full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Kendaraan</span>
                <span class="text-caption h-min-15">{{ data.Kendaraan }}</span>
              </div>
            </div>
            <div class="border-dashed-roro full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Nomor Rangka</span>
                <span class="text-caption h-min-15">{{
                  data.NomorRangka
                }}</span>
              </div>
            </div>
            <div class="border-dashed-roro full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Nomor Mesin</span>
                <span class="text-caption h-min-15">{{ data.NomorMesin }}</span>
              </div>
            </div>
            <div class="border-dashed-roro full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Nomor Faktur</span>
                <span class="text-caption h-min-15">{{
                  data.NomorFaktur
                }}</span>
              </div>
            </div>
          </template>
          <template v-if="data.Pembeda == 'CHECKIN_KENDARAAN'">
            <div class="border-dashed-roro full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Nama Pemilik / STNK</span>
                <span class="text-caption h-min-15">{{
                  data.NamaPemilik
                }}</span>
              </div>
            </div>
            <div class="border-dashed-roro full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Kendaraan</span>
                <span class="text-caption h-min-15">{{ data.Kendaraan }}</span>
              </div>
            </div>
            <div class="border-dashed-roro full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Nomor Polisi</span>
                <span class="text-caption h-min-15">{{
                  data.NomorPolisi
                }}</span>
              </div>
            </div>
          </template>
          <div class="border-dashed-roro full-width">
            <div class="column q-pa-sm">
              <span class="text-10 text-primary">Tarif Pass</span>
              <span class="text-caption h-min-15">{{ data.TarifPass }}</span>
            </div>
          </div>
          <div class="border-dashed-roro full-width">
            <div class="column q-pa-sm">
              <span class="text-10 text-primary">Harga Tiket</span>
              <span class="text-caption h-min-15">{{ data.HargaTiket }}</span>
            </div>
          </div>
          <div class="border-dashed-roro full-width">
            <div class="column q-pa-sm">
              <span class="text-10 text-primary">Keterangan Tiket</span>
              <span class="text-caption h-min-15">{{
                data.KeteranganTiket
              }}</span>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="qr_code_scanner"
        color="primary"
        @click="openScanner()"
      />
    </q-page-sticky>
  </q-page>
</template>

<script src="./CheckinPage.js"></script>

<style scoped>
.h-min-15 {
  min-height: 15px;
}
</style>
