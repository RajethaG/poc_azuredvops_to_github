<template>
  <v-main>
    <v-layout row wrap class="mt-5">
      <BaseLabel :label="label" />
    </v-layout>
    <v-layout row wrap>
      <v-flex md12 xs12>
        <v-data-table
          :headers="fields"
          :items="items"
          :items-per-page="rows"
          v-bind="$attrs"
        />
      </v-flex>
    </v-layout>
  </v-main>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Number,
      default: 5
    },
    isHideFooter: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      return() {}
    }
  }
}
</script>

<style></style>
