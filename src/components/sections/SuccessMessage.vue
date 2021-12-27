<template>
  <v-container v-show="showMessage">
    <v-layout>
      <v-flex>
        <v-snackbar
          v-model="showMessage"
          color="success"
          top
          right
          :timeout="messageTimeout"
        >
          {{ message }}
          <v-btn icon @click="showMessage = false" class="float-right"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-snackbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'

export default {
  name: 'SuccessMessage',
  computed: {
    ...mapGetters([
      'showSuccessMessage',
      'successMessageTimeout',
      'successMessage'
    ]),
    showMessage: {
      get() {
        return this.showSuccessMessage
      },
      set(value) {
        console.log('setting showMessage ', value)
        this.$store.commit(types.SHOW_SUCCESS, value)
      }
    },
    message() {
      return this.successMessage
    },
    messageTimeout() {
      return this.successMessageTimeout
    }
  },
  watch: {
    // successMessage() {
    //   setTimeout(() => {
    //     this.showMessage = this.showSuccessMessage
    //   }, 100)
    // }
  }
}
</script>
