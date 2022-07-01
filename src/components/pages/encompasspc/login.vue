<template>
  <div>
    <h1>Encompass Login</h1>

    <v-row>
      <v-col>
        <v-text-field outlined dense />
      </v-col>
      <v-col>
        <v-text-field outlined dense />
      </v-col>
    </v-row>
    <v-btn
      @click="$router.push({ name: nextRoute, params: { product: 'voe' } })"
      dark
      >LOGIN</v-btn
    >
  </div>
</template>
<script>
import { ENCOMPASS_PC_FORM } from '../../../../src/services/api/api-types'
export default {
  mounted() {
    console.log(ENCOMPASS_PC_FORM)
  },
  data() {
    return {
      nextRoute: ENCOMPASS_PC_FORM
    }
  }
}
</script>
