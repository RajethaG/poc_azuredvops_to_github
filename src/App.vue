<template>
  <v-app>
    <layout-default v-if="layout === 'default'" />
    <layout-small v-else-if="layout === 'small'" />
    <v-overlay :value="isAppBusy" color="#aaa" opacity="0.9">
      <v-progress-circular
        indeterminate
        size="36"
        color="grey lighten-2"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import LayoutDefault from './components/layout/layout-default.vue'
import LayoutSmall from './components/layout/layout-small.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['isAppBusy', 'themes', 'config']),
    layout() {
      return this.config?.layout || ''
    }
  },
  components: {
    LayoutDefault,
    LayoutSmall
  },
  watch: {
    config(val) {
      if (!val) {
        return
      }

      if (val.themes) {
        this.$setTheme(val.themes)
      }
    }
  }
}
</script>

<style>
.container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
