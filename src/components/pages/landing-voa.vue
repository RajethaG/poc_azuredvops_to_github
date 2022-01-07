<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex sm12 md6>
        <page-title :text="title" />
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex sm12 md6>
        <v-select
          v-if="products && products.length > 0"
          v-model="selectedComponent"
          :items="products"
          label="Choose Product"
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
import PageTitle from '../sections/PageTitle.vue'
import VOA from './voa/voaform.vue'
import VOE from './voe/voeform.vue'

export default {
  components: { VOA, VOE, PageTitle },
  data() {
    return {
      items: [{ text: 'VOA', value: 'voaform' }],
      selectedComponent: '',
      getValue: {}
    }
  },
  computed: {
    ...mapGetters(['config']),
    title() {
      return 'Verification of Assets'
    },
    products() {
      if (this.config.productOptions && this.config.productOptions.length > 0) {
        const prods = this.config.productOptions.map((item) => {
          return {
            value: this.getComponentKey(item.key),
            text: item.value
          }
        })
        return prods
      }
      return []
    }
  },
  methods: {
    getComponentKey(key) {
      switch (Number(key)) {
        case 50:
          return 'VOE'
        case 51:
          return 'VOA'
      }
      return ''
    },
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
