import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { date, format } from "quasar";
// destructuring to keep only what is needed
const { capitalize } = format;
//import moment from "moment";
export default ({ Vue, store }) => {
  function getPropsModul(type, name) {
    let arr;
    if (type != "state" && type != "_mutations") {
      arr = Reflect.ownKeys(store[type]).map(function(x) {
        return x.replace(new RegExp(name + "/", "g"), "");
      });
    } else if (type == "_mutations") {
      arr = Reflect.ownKeys(store[type]).filter(function(y) {
        return y.includes(name);
      });
      arr = arr.map(function(x) {
        return x.replace(new RegExp(name + "/", "g"), "");
      });
    } else {
      arr = Reflect.ownKeys(store[type][name]);
      arr.pop();
    }
    return arr;
  }
  const mixin = {
    methods: {
      ...mapActions("GlobalData", getPropsModul("_actions", "GlobalData")),
      ...mapActions("WebService", getPropsModul("_actions", "WebService")),
      ...mapMutations("WebService", ["setIdentity"]),
      ...mapMutations("GlobalData", ["setBarTitle"]),
      showNotif(param = "Gagal Saat Request", color = "red") {
        this.$q.notify({
          message: param,
          color: color,
          position: "top"
        });
      },
      formatDateTime(param, format) {
        //return moment(param).format("DD-MM-YYYY");
        return date.formatDate(param, format);
      },
      formatCapital(param) {
        if (param) {
          return capitalize(param);
        }
        return "";
      },
      formatCurrency(param) {
        if (typeof param != "number") {
          param = parseFloat(param);
        }
        param = param.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
        if (!param) {
          return 0;
        }
        return param;
      },
      getFormatedData(val, type) {
        let formated;
        switch (type) {
          case "date":
            formated = this.formatDateTime(val, "DD/MM/YYYY");
            break;
          case "datetime":
            formated = this.formatDateTime(val, "DD/MM/YYYY HH:mm:ss");
            break;
          case "number":
            formated = this.formatCurrency(val);
            break;
          default:
            formated = val;
            break;
        }
        return formated;
      },
      compareData(data1, data2, type = "LIKE") {
        let cek = false;
        if (typeof data1 == "number") {
          data1 = data1.toString();
        }
        switch (type) {
          case "LIKE":
            cek = data1.toUpperCase().includes(data2);
            break;

          default:
            break;
        }
        return cek;
      }
    },

    computed: {
      ...mapState("GlobalData", getPropsModul("state", "GlobalData")),
      ...mapGetters("GlobalData", getPropsModul("getters", "GlobalData")),
      ...mapState("WebService", getPropsModul("state", "WebService")),
      ...mapGetters("WebService", getPropsModul("getters", "WebService")),
      getBgTheme() {
        return {
          "background-color": this.theme
        };
      }
    },
    created() {
      this.$root.$on("reloadData", this.loadData);
    },
    beforeDestroy() {
      this.$root.$off("reloadData", this.loadData);
    }
  };
  Vue.prototype.$mixinStore = mixin;
};
