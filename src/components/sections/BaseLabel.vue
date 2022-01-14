<template>
  <div>
    <label v-if="label" :class="vclass">{{ label }}</label>
    <span v-if="markRequired" class="text-danger">*</span>
  </div>
</template>

<script>
export default {
  props: {
    markRequired: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    vclass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style></style>
