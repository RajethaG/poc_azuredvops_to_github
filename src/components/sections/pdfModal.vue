<template>
  <v-dialog v-model="isShowPDF" persistent scrollable width="1160">
    <v-card>
      <v-card-title class="my-3 ml-auto">
        <v-btn class="primary darken-2 mr-2" @click="DownloadPDF"
          ><v-icon>mdi-arrow-down-bold</v-icon>Download</v-btn
        >
        <v-btn @click="closeModal" class="primary darken-2"
          ><v-icon>mdi-close-thick</v-icon></v-btn
        >
      </v-card-title>
      <v-divider />
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
          this.pdfData.fileData || this.pdfData.reportByteArray,
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
        this.pdfData.fileData || this.pdfData.reportByteArray,
        this.pdfData.contentType || 'application/pdf',
        this.pdfData.fileName || 'VOA_Report',
        true
      )
    }
  }
}
</script>

<style></style>
