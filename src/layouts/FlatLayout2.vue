<template>
  <q-layout>
    <!-- Be sure to play with the Layout demo on docs -->
    <q-page-container :class="isBlank ? '' : 'bg-roro'">
      <transition
        mode="out-in"
        appear
        :leave-active-class="`animated ${animasiOut}`"
        :enter-active-class="`animated ${animasiIn}`"
      >
        <router-view :key="key" style="animation-duration:0.5s" />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import Vue from "vue";
export default {
  mixins: [Vue.prototype.$mixinStore],
  props: ["isBlank"],
  // name: 'LayoutName',

  data() {
    return {
      key: this.$router.currentRoute.fullPath
    };
  }
};
</script>
<style lang="stylus">
main {
  animation-duration: 1500ms;
}
</style>
