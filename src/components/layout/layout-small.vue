<template>
  <v-container>
    <!-- <v-app-bar height="90" fixed class="primary" shrink-on-scroll dark> -->
    <!-- </v-app-bar> -->
    <transition name="fade" mode="out-in">
      <div class="container backgroundColor bordered mt-5 rounded">
        <router-view />
      </div>
    </transition>
    <SuccessMessage />
  </v-container>
</template>

<script>
import '@/assets/custom.css'

export default {}
</script>
