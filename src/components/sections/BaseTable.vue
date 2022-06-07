<template>
  <v-main>
    <v-layout row wrap class="mt-5">
      <BaseLabel :label="label" :vclass="labelclass" />
    </v-layout>
    <v-layout row wrap>
      <v-flex md12 xs12>
        <v-data-table
          :headers="HEADERS"
          :items="items"
          :items-per-page="rows"
          v-bind="$attrs"
        >
          <template v-slot:[`item.url`]="{ item }">
            <v-flex>
              <a @click="openUrl(item.url)">{{ item.url }}</a>
              <!-- <v-btn
                v-if="item.isDisplayMail"
                class="primary darken-2 ml-2"
                @click="resendMail"
                >Resend Invitation</v-btn
              >

              <v-btn
                v-if="item.isDisplayDelete"
                class="primary darken-2 ml-2"
                @click="deleteBorrower"
                >Delete Borrower</v-btn
              > -->
            </v-flex>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-flex>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    v-if="item.isDisplayMail"
                    class="darken-2 ml-2"
                    @click="resendMail"
                  >
                    mdi-refresh
                  </v-icon>
                </template>
                <span>Resend Invite Email</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    v-if="item.isDisplayDelete"
                    class="darken-2 ml-2"
                    @click="deleteBorrower"
                    >mdi-delete-circle-outline</v-icon
                  >
                </template>
                <span> Delete Borrower</span>
              </v-tooltip>
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
    },
    labelclass: {
      type: String,
      default: ''
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
    },
    deleteBorrower() {
      this.$emit('deleteBorrower')
    }
  },
  computed: {
    HEADERS() {
      return this.fields.map((item) => {
        return Object.assign({}, { ...item }, { class: 'bheaders' })
      })
    }
  }
}
</script>

<style>
.bheaders {
  background: #f5f5f5;
  color: white;
  font-weight: bold;
}
</style>
