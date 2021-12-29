<template>
  <v-container>
    <v-flex xs12>
      <h2 class="text-uppercase primary--text">{{ text }}</h2>
    </v-flex>
  </v-container>
</template>
<script>
export default {
  props: {
    text: { type: String }
  }
}
</script>
