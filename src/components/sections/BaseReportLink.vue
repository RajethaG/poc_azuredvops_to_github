<template>
  <div class="text-right" :class="!showCommands.length ? '' : 'reportLink'">
    <div v-for="command in showCommands" :key="command.text" class="d-inline">
      <div class="d-inline-block my-2 ml-3">
        <v-icon v-if="command.icon" color="primary darken-2">
          {{ command.icon }}
        </v-icon>
        <v-btn
          text
          color="primary darken-2"
          :class="command.isdisable ? 'disabledCursor' : ''"
          @click="() => $emit('onCommandEvent', command.event)"
        >
          {{ command.text }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    actionLinks: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    showCommands() {
      return this.actionLinks.filter((comm) => comm.isShow)
    }
  }
}
</script>

<style scoped>
.reportLink {
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 4px;
}
</style>
