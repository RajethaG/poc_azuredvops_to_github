<template>
  <v-container>
    <v-layout row wrap class="my-3">
      <v-flex xs12 md12>
        <BaseCard></BaseCard>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <p>Order History</p>
    </v-layout>
  </v-container>
</template>

<script>
import BaseCard from '../../sections/BaseCard.vue'
export default {
  components: {
    BaseCard
  }
}
</script>

<style></style>
