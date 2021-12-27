<template>
  <div>
    <label v-if="label">{{ label }}</label>
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
    }
  }
}
</script>

<style></style>
