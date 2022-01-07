<template>
  <section class="my-3">
    <v-flex xs12>
      <h2 class="text-uppercase primary--text">{{ text }}</h2>
    </v-flex>
  </section>
</template>
<script>
export default {
  props: {
    text: { type: String }
  }
}
</script>
