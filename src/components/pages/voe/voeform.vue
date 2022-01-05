<template>
  <v-container>
    <page-title text="Verification of Employment" />
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(save)">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 sm4>
              <ValidationProvider
                name="Employment Type"
                rules="required"
                v-slot="{ errors }"
              >
                <v-select
                  :items="empploymentOptions"
                  v-model="employmentType"
                  label="Employment Type"
                  :error="errors.length > 0"
                  :error-messages="errors[0]"
                  class="px-0"
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
export default {
  data() {
    return {
      employmentType: '',
      empploymentOptions: [
        { text: 'Employment Only', vale: 'Employment' },
        { text: 'Employment Plus Income', value: 'EmploymentPlusIncome' }
      ],
      firstName: '',
      lastName: ''
    }
  },
  methods: {
    save() {}
  }
}
</script>

<style></style>
