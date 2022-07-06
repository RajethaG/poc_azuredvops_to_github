<template>
  <div align-items="center" class="body--wrapper py-2 px-5 mx-5">
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
            v-model="cardDetails.holderName"
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
          name="Cardholder Street"
          :rules="{ max: 100, required: isMandatory }"
          v-slot="{ errors }"
        >
          <v-text-field
            class="pos"
            label="Cardholder Street"
            v-model="cardDetails.holderStreet"
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
          name="City"
          :rules="{ max: 50, required: isMandatory }"
          v-slot="{ errors }"
        >
          <v-text-field
            class="pos"
            label="City"
            v-model="cardDetails.city"
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
          name="State"
          :rules="{ required: isMandatory }"
          v-slot="{ errors }"
        >
          <v-select
            class="pos"
            v-model="cardDetails.state"
            :items="states"
            item-text="value1"
            item-value="value2"
            :error="errors.length > 0"
            :error-messages="errors[0]"
            label="State"
            outlined
            dense
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
            v-model="cardDetails.zip"
            v-mask="'##### ####'"
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
      <v-flex xs12 sm8>
        <ValidationProvider
          name="Card Number"
          :rules="{ max: 100, required: isMandatory }"
          v-slot="{ errors }"
        >
          <v-text-field
            class="pos"
            label="Card Number"
            v-model="cardDetails.cardNumber"
            v-mask="'#### #### #### ####'"
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
          name="Card Type"
          :rules="{ required: isMandatory }"
          v-slot="{ errors }"
        >
          <v-select
            class="pos"
            v-model="cardDetails.cardType"
            :items="cardTypeOptions"
            :error="errors.length > 0"
            :error-messages="errors[0]"
            label="Card Type"
            outlined
            dense
          ></v-select>
        </ValidationProvider>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm5>
        <ValidationProvider
          name="Card Expiry"
          :rules="{ max: 7, required: isMandatory }"
          v-slot="{ errors }"
        >
          <v-text-field
            class="pos"
            label="Expiration Date (MM/YYYY)"
            v-model="cardDetails.cardExpiry"
            v-mask="'##/####'"
            :error="errors.length > 0"
            :error-messages="errors[0]"
            autocomplete="off"
            outlined
            dense
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
      cardDetails: {
        holderName: '',
        holderStreet: '',
        city: '',
        state: '',
        zip: '',
        cardNumber: '',
        cardType: '',
        cardExpiry: ''
      },
      states: [],
      cardTypeOptions: [
        { text: 'MC', value: 'MC' },
        { text: 'VISA', value: 'VISA' },
        { text: 'AMEX', value: 'AMEX' },
        { text: 'DISC', value: 'DISC' }
      ]
    }
  },
  computed: {
    isMandatory() {
      return this.posData.card === 'New Card'
    },
    getStates() {
      return this.states
    }
  },
  created() {
    this.getAllStates()
  },
  methods: {
    ...mapActions(['doGET']),
    get() {
      this.$emit('cardData', this.cardDetails)
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
