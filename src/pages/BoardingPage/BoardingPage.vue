<template>
  <q-page class="flex">
    <div class="row full-height full-width q-px-md q-mt-md">
      <q-card class="q-mt-sm full-width">
        <q-card-section>
          <div class="row">
            <div class="col-5">
              <span class="text-caption text-primary">Rute</span>
            </div>
            <div class="col-7 text-right">
              <span class="text-caption text-primary">Keberangkatan</span>
            </div>
            <div class="col-5">
              <span
                :class="
                  `text-caption text-no-wrap ${
                    selectedJadwal ? '' : 'text-grey'
                  }`
                "
                >{{ selectedJadwal ? selectedJadwal.POL : "ASAL" }}</span
              >
              <q-icon
                :color="selectedJadwal ? 'primary' : 'grey'"
                class="q-mx-sm"
                name="arrow_right_alt"
              />
              <span
                :class="
                  `text-caption text-no-wrap ${
                    selectedJadwal ? '' : 'text-grey'
                  }`
                "
                >{{ selectedJadwal ? selectedJadwal.POD : "TUJUAN" }}</span
              >
            </div>
            <div class="col-7 text-right">
              <span
                :class="`text-caption ${selectedJadwal ? '' : 'text-grey'}`"
                >{{
                  selectedJadwal
                    ? selectedJadwal.TglKeberangkatan
                    : "Hari, DD/MM/YYYY HH:ss"
                }}</span
              >
            </div>
          </div>
          <hr class="dashed text-primary" />
          <div class="relative-position">
            <q-btn-dropdown
              class="full-width"
              unelevated
              align="between"
              dense
              color="black"
              flat
            >
              <q-list class="bg-info">
                <q-item
                  @click="setSelectedJadwal(index)"
                  v-for="(val, index) in filteredDetailJadwal"
                  :key="index"
                  clickable
                  v-close-popup
                  :class="
                    compareSlectedJadwal(selectedJadwal, val)
                      ? 'bg-warning'
                      : ''
                  "
                >
                  <q-item-section>
                    <q-item-label class="text-primary text-caption">{{
                      val.KapalNama
                    }}</q-item-label>
                    <q-item-label class="text-caption row justify-between"
                      ><div class="row full-width">
                        <div class="col-4">
                          <span
                            :class="
                              `text-caption text-no-wrap ${
                                compareSlectedJadwal(selectedJadwal, val)
                                  ? 'text-red'
                                  : ''
                              }`
                            "
                            >{{ val.POL }}</span
                          >
                          <q-icon
                            color="primary"
                            class="q-mx-sm"
                            name="arrow_right_alt"
                          />
                          <span
                            :class="
                              `text-caption text-no-wrap ${
                                compareSlectedJadwal(selectedJadwal, val)
                                  ? 'text-red'
                                  : ''
                              }`
                            "
                            >{{ val.POD }}</span
                          >
                        </div>
                        <div class="col-8 text-right">
                          <span
                            :class="
                              `text-caption ${
                                compareSlectedJadwal(selectedJadwal, val)
                                  ? 'text-red'
                                  : ''
                              }`
                            "
                            >{{ val.TglKeberangkatan }}</span
                          >
                        </div>
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <template slot="label">
                <span
                  :class="
                    `text-caption ${
                      selectedJadwal ? 'text-primary' : 'text-grey'
                    }`
                  "
                  >{{
                    selectedJadwal ? selectedJadwal.KapalNama : "Nama Kapal"
                  }}
                </span>
              </template>
            </q-btn-dropdown>
          </div>
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
                    :disable="selectedJadwal ? false : true"
                    label="Nomor Booking"
                    color="primary"
                    label-color="primary"
                    placeholder="Masukkan Nomor Booking"
                    input-style="border-bottom: 1px solid #0780cc;"
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
                  <span class="text-caption h-min-15">{{
                    data.KelasTiket
                  }}</span>
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
                  <span class="text-caption h-min-15">{{
                    data.Kendaraan
                  }}</span>
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
                  <span class="text-caption h-min-15">{{
                    data.NomorMesin
                  }}</span>
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
                  <span class="text-caption h-min-15">{{
                    data.Kendaraan
                  }}</span>
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
            <div class="border-dashed-roro full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Berat Bagasi (Kg) </span>
                <span class="text-caption h-min-15">{{ data.Bagasi }}</span>
              </div>
            </div>
            <div class="border-dashed-roro full-width">
              <div class="column q-pa-sm">
                <span class="text-10 text-primary">Keterangan Bagasi</span>
                <span class="text-caption h-min-15">{{
                  data.KeteranganBagasi
                }}</span>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-page-sticky
      v-if="selectedJadwal"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        fab
        color="primary"
        dense=""
        size="lg"
        padding="10px"
        style="border-radius: 10px;"
        @click="openScanner()"
      >
        <q-icon name="qr_code_scanner" size="md" />
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script src="./BoardingPage.js"></script>
<style scoped>
.h-min-15 {
  min-height: 15px;
}
</style>
