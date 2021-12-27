<template>
  <v-main>
    <v-container class="container bordered borderStyle">
      <v-layout wrap>
        <v-flex class="my-3" xs12 md12 v-for="data in commands" :key="data">
          <v-layout>
            <v-flex xs12 md6 class="text-left" v-for="dat in data" :key="dat">
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
  }
}
</script>

<style scoped>
.borderStyle {
  border-left: 5px solid rgb(8, 164, 175);
}
</style>
