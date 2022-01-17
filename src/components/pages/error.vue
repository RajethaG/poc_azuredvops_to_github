<template>
  <v-container>
    <v-layout wrap row>
      <v-flex md12 xs12>
        <h5 class="primary--text text-center">
          {{ this.$route.params.message || this.message }}
        </h5>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: () => 'An unexpected error has been encountered'
    }
  }
}
</script>

<style></style>
