import Vue from "vue";
import * as sql from "boot/initSQLite";
import * as sp from "boot/sharedPref";
import { Loading } from "quasar";
export default {
  mixins: [Vue.prototype.$mixinStore],
  name: "PageIndex",
  data() {
    return {
      nomer_booking: "",
      data: {
        ClassName: "",
        LastEdited: "",
        Created: "",
        panggilan: "",
        harga: "",
        nama_penumpnag: "",
        nomer_booking: "",
        tgl_lahir: "",
        no_identitas: "",
        keterangan: "",
        status_penumpang: "",
        BookingID: "",
        KelasID: "",
        GolonganID: "",
        KotaID: "",
        JenisID: "",
        ID: "",
        RecordClassName: "",
        KotaNama: "",
        GolonganNama: "",
        KelasNama: ""
      },
      baseData: {
        ClassName: "",
        LastEdited: "",
        Created: "",
        panggilan: "",
        harga: "",
        nama_penumpnag: "",
        nomer_booking: "",
        tgl_lahir: "",
        no_identitas: "",
        keterangan: "",
        status_penumpang: "",
        BookingID: "",
        KelasID: -1,
        GolonganID: "",
        KotaID: "",
        JenisID: "",
        ID: "",
        RecordClassName: "",
        KotaNama: "",
        GolonganNama: "",
        KelasNama: "",
        GolonganJenis: ""
      },
      dataDetailJadwal: [],
      filteredDetailJadwal: [],
      selectedJadwal: null,
      options: [
        {
          label: "Google",
          value: 1
        },
        {
          label: "Facebook",
          value: 2
        },
        {
          label: "Twitter",
          value: 3
        },
        {
          label: "Apple",
          value: 4
        },
        {
          label: "Oracle",
          value: 5
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      this.$refs.nomorBooking.blur();
      if (this.selectedJadwal) {
        let _this = this;
        // eslint-disable-next-line no-unused-vars
        let val = null;
        let yet = 0;
        let update = async param => {
          // eslint-disable-next-line no-console
          console.log(param);
          val = param;
          if (val) {
            let data = sql.getDetailBookingDataByNomorBooking(
              _this.nomer_booking,
              _this.selectedJadwal.ID
            );
            setTimeout(() => {
              // eslint-disable-next-line no-console
              console.log(_this.selectedJadwal.ID, "ok");
              if (data.length) {
                // eslint-disable-next-line no-console

                _this.data = JSON.parse(data[0].JsonData);
                if (yet == 1) {
                  this.showNotif("Data sudah discan", "accent");
                } else {
                  this.showNotif("Data berhasil discan", "secondary", "done");
                }
              } else {
                this.showNotif(
                  "Nomor Booking tidak terdaftar pada jadwal ini",
                  "accent"
                );
              }
            }, 500);
          } else {
            this.showNotif("Scan Gagal", "accent");
          }
        };

        let data = sql.getDetailBookingDataByNomorBooking(
          _this.nomer_booking,
          _this.selectedJadwal.ID
        );
        setTimeout(() => {
          // eslint-disable-next-line no-console
          console.log(_this.selectedJadwal.ID, "ok2");
          if (data.length) {
            _this.data = JSON.parse(data[0].JsonData);
            if (data[0].IsScanned == 1) {
              yet = 1;
            } else {
              yet = 0;
            }
          }
          sql.scanDetailBookingData(
            this.nomer_booking,
            this.selectedJadwal.value,
            {
              success: update
            }
          );
        }, 500);
      } else {
        this.showNotif("Pilih jadwal terlebih dahulu", "accent");
      }
    },
    onlineScan() {
      let _this = this;
      this.post({
        url: `${_this.baseURL}getDataFromQRBoarding`,
        data: {
          token: this.token,
          nomer_booking: this.nomer_booking,
          jadwalID: this.selectedJadwal.value
        }
      }).then(values => {
        if (values.data) {
          this.data = values.data;
        }
        if (values.info == "success") {
          this.showNotif(values.message, "secondary", "done");
        } else {
          this.showNotif(values.message, "accent");
        }
      });
    },
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.filteredDetailJadwal = this.dataDetailJadwal;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.filteredDetailJadwal = this.dataDetailJadwal.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    resetData() {
      this.selectedJadwal = null;
      this.data = this.baseData;
    },
    loadData() {
      this.resetData();
      Loading.show({
        spinnerColor: "primary"
      });
      let _this = this;
      sp.get("jadwal", x => {
        _this.dataDetailJadwal = x.data;
        _this.filteredDetailJadwal = x.data;
        // eslint-disable-next-line no-console
        console.log(_this.filteredDetailJadwal);
        Loading.hide();
      });
      // this.post({
      //   url: `${_this.baseURL}getDetailJadwal`,
      //   data: {
      //     token: this.token,
      //     PetugasID: this.userID
      //   }
      // }).then(values => {
      //   if (values.info == "success") {
      //     this.dataDetailJadwal = values.data;
      //     this.filteredDetailJadwal = values.data;
      //   } else {
      //     this.showNotif(values.message);
      //   }
      // });
    },
    setSelectedJadwal(index) {
      this.selectedJadwal = this.filteredDetailJadwal[index];
    },
    openScanner() {
      let _this = this;
      cordova.plugins.barcodeScanner.scan(
        function(result) {
          _this.nomer_booking = result.text;
          _this.onSubmit();
        },
        function(error) {
          alert("Scanning failed: " + error);
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt: "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: true, // iOS
          disableSuccessBeep: false // iOS and Android
        }
      );
    }
  },
  mounted() {
    this.setBarTitle("Boarding");
    if (this.$q.platform.is.cordova) {
      this.loadData();
    }
  }
};
