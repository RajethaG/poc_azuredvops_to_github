<template>
  <div>
    <pdf
      v-for="i in numberOfPages"
      :key="i"
      :src="pdfSrc"
      :page="i"
      :class="'pdfViewer'"
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
    this.pdfSrc = this.$route.query.url
    this.createLoadingTask()
  },
  methods: {
    createLoadingTask() {
      const loadingTask = vuePdf.createLoadingTask(this.pdfSrc)
      loadingTask.promise.then((pdf) => {
        this.numberOfPages = pdf.numPages
      })
    }
  }
}
</script>

<style></style>
