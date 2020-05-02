import Vue from "vue";
import { format } from "quasar";
const { capitalize } = format;
export default {
  mixins: [Vue.prototype.$mixinStore],
  name: "CheckIn",
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
      }
    };
  },
  methods: {
    onSubmit() {
      let _this = this;
      this.post({
        url: `${_this.baseURL}getDataFromQR`,
        data: {
          token: this.token,
          nomer_booking: this.nomer_booking
        }
      }).then(values => {
        if (values.data) {
          this.data = values.data;
        }
        if (values.info == "success") {
          this.showNotif(values.message, "green");
        } else {
          this.showNotif(values.message);
        }
      });
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
    },
    loadData() {},
    capitalize(param) {
      return capitalize(param);
    }
  },
  mounted() {}
};
