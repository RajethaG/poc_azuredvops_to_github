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
                rules="required|max:50"
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
                rules="required|max:50"
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
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm4>
              <v-layout row wrap>
                <v-flex xs12 sm12>
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
                <v-flex xs12 sm12>
                  <ValidationProvider
                    name="Phone Number"
                    rules="required|min:14|max:14"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      label="Phone Number"
                      v-mask="'(###) ###-####'"
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
                <v-flex xs12 sm12>
                  <ValidationProvider
                    name="Employer Name"
                    rules="max:50|alpha_num"
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
            </v-flex>
            <v-flex v-if="prefillData.poS_Display === 'Y'" xs12 sm6 offset-sm-1>
              <v-layout row wrap>
                <v-flex xs12 sm12>
                  <v-radio-group v-model="card" row mandatory>
                    <v-radio
                      v-for="data in cardOptions"
                      :key="data.value"
                      :label="data.text"
                      :value="data.value"
                      :disabled="data.disabled"
                    />
                  </v-radio-group>
                </v-flex>
              </v-layout>
              <v-row v-if="card !== 'Bill Later'" class="pl-1" align="center">
                <pos
                  :posData="{
                    ...prefillData,
                    ...{ card: card },
                    ...{ token: token }
                  }"
                  ref="pos"
                  @cardData="cardData"
                />
              </v-row>
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
import { mapActions, mapGetters } from 'vuex'
import * as apiTypes from '@/services/api/api-types'
import constant from '../../../constants/constant.json'
import pos from '../../sections/pos.vue'
export default {
  components: { pos },
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
  mounted() {
    this.card =
      this.prefillData &&
      this.prefillData.poS_CardHolderName === '' &&
      this.prefillData.poS_CardHolderStreet === '' &&
      this.prefillData.poS_CardHolderZip === '' &&
      this.prefillData.poS_CardHolderCity === '' &&
      this.prefillData.poS_CardHolderState === '' &&
      this.prefillData.poS_CardType === '' &&
      this.prefillData.poS_CardNumber === '' &&
      this.prefillData.poS_CardExpiry === ''
        ? 'New Card'
        : 'Saved Card'

    this.cardOptions.push(
      {
        text: 'Saved Card',
        value: 'Saved Card',
        disabled: this.isSavedDisable
      },
      { text: 'New Card', value: 'New Card', disabled: false }
    )
    if (this.prefillData.poS_Required === 'N') {
      this.cardOptions.push({
        text: 'Bill Later',
        value: 'Bill Later',
        disabled: false
      })
    }
    this.invalidateData()
  },
  watch: {
    customerProducts() {
      this.refreshPeriodItems = this.setRefreshPeriodItems()
      this.refreshPeriod = this.prefillData.refreshPeriod || 0
      this.invalidateData(this.refreshPeriod)
    }
  },
  methods: {
    ...mapActions(['setNotification', 'doGET']),
    cardData(data) {
      this.creditCardData = data
    },
    invalidateData() {
      if (
        !this.verifyValueInList(this.refreshPeriod, this.refreshPeriodItems)
      ) {
        this.refreshPeriod = ''
      }
      if (
        !this.verifyValueInList(this.accountHistory, this.accountHistoryItems)
      ) {
        this.accountHistory = ''
      }
    },
    formatPayload(payload) {
      return {
        key: payload.value,
        value: payload.text
      }
    },
    verifyValueInList(value, list) {
      return (list || []).filter((item) => item.value === value).length > 0
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
    doMandatoryCallAsPerRequiredByAPI() {
      return new Promise((resolve) => {
        this.$store
          .dispatch('doPOST', {
            product:
              apiTypes.INTEGRATION_REQUIRED_PRE_POST_CALL_FOR_VOA_IGNORE_RESPONSE,
            payload: {
              DataProvider: this.formatPayload(this.dataProvider),
              RefreshPeriod: this.refreshPeriod,
              AccountHistory: this.accountHistory
            },
            token: this.token
          })
          .finally(() => {
            return resolve()
          })
      })
    },
    doCardValidation() {
      const payload = {
        POS_Display: this.prefillData.poS_Display,
        POS_Required: this.prefillData.poS_Required,
        POS_CardHolderName: this.creditCardData.holderName,
        POS_CardHolderStreet: this.creditCardData.holderStreet,
        POS_CardHolderCity: this.creditCardData.city,
        POS_CardHolderState: this.creditCardData.state,
        POS_CardHolderZip: this.creditCardData.zip,
        POS_CardType: this.creditCardData.cardType,
        POS_CardNumber: this.creditCardData.cardNumber.replace(/[^0-9]/g, ''),
        POS_CardExpiry: this.creditCardData.cardExpiry
      }
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch('doPOST', {
            product: apiTypes.CPSS_GET_VALIDATE_CARD,
            payload,
            token: this.token
          })
          .then((response) => {
            if (response.responseStatus === 0) {
              this.setNotification({
                msg: response.message,
                type: 'error'
              })
              return reject()
            }
            return resolve()
          })
          .catch((error) => {
            return reject()
          })
      })
    },
    finalPayLoad() {
      const payload = this.buildVOAPayload()
      this.$store
        .dispatch('doPOST', {
          product: apiTypes.PRODUCT_VOA,
          payload,
          token: this.token
        })
        .then((response) => {
          if (!response?.orderId && response?.message) {
            this.setNotification({
              msg: response.message,
              type: 'error'
            })
            return
          }
          this.$router.push({
            name: apiTypes.SUMMARY_REQUEST_INTERNAL,
            params: {
              product: apiTypes.PRODUCT_VOA,
              orderId: response.orderId
            },
            query: { Token: this.token }
          })
        })
    },
    save() {
      this.doMandatoryCallAsPerRequiredByAPI().then(() => {
        if (
          this.card !== 'Bill Later' &&
          this.prefillData.poS_Display === 'Y'
        ) {
          this.$refs.pos.get()
          this.doCardValidation().then(() => {
            this.finalPayLoad()
          })
        } else {
          this.finalPayLoad()
        }
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
    isSavedDisable() {
      return this.card === 'New Card'
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
      ],
      card: '',
      cardOptions: [],
      refreshPeriodItems: this.setRefreshPeriodItems(),
      creditCardData: {}
    }
  }
}
</script>
