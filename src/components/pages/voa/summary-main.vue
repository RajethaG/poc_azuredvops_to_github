<template>
  <component :is="selectedComponent"></component>
</template>

<script>
import constant from '../../../constants/constant.json'
import voaAccountChekSummary from './accountcheck-summary.vue'
import voaFiservSummary from './fiserv-summary.vue'
import { mapGetters } from 'vuex'
export default {
  components: { voaAccountChekSummary, voaFiservSummary },
  data() {
    return {
      selectedComponent: '',
      selectedDataProviderKey: ''
    }
  },
  computed: {
    ...mapGetters(['config']),
    PRODUCTID() {
      return this.$route.params.productId || this.config.customerInfo.productId
    }
  },
  mounted() {
    this.selectedComponent = this.getComponentKey(this.PRODUCTID)
  },
  methods: {
    getComponentKey(key) {
      switch (Number(key)) {
        case constant.cpssProductIds.VOAAccountChek:
          return 'voaAccountChekSummary'
        case constant.cpssProductIds.VOAFiserv:
          return 'voaFiservSummary'
      }
      return ''
    }
  }
}
</script>

<style></style>
