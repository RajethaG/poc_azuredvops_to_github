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
            <v-layout row wrap>
              <v-flex xs12 sm12>
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

              <v-flex xs12 sm12>
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
              <v-flex xs12 sm12>
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
          </v-flex>
          <v-flex v-if="prefillData.poS_Display === 'Y'" xs12 sm8>
            <div class="bordered mx-5 border-radius border-dark">
              <v-layout row wrap class="mx-5">
                <v-flex xs12 sm12>
                  <v-radio-group v-model="card" mandatory>
                    <v-radio
                      v-for="data in cardOptions"
                      :key="data.value"
                      :label="data.text"
                      :value="data.value"
                      :disabled="data.disabled"
                    >
                      <template v-slot:label>
                        <div>
                          {{ data.value }}
                          <strong v-if="data.value === savedCard">{{
                            SAVEDCARDINFO
                          }}</strong>
                        </div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
              <v-row v-if="ISNEWCARD" class="pl-1" align-items="center">
                <ValidationObserver ref="observer">
                  <pos
                    :posData="{
                      card: card,
                      token: token
                    }"
                    ref="pos"
                    @cardData="cardData"
                  />
                </ValidationObserver>
              </v-row>
            </div>
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
  data() {
    return {
      authError: '',
      newCard: 'New Card',
      savedCard: 'Saved Card',
      billLater: 'Bill Later',
      referenceNumber: this.prefillData?.referenceNumber || '',
      transactionHistory: this.prefillData?.accountHistory || '',
      refreshPeriod: '',
      transactionHistoryItems: [
        { text: '30 days', value: '30' },
        { text: '60 days', value: '60' },
        { text: '90 days', value: '90' }
      ],
      firstName: this.prefillData?.firstName || '',
      lastName: this.prefillData?.lastName || '',
      ssn: this.prefillData?.ssn || '',
      email: this.prefillData?.emailID || '',
      phone: this.prefillData?.phoneNumber || '',
      middleName: this.prefillData?.middleName || '',
      card: '',
      cardOptions: [],
      refreshPeriodItems: this.setRefreshPeriodItems(),
      creditCardData: {}
    }
  },
  watch: {
    customerProducts() {
      this.refreshPeriodItems = this.setRefreshPeriodItems()
      this.refreshPeriod = this.prefillData?.refreshPeriod || 0
      this.invalidateData(this.refreshPeriod)
    }
  },
  mounted() {
    this.refreshPeriod = this.getRereshPeriodAddOnId(
      this.prefillData.refreshPeriod
    )
    if (this.ASSIGNBILLLATER) {
      this.card = this.billLater
    } else if (!this.CHECKCARDFEILDS) {
      this.card = this.savedCard
    } else {
      this.card = this.newCard
    }

    this.cardOptions.push(
      {
        text: this.SAVEDCARDINFO,
        value: this.savedCard,
        disabled: this.CHECKCARDFEILDS
      },
      { text: this.newCard, value: this.newCard, disabled: false }
    )
    if (this.prefillData.poS_Required === 'N') {
      this.cardOptions.push({
        text: 'Bill Later',
        value: this.billLater,
        disabled: false
      })
    }
    this.invalidateData()
  },
  computed: {
    ...mapGetters(['config']),
    ASSIGNBILLLATER() {
      return (
        this.prefillData &&
        this.prefillData.poS_Display === 'Y' &&
        this.prefillData.poS_Required === 'N'
      )
    },
    CHECKCARDFEILDS() {
      return (
        this.prefillData &&
        this.prefillData.poS_CardHolderName === '' &&
        this.prefillData.poS_CardType === '' &&
        this.prefillData.poS_CardNumber === ''
      )
    },
    USERID() {
      return this.config.customerInfo.userId || 0
    },
    CUSTOMERID() {
      return this.config.customerInfo.customerId || 0
    },
    ISPOSSUBMIT() {
      return (
        this.prefillData?.poS_Display === 'Y' && this.card !== this.billLater
      )
    },
    SAVEDCARDINFO() {
      return !this.CHECKCARDFEILDS
        ? '(' +
            this.prefillData?.poS_CardHolderName +
            ' | ' +
            this.prefillData?.poS_CardType +
            ' | ' +
            this.prefillData?.poS_CardNumber +
            ')'
        : ''
    },
    ISNEWCARD() {
      return this.card === this.newCard
    },
    ISSAVEDCARD() {
      return this.card === this.savedCard
    }
  },
  methods: {
    ...mapActions(['setNotification', 'doPOST']),
    getRereshPeriodAddOnId(value) {
      return (
        this.refreshPeriodItems.find(
          (x) =>
            x.text === `${value} Days Refresh` || x.text === `One Time Report`
        )?.value ?? 0
      )
    },
    buildFiservRequest() {
      return {
        userId: this.USERID,
        Source: 'AVANTUS UI',
        productId: constant.cpssProductIds.VOAFiserv,
        OrderForUser: this.USERID,
        OrderForCustomer: this.CUSTOMERID,
        CustomerId: this.CUSTOMERID,
        referenceNumber: this.referenceNumber,
        transactionHistory:
          this.transactionHistoryItems.find(
            (x) => x.value === this.transactionHistory
          ).value || 0,
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
    doMandatoryCallAsPerRequiredByAPI() {
      return new Promise((resolve) => {
        this.$store
          .dispatch('doPOST', {
            product:
              apiTypes.INTEGRATION_REQUIRED_PRE_POST_CALL_FOR_VOA_IGNORE_RESPONSE,
            payload: {
              DataProvider: this.formatPayload(this.dataProvider),
              RefreshPeriod: this.refreshPeriod,
              AccountHistory:
                this.transactionHistoryItems.find(
                  (x) => x.value === this.transactionHistory
                ).value || 0
            },
            token: this.token,
            errorParams: {
              router: this.$router,
              redirect400: true,
              redirect500: true,
              redirect401: true
            }
          })
          .finally(() => {
            return resolve()
          })
      })
    },
    doCardValidation() {
      let payload = {}
      if (this.ISNEWCARD) {
        payload = {
          POS_Display: this.prefillData.poS_Display,
          POS_Required: this.prefillData.poS_Required,
          POS_CardHolderName: this.creditCardData.holderName,
          POS_CardHolderStreet: this.creditCardData.holderStreet,
          POS_CardHolderCity: this.creditCardData.city,
          POS_CardHolderState: this.creditCardData.state,
          POS_CardHolderZip: this.creditCardData.zip.replace(/[^0-9-]/g, ''),
          POS_CardType: this.creditCardData.cardType,
          POS_CardNumber: this.creditCardData.cardNumber.replace(/[^0-9]/g, ''),
          POS_CardExpiry: this.creditCardData.cardExpiry
        }
      }
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch('doPOST', {
            product: apiTypes.CPSS_GET_VALIDATE_CARD,
            payload,
            token: this.token,
            errorParams: {
              router: this.$router,
              redirect400: true,
              redirect500: true,
              redirect401: true
            }
          })
          .then((response) => {
            if (response.ResponseStatus === 0) {
              this.setNotification({
                msg: response.Message,
                type: 'error'
              })
              return reject()
            }
            return resolve()
          })
          .catch((error) => {
            this.authError = error
            return reject()
          })
      })
    },
    finalPayLoad() {
      const payload = this.buildFiservRequest()
      this.$store
        .dispatch('doPOST', {
          product: apiTypes.PRODUCT_FISERV,
          payload,
          token: this.token,
          errorParams: {
            router: this.$router,
            redirect400: true,
            redirect500: true,
            redirect401: true
          }
        })
        .then((response) => {
          if (
            !(
              response?.id &&
              response?.responseStatus &&
              response?.responseStatus === 1
            )
          ) {
            this.setNotification({
              msg: response.message,
              type: 'error'
            })

            return
          }
          this.$router.push({
            name: apiTypes.SUMMARY_REQUEST_INTERNAL,
            params: {
              product: apiTypes.PRODUCT_FISERV,
              orderId: response.id,
              productId: this.dataProvider.value
            },
            query: { Token: this.token }
          })
        })
    },
    save() {
      this.doMandatoryCallAsPerRequiredByAPI().then(() => {
        if (this.ISPOSSUBMIT) {
          if (this.ISNEWCARD) {
            this.$refs.pos.get()
          }
          this.doCardValidation().then(() => {
            this.finalPayLoad()
          })
        } else {
          this.finalPayLoad()
        }
      })
    },

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
    // eslint-disable-next-line consistent-return
    setRefreshPeriodItems() {
      if (this.customerProducts) {
        const product = this.customerProducts.filter(
          (x) =>
            Number(x.productId) === Number(constant.cpssProductIds.VOAFiserv)
        )
        if (product && product.length > 0) {
          const pd = product[0].productAddOns
            .filter((item) => item.changeable === true)
            .map((item) => {
              return {
                value: this.getRefreshPeriodMappable(item.name),
                text: item.name
              }
            })
          return pd
        }
        return []
      }
    }
  }
}
</script>

<style></style>
