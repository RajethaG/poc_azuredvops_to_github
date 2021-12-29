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
import BaseCard from '../../sections/BaseCard.vue'
import BaseTable from '../../sections/BaseTable.vue'
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
        { one: 'one from items', two: 'three from items' },
        { one: 'one from items', two: 'two from items' },
        { one: 'one from items', two: 'two from items' },
        { one: 'one from items', two: 'two from items' },
        { one: 'one from items', two: 'two from items' }
      ]
    }
  }
}
</script>

<style></style>
