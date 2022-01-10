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
        >
          <template v-slot:[`item.url`]="{ item }">
            <v-flex>
              <a @click="openUrl(item.url)">{{ item.url }}</a>
              <v-btn
                v-if="item.isDisplayMail"
                class="primary darken-2 ml-2"
                @click="resendMail"
                >Resend Invitation</v-btn
              >
            </v-flex>
          </template>
        </v-data-table>
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
  },
  methods: {
    openUrl(frameURL) {
      window.open(frameURL, '_blank')
    },
    resendMail() {
      this.$emit('sendMail')
    }
  }
}
</script>

<style></style>
