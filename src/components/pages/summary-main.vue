<template>
  <v-container>
    <page-title text="VOA Order Summary" />
    <v-layout row wrap class="my-3">
      <v-flex xs12 md12>
        <BaseCard />
      </v-flex>
    </v-layout>
    <BaseTable
      :items="desserts"
      :fields="headers"
      :rows="rows"
      :hide-default-footer="false"
      label="Order History"
    ></BaseTable>
  </v-container>
</template>

<script>
import BaseCard from '../sections/BaseCard.vue'
import BaseTable from '../sections/BaseTable.vue'
import * as apiTypes from '@/services/api/api-types'
import axios from 'axios'

export default {
  components: {
    BaseCard,
    BaseTable
  },
  data() {
    return {
      rows: 5,
      headers: [
        { text: 'Heading One', value: 'one', sortable: false },
        { text: 'Heading Two', value: 'two' }
      ],
      desserts: [
        { one: 'one from items', two: 'two from items' },
        { one: 'one from items', two: 'three from items' }
      ]
    }
  },
  mounted() {
    // axios.get(
    //   `https://apim-dev-cpss.azure-api.net/consumerreport/api/VOA/
    //   GetOrderDetails?orderId=${this.$route.params.orderId}`
    // ).then((response)=>{
    //   this
    // })
  }
}
</script>

<style></style>
