<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex sm12 md6>
        <page-title :text="title" />
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="products && products.length > 0">
      <v-flex sm12 md6>
        <v-select
          v-model="selectedComponent"
          :items="products"
          label="Choose Product"
          outlined
          dense
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex sm12 md12>
        <component
          :is="selectedComponent"
          v-bind="{
            prefillData: config.voaRequest,
            token: this.$route.query.tk
          }"
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
      items: [],
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
  mounted() {
    // mount is triggered only after config is loaded
    // uncomment if default selection is to be enabled
    // if (this.config.voaRequest) {
    //   this.selectedComponent = 'VOA'
    // }
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
    }
  }
}
</script>

<style></style>
