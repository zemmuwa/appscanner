import Vue from "vue";
function initialState() {
  return {
    tabsDetail: "sudah",
    dataDetailJadwal: [],
    filteredDetailJadwal: [],
    selectedJadwal: null,
    dataSudah: [],
    dataBelum: [],
    countSudah: 0,
    countBelum: 0
  };
}
export default {
  mixins: [Vue.prototype.$mixinStore],
  name: "PageIndex",
  data() {
    return {
      tabsDetail: "sudah",
      dataDetailJadwal: [],
      filteredDetailJadwal: [],
      selectedJadwal: null,
      dataSudah: [],
      dataBelum: [],
      countSudah: 0,
      countBelum: 0
    };
  },
  methods: {
    onSubmit() {
      let _this = this;
      this.post({
        url: `${_this.baseURL}getDataPenumpang`,
        data: {
          token: this.token,
          jadwalID: this.selectedJadwal.value,
          sortBy: "Created",
          sortType: "ASC",
          filter: {
            status_penumpang: "boarding"
          }
        }
      }).then(values => {
        if (values.info == "success") {
          this.countSudah = values.data.length;
          this.dataSudah = values.data;
        } else {
          this.showNotif();
        }
      });

      this.post({
        url: `${_this.baseURL}getDataPenumpang`,
        data: {
          token: this.token,
          jadwalID: this.selectedJadwal.value,
          sortBy: "Created",
          sortType: "ASC",
          filter: {
            status_penumpang: "checkin"
          }
        }
      }).then(values => {
        if (values.info == "success") {
          this.countBelum = values.data.length;
          this.dataBelum = values.data;
        } else {
          this.showNotif();
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
      Object.assign(this.$data, initialState());
    },
    loadData() {
      this.resetData();
      let _this = this;
      this.post({
        url: `${_this.baseURL}getDetailJadwal`,
        data: {
          token: this.token
        }
      }).then(values => {
        if (values.info == "success") {
          this.dataDetailJadwal = values.data;
          this.filteredDetailJadwal = values.data;
        } else {
          this.showNotif(values.message);
        }
      });
    }
  },
  mounted() {
    this.loadData();
  },
  watch: {
    selectedJadwal: {
      handler: function(newVal) {
        if (newVal) {
          this.onSubmit();
        }
      },
      deep: true
    }
  }
};
