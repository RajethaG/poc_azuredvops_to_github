<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <h2 class="text-uppercase">{{ text }}</h2>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: {
    text: { type: String }
  }
}
</script>
