<template>
  <div>
    <h1>Encompass PC VOE Form</h1>
    <section>
      <v-card-title>VOE UI Form shows here</v-card-title>
      <p>Items must be prefilled from the JavaScript API</p>
    </section>
    <v-btn
      dark
      @click="
        $router.push({
          name: nextRoute,
          params: { product: 'voe', orderId: '1Z23A45K' }
        })
      "
      >Submit (go to Summary)</v-btn
    >
  </div>
</template>
<script>
import { ENCOMPASS_PC_SUMMARY } from '../../../../src/services/api/api-types'
export default {
  data() {
    return {
      nextRoute: ENCOMPASS_PC_SUMMARY
    }
  }
}
</script>
