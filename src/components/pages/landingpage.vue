<template>
  <v-container>
    <v-layout row wrap>
      <v-flex sm12 md6>
        <v-select
          v-model="selectedComponent"
          :items="config.productsList"
          label="Choose Product"
          item-text="name"
          item-value="value"
          outlined
          dense
          @change="getPreFillData(selectedComponent)"
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex sm12 md12>
        <component
          :is="selectedComponent"
          v-bind="{ prefillData: getValue }"
        ></component>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import VOA from './voa/voaform.vue'
import VOE from './voe/voeform.vue'

export default {
  components: { VOA, VOE },
  data() {
    return {
      items: [{ text: 'VOA', value: 'voaform' }],
      selectedComponent: '',
      getValue: {}
    }
  },
  computed: {
    ...mapGetters(['config'])
  },
  methods: {
    getAllValue(array) {
      const rObject = {}
      array.forEach((key) => {
        rObject[key] = this.config.autoFill?.find((x) => x.key === key)?.value
      })
      return rObject
    },
    getPreFillData(component) {
      switch (component) {
        case 'VOA':
          this.getValue = this.getAllValue([
            'referenceNumber',
            'accountHistory',
            'refreshPeriod'
          ])
          break
      }
    }
  }
}
</script>

<style></style>
