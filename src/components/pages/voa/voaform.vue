<template>
  <v-container>
    <page-title text="Verification of Assets" />
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(save)">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 sm4>
              <ValidationProvider
                name="Reference Number"
                rules="required|max:14|alpha_num"
                v-slot="{ errors }"
              >
                <v-text-field
                  label="Reference Number"
                  v-model="referenceNumber"
                  :error="errors.length > 0"
                  :error-messages="errors[0]"
                  autocomplete="off"
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 sm4>
              <ValidationProvider
                name="Account History"
                rules="required"
                v-slot="{ errors }"
              >
                <v-select
                  :items="accountHistoryItems"
                  v-model="accountHistory"
                  label="Account History"
                  :error="errors.length > 0"
                  :error-messages="errors[0]"
                  class="px-0"
                  outlined
                  dense
                ></v-select>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 sm4>
              <ValidationProvider
                name="Refresh Period"
                rules="required"
                v-slot="{ errors }"
              >
                <v-select
                  :items="refreshPeriodItems"
                  v-model="refreshPeriod"
                  label="Refresh Period"
                  :error="errors.length > 0"
                  :error-messages="errors[0]"
                  outlined
                  dense
                ></v-select>
              </ValidationProvider>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm4>
              <ValidationProvider
                name="First Name"
                rules="required|max:50|alpha_num"
                v-slot="{ errors }"
              >
                <v-text-field
                  label="First Name"
                  v-model="firstName"
                  :error="errors.length > 0"
                  :error-messages="errors[0]"
                  autocomplete="off"
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 sm4>
              <ValidationProvider
                name="Last Name"
                rules="required|max:50|alpha_num"
                v-slot="{ errors }"
              >
                <v-text-field
                  label="Last Name"
                  v-model="lastName"
                  :error="errors.length > 0"
                  :error-messages="errors[0]"
                  autocomplete="off"
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 sm4>
              <ValidationProvider
                name="SSN"
                rules="required|max:10"
                v-slot="{ errors }"
              >
                <v-text-field
                  label="SSN"
                  v-model="ssn"
                  :error="errors.length > 0"
                  :error-messages="errors[0]"
                  autocomplete="off"
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm4>
              <ValidationProvider
                name="Email Id"
                rules="required|email|max:100"
                v-slot="{ errors }"
              >
                <v-text-field
                  label="Email Id"
                  v-model="email"
                  :error="errors.length > 0"
                  :error-messages="errors[0]"
                  autocomplete="off"
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 sm4>
              <ValidationProvider
                name="Phone Number"
                rules="required|max:10"
                v-slot="{ errors }"
              >
                <v-text-field
                  label="Phone Number"
                  v-model="phone"
                  :error="errors.length > 0"
                  :error-messages="errors[0]"
                  autocomplete="off"
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm4>
              <ValidationProvider
                name="Employer Name"
                rules="required|max:50|alpha_num"
                v-slot="{ errors }"
              >
                <v-text-field
                  label="Employer Name"
                  v-model="employerName"
                  :error="errors.length > 0"
                  :error-messages="errors[0]"
                  autocomplete="off"
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>
            </v-flex>
          </v-layout>
          <v-layout justify-start>
            <v-flex xs12 md1>
              <v-btn type="submit" class="primary darken-2">Order</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </form>
    </ValidationObserver>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  methods: {
    save() {
      this.$router.push({
        name: 'voasummary',
        params: { id: 1 },
        query: { tk: this.token }
      })
    }
  },
  computed: {
    ...mapGetters(['config']),
    token() {
      return this.$route.query.tk
    }
  },
  watch: {
    config(value) {
      this.referenceNumber = value.voaRequest.referenceNumber
      this.accountHistory = value.voaRequest.accountHistory
      this.refreshPeriod = value.voaRequest.refreshPeriod
      this.ssn = value.voaRequest.ssn
      this.firstName = value.voaRequest.firstName
      this.lastName = value.voaRequest.lastName
      this.email = value.voaRequest.emailID
      this.phone = value.voaRequest.phoneNumber
      this.employerName = value.voaRequest.employerName
    }
  },
  data() {
    return {
      referenceNumber: '',
      accountHistory: '',
      refreshPeriod: null,
      firstName: '',
      lastName: '',
      ssn: '',
      email: '',
      phone: '',
      employerName: '',
      accountHistoryItems: [
        { text: '30 days', value: 30 },
        { text: '60 days', value: 60 },
        { text: '90 days', value: 90 }
      ],
      refreshPeriodItems: [
        { text: 'One Time Report', value: 'One Time Report' },
        { text: '30 Days Refresh', value: '30 Days Refresh' },
        { text: '60 Days Refresh', value: '60 Days Refresh' },
        { text: '90 Days Refresh', value: '90 Days Refresh' }
      ]
    }
  }
}
</script>
