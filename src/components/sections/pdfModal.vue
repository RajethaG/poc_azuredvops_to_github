<template>
  <v-dialog v-model="isShowPDF" persistent scrollable width="1160">
    <v-card>
      <v-card-title class="my-3 ml-auto">
        <v-btn class="primary darken-2 mr-2" @click="showAndORDownloadPDF"
          ><v-icon>mdi-arrow-down-bold</v-icon>Download</v-btn
        >
        <v-btn @click="closeModal" class="primary darken-2"
          ><v-icon>mdi-close-thick</v-icon></v-btn
        >
      </v-card-title>
      <v-divider />
      <v-card-text v-if="previewUrl">
        <pdfViewer :use-as-component="true" :pdf-data="previewUrl" />
      </v-card-text>
      <v-card-text v-else> No Data to show (empty url) </v-card-text>
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
  data() {
    return {}
  },
  components: { pdfViewer },
  computed: {
    previewUrl() {
      return this.showAndORDownloadPDF(false)
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
    getPdfByteArray() {
      const theByteArray =
        this.pdfData?.fileData ||
        this.pdfData?.reportByteArray ||
        this.pdfData ||
        ''
      return theByteArray
    },
    showAndORDownloadPDF(isShouldDownload = true) {
      return common.downloadFile(
        this.getPdfByteArray(),
        this.pdfData.contentType || 'application/pdf',
        this.pdfData.fileName || 'VOA_Report',
        isShouldDownload
      )
    }
  }
}
</script>

<style></style>
