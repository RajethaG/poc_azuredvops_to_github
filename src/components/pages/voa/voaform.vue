<template>
  <section>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(save)">
        <v-container grid-list-md class="mx-0 px-0">
          <v-layout row wrap>
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
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm4>
              <ValidationProvider
                name="Email"
                rules="required|email|max:100"
                v-slot="{ errors }"
              >
                <v-text-field
                  label="Email"
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
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import * as apiTypes from '@/services/api/api-types'
import constant from '../../../constants/constant.json'
export default {
  props: {
    prefillData: {
      type: Object,
      default: () => {}
    },
    token: {
      type: String,
      default: null
    },
    customerProducts: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getRefreshPeriodMappable(stringValue) {
      switch (stringValue) {
        case '30 Days Refresh':
          return 30
        case '60 Days Refresh':
          return 60
        case '90 Days Refresh':
          return 90
        default:
          return 1
      }
    },
    buildVOAPayload() {
      const payload = {
        userId: this.USERID, // 2
        productId: constant.cpssProductIds.VOA,
        OrderForUser: this.USERID, // 1222,
        OrderForCustomer: this.CUSTOMERID, // 6
        borrowerFirstName: this.firstName,
        borrowerLastName: this.lastName,
        borrowerSSN: this.ssn,
        referenceNo: this.referenceNumber,
        borrowerEmailId: this.email,
        employerName: this.employerName === '' ? null : this.employerName,
        accountHistory: this.accountHistory,
        refreshPeriod: this.refreshPeriod,
        phoneNumber: this.phone.replace(/[^0-9]/g, '')
      }

      return payload
    },
    save() {
      const payload = this.buildVOAPayload()

      this.$store
        .dispatch('doPOST', {
          product: apiTypes.PRODUCT_VOA,
          payload,
          token:
            // eslint-disable-next-line max-len
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRXh0ZXJuYWxJRCI6ImU4YzI1YzljLTg0OTItNGIzNS05ZGRhLTk2NDVmNmE0ZTQ3ZSIsIlVzZXJJRCI6IjIiLCJDdXN0b21lcklkIjoiMSIsIkZpcnN0TmFtZSI6ImNwc3MiLCJNaWRkbGVJbml0aWFsIjoiSjEiLCJMYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJjcHNzYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDcmVkaXQgUGx1cyBBZG1pbiIsIkxvZ2luU2Vzc2lvbklEIjoiMCIsIkN1c3RvbWVyTmFtZSI6IkNyZWRpdCBQbHVzIiwiUm9sZXMiOiJDcmVkaXQgUGx1cyBBZG1pbiIsImV4cCI6MTY0MTU1OTQzMywiaXNzIjoiaHR0cHM6Ly9hemFwcC1jcHNzLWRldi1hcGktMDAxLmF6dXJld2Vic2l0ZXMubmV0L2F1dGgiLCJhdWQiOiJodHRwczovL2F6YXBwLWNwc3MtZGV2LWFwaS0wMDEuYXp1cmV3ZWJzaXRlcy5uZXQvIn0.VFAuPNW6WSICqnDbYaQZS-QzTj9nyLcuEmXnzMWaMJQ'
        })
        .then((response) => {
          this.$router.push({
            name: apiTypes.SUMMARY_REQUEST_INTERNAL,
            params: {
              product: apiTypes.PRODUCT_VOA,
              orderId: response.orderId
            },
            query: { Token: this.token }
          })
        })
    }
  },
  computed: {
    ...mapGetters(['config']),
    USERID() {
      return this.config.customerInfo.userId || 0
    },
    CUSTOMERID() {
      return this.config.customerInfo.customerId || 0
    },
    refreshPeriodItems() {
      const product = this.customerProducts.filter(
        (x) => Number(x.productId) === Number(constant.cpssProductIds.VOA)
      )
      if (product && product.length > 0) {
        const pd = product[0].productAddOns.map((item) => {
          return {
            value: this.getRefreshPeriodMappable(item.name), // Number(item.productAddOnId),
            text: item.name
          }
        })
        return pd
      }
      return []
    }
  },
  data() {
    return {
      referenceNumber: this.prefillData.referenceNumber || '',
      accountHistory: this.prefillData.accountHistory || '',
      refreshPeriod: this.prefillData.refreshPeriod || '',
      firstName: this.prefillData.firstName || '',
      lastName: this.prefillData.lastName || '',
      ssn: this.prefillData.ssn || '',
      email: this.prefillData.emailID || '',
      phone: this.prefillData.phoneNumber || '',
      employerName: this.prefillData.employerName || '',
      accountHistoryItems: [
        { text: '30 days', value: '30' },
        { text: '60 days', value: '60' },
        { text: '90 days', value: '90' }
      ]
      // refreshPeriodItems: [
      //   { text: 'One Time Report', value: 0 },
      //   { text: '30 Days Refresh', value: 30 },
      //   { text: '60 Days Refresh', value: 60 },
      //   { text: '90 Days Refresh', value: 90 }
      // ]
    }
  }
}
</script>
