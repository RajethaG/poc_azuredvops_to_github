<template>
  <v-dialog v-model="isShowPDF" persistent scrollable width="1160">
    <v-card>
      <v-card-title>
        <v-btn class="primary darken-2" @click="DownloadPDF">Download</v-btn>
        <v-btn class="primary darken-2 ml-auto" @click="closeModal"
          >Close</v-btn
        >
      </v-card-title>
      <v-card-text v-if="Object.keys(pdfData).length">
        <pdfViewer :use-as-component="true" :pdf-data="pdfURL" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import common from '../../utils/common'
import pdfViewer from './pdfViewer.vue'
import { mapGetters, mapActions } from 'vuex'
// import constant from '../../constants/constant'
export default {
  props: {
    pdfData: {
      type: Object,
      required: true
    }
  },
  components: { pdfViewer },
  computed: {
    pdfURL() {
      if (this.pdfData !== {}) {
        return common.downloadFile(
          this.pdfData.fileData,
          'application/pdf',
          'pdf'
        )
      }
      return ''
    },
    isShowPDF() {
      return this.getPDFState()
    }
  },
  methods: {
    ...mapActions(['setPDFView']),
    ...mapGetters(['getPDFState']),
    closeModal() {
      this.setPDFView(false)
    },
    DownloadPDF() {
      return common.downloadFile(
        this.pdfData.fileData,
        this.pdfData.contentType,
        this.pdfData.fileName,
        true
      )
    }
  }
}
</script>

<style></style>
