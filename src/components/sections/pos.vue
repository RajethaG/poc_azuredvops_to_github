<template>
  <div align="center" class="body--wrapper py-2 px-5 mx-5">
    <v-layout row wrap>
      <v-flex xs12 sm12 class="p-0">
        <ValidationProvider
          name="Cardholder Name"
          :rules="{ max: 150, required: isMandatory }"
          v-slot="{ errors }"
        >
          <v-text-field
            class="pos"
            label="Cardholder Name"
            v-model="present.holderName"
            :error="errors.length > 0"
            :error-messages="errors[0]"
            autocomplete="off"
            outlined
            dense
            :disabled="isDisabled"
          ></v-text-field>
        </ValidationProvider>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <ValidationProvider
          name="Cardholder Street"
          :rules="{ max: 100, required: isMandatory }"
          v-slot="{ errors }"
        >
          <v-text-field
            class="pos"
            label="Cardholder Street"
            v-model="present.holderStreet"
            :error="errors.length > 0"
            :error-messages="errors[0]"
            autocomplete="off"
            outlined
            dense
            :disabled="isDisabled"
          ></v-text-field>
        </ValidationProvider>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm4>
        <ValidationProvider
          name="City"
          :rules="{ max: 50, required: isMandatory }"
          v-slot="{ errors }"
        >
          <v-text-field
            class="pos"
            label="City"
            v-model="present.city"
            :error="errors.length > 0"
            :error-messages="errors[0]"
            autocomplete="off"
            outlined
            dense
            :disabled="isDisabled"
          ></v-text-field>
        </ValidationProvider>
      </v-flex>
      <v-flex xs12 sm4>
        <ValidationProvider
          name="State"
          :rules="{ required: isMandatory }"
          v-slot="{ errors }"
        >
          <v-select
            class="pos"
            v-model="present.state"
            :items="states"
            item-text="value1"
            item-value="value2"
            :error="errors.length > 0"
            :error-messages="errors[0]"
            label="State"
            outlined
            dense
            :disabled="isDisabled"
          ></v-select>
        </ValidationProvider>
      </v-flex>
      <v-flex xs12 sm4>
        <ValidationProvider
          name="Zip"
          :rules="{ max: 10, min: 5, required: isMandatory }"
          v-slot="{ errors }"
        >
          <v-text-field
            class="pos"
            label="Zip"
            v-model="present.zip"
            v-mask="'##### ####'"
            :error="errors.length > 0"
            :error-messages="errors[0]"
            autocomplete="off"
            outlined
            dense
            :disabled="isDisabled"
          ></v-text-field>
        </ValidationProvider>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm8>
        <ValidationProvider
          name="Card Number"
          :rules="{ max: 100, required: isMandatory }"
          v-slot="{ errors }"
        >
          <v-text-field
            class="pos"
            label="Card Number"
            v-model="present.cardNumber"
            v-mask="'#### #### #### ####'"
            :error="errors.length > 0"
            :error-messages="errors[0]"
            autocomplete="off"
            outlined
            dense
            :disabled="isDisabled"
          ></v-text-field>
        </ValidationProvider>
      </v-flex>

      <v-flex xs12 sm4>
        <ValidationProvider
          name="Card Type"
          :rules="{ required: isMandatory }"
          v-slot="{ errors }"
        >
          <v-select
            class="pos"
            v-model="present.cardType"
            :items="cardTypeOptions"
            :error="errors.length > 0"
            :error-messages="errors[0]"
            label="Card Type"
            outlined
            dense
            :disabled="isDisabled"
          ></v-select>
        </ValidationProvider>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm4>
        <ValidationProvider
          name="Card Expiry"
          :rules="{ max: 7, required: isMandatory }"
          v-slot="{ errors }"
        >
          <v-text-field
            class="pos"
            label="Card Expiry"
            v-model="present.cardExpiry"
            v-mask="'##/####'"
            :error="errors.length > 0"
            :error-messages="errors[0]"
            autocomplete="off"
            outlined
            dense
            :disabled="isDisabled"
          ></v-text-field>
        </ValidationProvider>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import * as apiTypes from '@/services/api/api-types'
import { mapActions } from 'vuex'
export default {
  props: {
    posData: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      saved: {
        holderName: this.posData.poS_CardHolderName,
        holderStreet: this.posData.poS_CardHolderStreet,
        city: this.posData.poS_CardHolderCity,
        state: this.posData.poS_CardHolderState,
        zip: this.posData.poS_CardHolderZip,
        cardNumber: this.posData.poS_CardNumber,
        cardType: this.posData.poS_CardType,
        cardExpiry: this.posData.poS_CardExpiry
      },
      states: [],
      new: this.getInitailValues(),
      present: this.getInitailValues(),
      cardTypeOptions: [
        { text: 'MC', value: 'MC' },
        { text: 'VISA', value: 'VISA' },
        { text: 'AMEX', value: 'AMEX' },
        { text: 'DISC', value: 'DISC' }
      ]
    }
  },
  computed: {
    isDisabled() {
      return this.posData.card === 'Saved Card'
    },
    isMandatory() {
      return this.posData.card === 'New Card'
    },
    getStates() {
      return this.states
    }
  },
  created() {
    this.getAllStates()
    if (this.posData.card === 'Saved Card') {
      this.new = Object.assign({}, this.present)
      this.present = Object.assign({}, this.saved)
    }
  },
  watch: {
    posData(from, to) {
      if (from.card !== to.card) {
        if (from.card === 'Saved Card') {
          this.new = Object.assign({}, this.present)
          this.present = Object.assign({}, this.saved)
        } else {
          this.present = Object.assign({}, this.new)
        }
      }
    }
  },
  methods: {
    ...mapActions(['doGET']),
    get() {
      this.$emit('cardData', this.present)
    },
    getInitailValues() {
      return {
        holderName: '',
        holderStreet: '',
        city: '',
        state: '',
        zip: '',
        cardNumber: '',
        cardType: '',
        cardExpiry: ''
      }
    },

    async getAllStates() {
      await this.doGET({
        getType: apiTypes.CPSS_GET_STATES,
        params: {
          token: this.posData.token
        },
        errorMessage: 'Unable to load States'
      }).then((data) => {
        this.states = data
      })
    }
  }
}
</script>

<style>
.pos.v-text-field .v-input__control .v-input__slot {
  min-height: auto !important;
  display: flex !important;
  align-items: center !important;
}
.v-input--radio-group {
  min-height: auto !important;
  display: flex !important;
  align-items: center !important;
}
.v-text-field__details,
.v-input--radio-group {
  padding: 0 !important;
  margin: 0 !important;
}
.pos.v-select
  .v-input__control
  .v-input__slot
  .v-select__slot
  .v-select__selections {
  padding: 0 !important;
  min-height: 0 !important;
}
</style>
