<template>
  <v-container>
    <h1>Small Layout without app-bar</h1>
    <!-- <v-app-bar height="90" fixed class="primary" shrink-on-scroll dark> -->
    <!-- </v-app-bar> -->
    <transition name="fade" mode="out-in">
      <div class="container bordered mt-5 rounded">
        <router-view class="mt-12 pt-12" />
      </div>
    </transition>
    <SuccessMessage />
  </v-container>
</template>

<script>
import '@/assets/custom.css'

export default {}
</script>
