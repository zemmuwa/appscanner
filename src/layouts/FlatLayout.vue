<template>
  <q-layout>
    <!-- Be sure to play with the Layout demo on docs -->
    <q-page-container>
      <transition
        appear
        enter-active-class="animated slideInDown"
        leave-active-class="animated slideOutDown"
      >
        <router-view :key="key" style="animation-duration:0.5s" />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
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
