<template>
  <v-container>
    <v-layout row wrap>
      <v-flex sm12 md6>
        <v-select
          v-model="selectedComponent"
          :items="items"
          label="Standard"
          outlined
          dense
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex sm12 md12>
        <component :is="selectedComponent"></component>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import voaform from './voa/voaform.vue'
export default {
  components: { voaform },
  data() {
    return {
      items: [{ text: 'VOA', value: 'voaform' }],
      selectedComponent: ''
    }
  }
}
</script>

<style></style>
