<template>
  <div align="center" class="body--wrapper">
    <v-layout row wrap>
      <v-flex xs12 sm12 class="p-0">
        <ValidationProvider
          name="Cardholder Name"
          :rules="{ max: 150, required: true }"
          v-slot="{ errors }"
        >
          <v-text-field
            class="pos"
            label="Cardholder Name"
            v-model="holderName"
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
          :rules="{ max: 100, required: true }"
          v-slot="{ errors }"
        >
          <v-text-field
            class="pos"
            label="Cardholder Street"
            v-model="holderStreet"
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
          :rules="{ max: 50, required: true }"
          v-slot="{ errors }"
        >
          <v-text-field
            class="pos"
            label="City"
            v-model="city"
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
          :rules="{ max: 2, required: true }"
          v-slot="{ errors }"
        >
          <v-text-field
            class="pos"
            label="State"
            v-model="state"
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
          name="Zip"
          :rules="{ max: 9, min: 5, required: true }"
          v-slot="{ errors }"
        >
          <v-text-field
            class="pos"
            label="Zip"
            v-model="zip"
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
          :rules="{ max: 100, required: true, numeric: true }"
          v-slot="{ errors }"
        >
          <v-text-field
            class="pos"
            label="Card Number"
            v-model="cardNumber"
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
          :rules="{ required: true }"
          v-slot="{ errors }"
        >
          <v-select
            class="pos"
            v-model="cardType"
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
          :rules="{ max: 7, required: true }"
          v-slot="{ errors }"
        >
          <v-text-field
            class="pos"
            label="Card Expiry"
            v-model="cardexpiry"
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
export default {
  props: {
    posData: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      savedHolderName: 'saved card',
      savedholderStreet: 'saved street',
      savedcity: 'saved city',
      savedstate: 'ss',
      savedzip: 'saved zip',
      newHolderName: '',
      newholderStreet: '',
      newcity: '',
      newstate: '',
      newzip: '',
      card: '',
      holderName: '',
      holderStreet: '',
      city: '',
      state: '',
      zip: '',
      cardTypeOptions: [
        { text: 'MC', value: 'MC' },
        { text: 'VISA', value: 'VISA' },
        { text: 'AMEX', value: 'AMEX' },
        { text: 'DISC', value: 'DISC' }
      ],
      cardType: '',
      cardNumber: '',
      cardexpiry: '',
      isDisabled: this.posData.posdisplay === 'N'
    }
  },
  watch: {
    posData(from, to) {
      console.log(from.card, to.card)
      if (from.card !== to.card) {
        if (from.card === 'Saved Card') {
          this.getSavedCardData()
        } else {
          this.holderName = this.newHolderName
          this.holderStreet = this.newholderStreet
          this.city = this.newcity
          this.zip = this.newzip
          this.state = this.newstate
        }
      }
    }
  },
  methods: {
    getSavedCardData() {
      this.newHolderName = this.holderName
      this.newholderStreet = this.holderStreet
      this.newcity = this.city
      this.newstate = this.state
      this.newzip = this.zip
      this.holderName = this.savedHolderName
      this.holderStreet = this.savedholderStreet
      this.city = this.savedcity
      this.zip = this.savedzip
      this.state = this.savedstate
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
/* .v-messages.theme--light {
  display: none !important;
} */
.pos.v-select
  .v-input__control
  .v-input__slot
  .v-select__slot
  .v-select__selections {
  padding: 0 !important;
  min-height: 0 !important;
}
</style>
