<template>
  <v-main>
    <h1 class="primary">
      This is landing page for client - {{ config.client }}
    </h1>
    <div class="my-3">
      <v-layout wrap>
        <v-flex xs4 class="d-inline-block">
          <v-btn class="primary darken-2" @click="showSuccess"
            >Show Snackbar</v-btn
          >
        </v-flex>
        <v-flex xs4 class="d-inline-block">
          <v-btn class="primary darken-2" @click="toggleLayout"
            >toggle layout
          </v-btn>
        </v-flex>
      </v-layout>
    </div>

    <forms-components />
  </v-main>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import formsComponents from '../sections/forms-components.vue'
// import * as types from '@/store/mutation-types.js'
export default {
  components: { formsComponents },
  created() {
    // do the authentication here... call the api... mock api allow/unauthorized
    // Not maintaining any user session for now... localStorage...
  },
  mounted() {
    console.log('landing mounted ', this.breadcrumb)
  },
  methods: {
    ...mapActions(['setAlert', 'setNotification']),
    toggleLayout() {
      this.$store.dispatch(
        'getClientConfig',
        this.config.appTheme.layout === 'default' ? 'small' : 'avantus'
      )
    },
    showSuccess() {
      this.setNotification({
        msg: 'how are you',
        type: 'error'
      })
      this.$router.push('nextpage')

      this.$store.commit('SET_BREADCRUMB', [
        {
          text: 'red',
          href: '/go'
        },
        {
          text: 'Fraud Plus',
          href: '/zerobabel'
        },
        {
          text: 'New Breadcrumb',
          href: '/dese',
          disabled: true
        }
      ])
    }
  },
  computed: {
    ...mapGetters(['config', 'breadcrumbs'])
  }
}
</script>
