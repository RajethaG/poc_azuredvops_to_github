<template>
  <v-container>
    <!-- <v-app-bar height="90" fixed class="primary" shrink-on-scroll dark>
    </v-app-bar> -->
    <transition name="fade" mode="out-in">
      <div class="container bordered mt-5 rounded">
        <v-breadcrumbs :items="breadcrumbs">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
              {{ item.text.toUpperCase() }}
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
        <router-view class="mt-6" />
      </div>
    </transition>
    <SuccessMessage />
  </v-container>
</template>

<script>
import '@/assets/custom.css'

export default {
  created() {
    console.log('default layout created ', this.breadcrumbs)
    this.$store.commit('SET_BREADCRUMB', [
      {
        text: 'red',
        href: '/go'
      },
      {
        text: 'Fraud Plus',
        href: '/zerobabel'
      },
      {
        text: 'Package Management',
        href: '/dese',
        disabled: true
      }
    ])
  },
  mounted() {
    console.log(this.$store.state.app.breadcrumbs)
  },
  computed: {
    breadcrumbs() {
      return this.$store.state.app.breadcrumbs
    }
  }
}
</script>
