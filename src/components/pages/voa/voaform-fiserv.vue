<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(save)">
      <v-container grid-list-md class="mx-0 px-0">
        <v-layout row wrap>
          <v-alert type="info">
            VOA-Fiserv is not yet implemented in CPSS
          </v-alert>
        </v-layout>
        <v-layout row wrap v-if="1 === 3">
          <v-flex xs12 sm4>
            <ValidationProvider
              name="Reference Number"
              rules="required|max:50|alpha_num"
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
              name="Transaction History"
              rules="required"
              v-slot="{ errors }"
            >
              <v-select
                :items="transactionHistoryItems"
                v-model="transactionHistory"
                label="Transaction History"
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
          <v-flex xs12>
            <BaseLabel label="Borrower Information" />
          </v-flex>
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
              rules="required|numeric|max:10|min:10"
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

          <v-flex xs12 sm4>
            <ValidationProvider
              name="Email Id"
              rules="required|email|max:50"
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
              rules="required|numeric|max:10|min:10"
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
        <v-layout justify-start v-if="1 === 3">
          <v-flex xs12 md1>
            <v-btn type="submit" class="primary darken-2">Order</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    prefillData: {
      type: Object,
      default: () => {}
    },
    token: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      referenceNumber: this.prefillData.referenceNumber || '',
      transactionHistory: this.prefillData.accountHistory || '',
      transactionHistoryItems: [
        { text: '30 days', value: 30 },
        { text: '60 days', value: 60 },
        { text: '90 days', value: 90 }
      ],
      refreshPeriodItems: [
        { text: 'One Time Report', value: 0 },
        { text: '30 Days Refresh', value: 30 },
        { text: '60 Days Refresh', value: 60 },
        { text: '90 Days Refresh', value: 90 }
      ],
      refreshPeriod: this.prefillData.refreshPeriod || '',
      firstName: this.prefillData.firstName || '',
      lastName: this.prefillData.lastName || '',
      ssn: this.prefillData.ssn || '',
      email: this.prefillData.emailID || '',
      phone: this.prefillData.phoneNumber || ''
    }
  },
  methods: {
    ...mapActions(['setNotification']),
    save() {
      this.setNotification({
        msg: 'Order Cannot be Completed',
        type: 'error'
      })
    }
  }
}
</script>

<style></style>
