<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider=" > " />
    <h1>Encompass PC VOE Summary</h1>
  </div>
</template>
<script>
import {
  ENCOMPASS_PC_FORM,
  ENCOMPASS_PC_SUMMARY
} from '../../../services/api/api-types'
export default {
  data() {
    return {
      nextRoute: ENCOMPASS_PC_SUMMARY,
      breadcrumbs: [{ text: 'Voe Form', href: ENCOMPASS_PC_FORM }]
    }
  }
}
</script>
