<template>
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
        </v-layout>
        <v-layout row wrap align-center>
          <v-flex class="flex-grow-0 flex-shrink-0">
            <BaseLabel label="Borrower Information" />
          </v-flex>
          <v-flex>
            <v-divider></v-divider>
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
              name="Middle Name"
              rules="max:50|alpha_num"
              v-slot="{ errors }"
            >
              <v-text-field
                label="Middle Name"
                v-model="middleName"
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
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <ValidationProvider
              name="SSN"
              rules="required|min:11|max:11"
              v-slot="{ errors }"
            >
              <v-text-field
                label="SSN"
                v-model="ssn"
                v-mask="'###-##-####'"
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
              rules="min:14|max:14"
              v-slot="{ errors }"
            >
              <v-text-field
                label="Phone Number"
                v-model="phone"
                v-mask="'(###) ###-####'"
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import constant from '../../../constants/constant.json'
import * as apiTypes from '@/services/api/api-types'
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
    },
    dataProvider: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.refreshPeriodItems = this.setRefreshPeriodItems()
    this.refreshPeriod = this.prefillData.refreshPeriod || 0
  },
  // watch: {
  //   customerProducts() {
  //     this.refreshPeriodItems = this.setRefreshPeriodItems()
  //     this.refreshPeriod = this.prefillData.refreshPeriod || 0
  //   }
  // },
  data() {
    return {
      referenceNumber: this.prefillData.referenceNumber || '',
      transactionHistory: this.prefillData.accountHistory || '',
      transactionHistoryItems: [
        { text: '30 days', value: '30' },
        { text: '60 days', value: '60' },
        { text: '90 days', value: '90' }
      ],
      refreshPeriodItems: [],
      refreshPeriod: this.prefillData.refreshPeriod,
      firstName: this.prefillData.firstName || '',
      lastName: this.prefillData.lastName || '',
      ssn: this.prefillData.ssn || '',
      email: this.prefillData.emailID || '',
      phone: this.prefillData.phoneNumber || '',
      middleName: this.prefillData.middleName || ''
    }
  },
  computed: {
    ...mapGetters(['config']),
    USERID() {
      return this.config.customerInfo.userId || 0
    },
    CUSTOMERID() {
      return this.config.customerInfo.customerId || 0
    }
  },
  methods: {
    ...mapActions(['setNotification', 'doPOST']),
    buildFiservRequest() {
      return {
        userId: this.USERID,
        Source: 'AVANTUS UI',
        productId: constant.cpssProductIds.VOAFiserv,
        OrderForUser: this.USERID,
        OrderForCustomer: this.CUSTOMERID,
        referenceNumber: this.referenceNumber,
        transactionHistory: this.transactionHistory,
        refreshPeriod: this.refreshPeriod,
        borrowerRequestViewModel: {
          firstName: this.firstName,
          middleName: this.middleName,
          lastName: this.lastName,
          ssn: this.ssn,
          emailAddress: this.email,
          phoneNumber: this.phone.replace(/[^0-9]/g, '')
        }
      }
    },
    save() {
      const payload = this.buildFiservRequest()
      this.doPOST({
        product: apiTypes.PRODUCT_FISERV,
        payload,
        token: this.token,
        errorMessage: 'Order Cannot be Completed'
      })
    },
    // eslint-disable-next-line consistent-return
    setRefreshPeriodItems() {
      if (this.customerProducts) {
        const product = this.customerProducts.filter(
          (x) => Number(x.productId) === Number(constant.cpssProductIds.VOA)
        )
        if (product && product.length > 0) {
          const pd = product[0].productAddOns
            .filter((item) => item.changeable === true)
            .map((item) => {
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
    getRefreshPeriodMappable(stringValue) {
      switch (stringValue) {
        case '30 Days Refresh':
          return 30
        case '60 Days Refresh':
          return 60
        case '90 Days Refresh':
          return 90
        case 'One Time Report':
          return 0
        default:
          return 1
      }
    }
  }
}
</script>

<style></style>
