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
    ...mapGetters(['config'])
  },
  mounted() {
    console.log(this.config.customerInfo.productId)
    this.selectedComponent = this.getComponentKey(
      this.config.customerInfo.productId
    )
  },
  methods: {
    getComponentKey(key) {
      console.log(Number(key))
      console.log(constant.cpssProductIds.VoaSummary)
      switch (Number(key)) {
        case constant.cpssProductIds.VoaAccountChekSummary:
          return 'voaFiservSummary'
        case constant.cpssProductIds.VOAFiserv:
          return 'VOAFiserve'
      }
      return ''
    }
  }
}
</script>

<style></style>
