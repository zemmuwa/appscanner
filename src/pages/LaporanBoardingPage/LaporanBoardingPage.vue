<template>
  <q-page class="flex">
    <div class="row full-height full-width q-px-md q-mt-md">
      <q-select
        filled
        v-model="selectedJadwal"
        use-input
        hide-selected
        input-debounce="0"
        label="Pilih Jadwal"
        :options="filteredDetailJadwal"
        @filter="filterFn"
        style="width: 250px"
        behavior="menu"
        fill-input
        map-options
        class="full-width"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Tidak ada data
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <div class="full-width">
        <q-card>
          <q-tabs
            v-model="tabsDetail"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="sudah" :label="`Sudah(${countSudah})`" />
            <q-tab name="belum" :label="`Belum(${countBelum})`" />
          </q-tabs>
          <q-separator />

          <q-tab-panels v-model="tabsDetail" animated>
            <q-tab-panel name="sudah">
              <q-markup-table wrap-cells dense separator="vertical">
                <thead>
                  <tr>
                    <th class="text-center ">
                      Nama Penumpang
                    </th>
                    <th class="text-center ">
                      No. Booking
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(detail, index2) in dataSudah"
                    :key="'belum' + index2"
                  >
                    <td class="text-left">{{ detail.nama_penumpnag }}</td>
                    <td class="text-left">
                      {{ detail.nomer_booking }}
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-tab-panel>
            <q-tab-panel name="belum">
              <q-markup-table wrap-cells dense separator="vertical">
                <thead>
                  <tr>
                    <th class="text-center ">
                      Nama Penumpang
                    </th>
                    <th class="text-center ">
                      No. Booking
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(detail, index2) in dataBelum"
                    :key="'belum' + index2"
                  >
                    <td class="text-left">{{ detail.nama_penumpnag }}</td>
                    <td class="text-left">
                      {{ detail.nomer_booking }}
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script src="./LaporanBoardingPage.js"></script>
