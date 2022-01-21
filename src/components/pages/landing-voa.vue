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
          v-model="selectedDataProviderKey"
          :items="products"
          label="Choose Data Provider"
          outlined
          dense
          @change="updateSelectedDataProvider"
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex sm12 md12>
        <component
          :is="selectedComponent"
          v-bind="{
            prefillData: config.voaRequest,
            token: this.$route.query.Token,
            customerProducts: this.customerProducts,
            dataProvider: this.SELECTED_DATA_PROVIDER
          }"
        ></component>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PageTitle from '../sections/PageTitle.vue'
import VOA from './voa/voaform.vue'
import VOAFiserve from './voa/voaform-fiserv.vue'
import * as apiTypes from '@/services/api/api-types'
import constant from '../../constants/constant.json'

export default {
  components: { VOA, VOAFiserve, PageTitle },
  data() {
    return {
      items: [],
      selectedComponent: '',
      getValue: {},
      customerProducts: [],
      selectedDataProviderKey: ''
    }
  },
  computed: {
    ...mapGetters(['config']),
    SELECTED_DATA_PROVIDER() {
      if (this.config.dataProviders && this.config.dataProviders.length > 0) {
        const prods = this.config.dataProviders
          .filter((x) => x.key === this.selectedDataProviderKey)
          .map((item) => {
            return {
              value: item.key,
              text: item.value
            }
          })
        if (prods && prods.length > 0) {
          return prods[0]
        }
      }
      return {}
    },
    USERID() {
      return this.config.customerInfo.userId
    },
    title() {
      return 'Verification of Assets'
    },
    products() {
      if (this.config.dataProviders && this.config.dataProviders.length > 0) {
        const prods = this.config.dataProviders.map((item) => {
          return {
            value: item.key,
            text: item.value
          }
        })
        return prods
      }
      return []
    }
  },
  mounted() {
    this.doGET({
      getType: apiTypes.CPSS_GET_CUST_USER_PRODUCTS,
      params: {
        userId: this.USERID,
        token:
          // eslint-disable-next-line max-len
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRXh0ZXJuYWxJRCI6ImU4YzI1YzljLTg0OTItNGIzNS05ZGRhLTk2NDVmNmE0ZTQ3ZSIsIlVzZXJJRCI6IjIiLCJDdXN0b21lcklkIjoiMSIsIkZpcnN0TmFtZSI6ImNwc3MiLCJNaWRkbGVJbml0aWFsIjoiSjEiLCJMYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJjcHNzYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDcmVkaXQgUGx1cyBBZG1pbiIsIkxvZ2luU2Vzc2lvbklEIjoiMCIsIkN1c3RvbWVyTmFtZSI6IkNyZWRpdCBQbHVzIiwiUm9sZXMiOiJDcmVkaXQgUGx1cyBBZG1pbiIsImV4cCI6MTY0MTU1OTQzMywiaXNzIjoiaHR0cHM6Ly9hemFwcC1jcHNzLWRldi1hcGktMDAxLmF6dXJld2Vic2l0ZXMubmV0L2F1dGgiLCJhdWQiOiJodHRwczovL2F6YXBwLWNwc3MtZGV2LWFwaS0wMDEuYXp1cmV3ZWJzaXRlcy5uZXQvIn0.VFAuPNW6WSICqnDbYaQZS-QzTj9nyLcuEmXnzMWaMJQ'
      },
      errorMessage: 'Unable to load customer products'
    }).then((data) => {
      this.customerProducts = data
    })
    // mount is triggered only after config is loaded
    // uncomment if default selection is to be enabled
    // if (this.config.voaRequest) {
    //   this.selectedComponent = 'VOA'
    // }
  },
  methods: {
    ...mapActions(['doGET']),
    updateSelectedDataProvider(item) {
      this.selectedComponent = this.getComponentKey(item)
    },
    getComponentKey(key) {
      switch (Number(key)) {
        case constant.cpssProductIds.VOA:
          return 'VOA'
        case constant.cpssProductIds.VOAFiserv:
          return 'VOAFiserve'
      }
      return ''
    }
  }
}
</script>

<style></style>
