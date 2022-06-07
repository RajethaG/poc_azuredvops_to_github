<template>
  <v-container>
    <transition name="fade" mode="out-in">
      <div class="container backgroundColor bordered mt-5 rounded">
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
  computed: {
    breadcrumbs() {
      return this.$store.state.app.breadcrumbs
    }
  }
}
</script>
