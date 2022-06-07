<template>
  <div class="text-center">
    <v-dialog
      v-model="isShowPDF"
      transition="dialog-top-transition"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2">{{ title }}</v-card-title>
        <v-divider class="pb-3"></v-divider>
        <v-card-text>
          <slot />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="confirmCancelClicked">
            {{ cancelVariant }}
          </v-btn>
          <v-btn color="primary" text @click="confirmOkClicked">
            {{ okVariant }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    okVariant: {
      type: String,
      default: 'Ok'
    },
    cancelVariant: {
      type: String,
      default: 'Cancel'
    },
    hideCancel: {
      type: Boolean,
      default: false
    },
    hideOk: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isShowPDF() {
      return this.getModalState()
    }
  },
  methods: {
    ...mapActions(['setModalView']),
    ...mapGetters(['getModalState']),
    confirmOkClicked() {
      this.$emit('confirmOkClicked')
    },
    confirmCancelClicked() {
      this.$emit('confirmCancelClicked')
    }
  }
}
</script>
