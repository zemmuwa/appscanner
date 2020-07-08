import Vue from "vue";
export default {
  mixins: [Vue.prototype.$mixinStore],
  name: "splash",
  data() {
    return {
      version: "1.1.b5"
    };
  },
  mounted() {
    this.$q.localStorage.set("isNotSplash", true);
    setTimeout(() => {
      this.$router.replace("/");
    }, 4000);
  }
};
