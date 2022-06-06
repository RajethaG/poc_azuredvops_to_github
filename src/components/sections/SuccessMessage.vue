<template>
  <v-container v-show="showMessage">
    <v-layout>
      <v-flex>
        <v-snackbar
          v-model="showMessage"
          :color="notificationType"
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
      'showNotification',
      'notificationTimeout',
      'notificationMessage',
      'notificationType'
    ]),
    showMessage: {
      get() {
        return this.showNotification
      },
      set(value) {
        this.$store.commit(types.SHOW_NOTIFICATION, value)
      }
    },
    message() {
      return this.notificationMessage
    },
    messageTimeout() {
      return this.notificationTimeout
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
