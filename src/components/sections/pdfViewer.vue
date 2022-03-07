<template>
  <div>
    <pdf
      v-for="i in numberOfPages"
      :key="i"
      :src="pdfSrc"
      :page="i"
      :class="useAsComponent ? '' : 'pdfViewer'"
    />
  </div>
</template>

<script>
import vuePdf from 'vue-pdf'
export default {
  props: {
    pdfData: {
      type: String,
      default: ''
    },
    useAsComponent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pdfSrc: {},
      numberOfPages: undefined
    }
  },
  components: {
    pdf: vuePdf
  },
  mounted() {
    this.pdfSrc = this.pdfData
    this.createLoadingTask()
  },
  methods: {
    createLoadingTask() {
      const loadingTask = vuePdf.createLoadingTask(this.pdfData)
      loadingTask.promise.then((pdf) => {
        this.numberOfPages = pdf.numPages
      })
    }
  }
}
</script>

<style></style>
