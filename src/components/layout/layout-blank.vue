<template>
  <v-container>
    <transition name="fade" mode="out-in">
      <div class="container bordered mt-5 rounded">
        <router-view />
      </div>
    </transition>
  </v-container>
</template>

<script>
import '@/assets/custom.css'
export default {}
</script>
