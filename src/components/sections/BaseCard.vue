<template>
  <v-main>
    <v-container
      class="container bordered"
      :style="{
        'border-left': `5px solid  ${borderStyle}`
      }"
    >
      <v-layout wrap>
        <v-flex
          class="my-3"
          xs12
          md12
          v-for="(data, index) in commands"
          :key="index"
        >
          <v-layout>
            <v-flex
              xs12
              md6
              class="text-left"
              v-for="(dat, index) in data"
              :key="index"
            >
              <strong>{{ dat.text }}</strong>
              <div>{{ dat.icon }}</div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      commands: [
        [
          { text: 'view Report', icon: 'pencil' },
          { text: 'Report', icon: 'sync' }
        ],
        [
          { text: 'show Report', icon: 'pencil' },
          { text: 'Get Report', icon: 'sync' }
        ]
      ]
    }
  },
  computed: {
    ...mapGetters(['config']),
    borderStyle() {
      return this.config.appTheme?.Theme || '#fff'
    }
  }
}
</script>
