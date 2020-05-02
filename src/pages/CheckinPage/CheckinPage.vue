<template>
  <q-page class="flex">
    <div class="row full-height full-width q-px-md q-mt-md">
      <q-input
        class="full-width"
        outlined
        :value="data.panggilan"
        label="Panggilan"
        readonly=""
        color="primary"
      />
      <q-input
        class="full-width"
        outlined
        :value="data.harga ? getFormatedData(data.harga, 'number') : ''"
        label="Harga"
        readonly=""
        color="primary"
      />
      <q-input
        class="full-width"
        outlined
        :value="data.nama_penumpnag"
        label="Nama Penumpang"
        readonly=""
        color="primary"
      />
      <q-input
        class="full-width"
        outlined
        :value="data.nomer_booking"
        label="Nomor Booking"
        readonly=""
        color="primary"
      />
      <q-input
        class="full-width"
        outlined
        :value="data.tgl_lahir ? getFormatedData(data.tgl_lahir, 'date') : ''"
        label="Tgl. Lahir"
        readonly=""
        color="primary"
      />
      <q-input
        class="full-width"
        outlined
        :value="data.no_identitas"
        :label="
          data.GolonganJenis.toLowerCase() == `kendaraan`
            ? `No. Kendaraan`
            : `No. Identitas`
        "
        readonly=""
        color="primary"
      />
      <q-input
        class="full-width"
        outlined
        :value="data.keterangan"
        label="Keterangan"
        readonly=""
        color="primary"
      />
      <q-input
        class="full-width"
        outlined
        :value="capitalize(data.status_penumpang)"
        label="Status"
        readonly=""
        color="primary"
      />
      <q-input
        class="full-width"
        outlined
        :value="
          data.KelasID ? data.KelasNama : data.KelasID == 0 ? 'Ekonomi' : ''
        "
        label="Kelas"
        readonly=""
        color="primary"
      />
      <q-input
        class="full-width"
        outlined
        :value="data.GolonganNama"
        label="Golongan"
        readonly=""
        color="primary"
      />
      <q-input
        class="full-width"
        outlined
        :value="data.KotaNama"
        label="Kota"
        readonly=""
        color="primary"
      />
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="center_focus_strong"
        color="primary"
        @click="openScanner()"
      />
    </q-page-sticky>
  </q-page>
</template>

<script src="./CheckinPage.js"></script>
