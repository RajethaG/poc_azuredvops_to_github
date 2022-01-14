<template>
  <section class="my-3">
    <v-flex xs12>
      <div class="text-uppercase primary--text text-h4">
        {{ text }}
      </div>
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
