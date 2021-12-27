<template>
  <v-layout wrap>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(save)">
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6>
              <ValidationProvider
                name="First Name"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  label="Name"
                  v-model="firstname"
                  :error="errors.length > 0"
                  :error-messages="errors[0]"
                  autocomplete="off"
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 sm6>
              <ValidationProvider
                name="Last Name"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  name="lastname"
                  label="Last Name"
                  v-model="lastname"
                  :error="errors.length > 0"
                  :error-messages="errors[0]"
                  autocomplete="off"
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 sm6>
              <ValidationProvider
                name="Phone"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  name="phone"
                  label="Phone"
                  v-model="phone"
                  :error="errors.length > 0"
                  :error-messages="errors[0]"
                  autocomplete="off"
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 sm6>
              <ValidationProvider
                name="City"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  name="city"
                  label="City"
                  v-model="city"
                  :error="errors.length > 0"
                  :error-messages="errors[0]"
                  autocomplete="off"
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 sm6>
              <v-checkbox
                v-model="checkbox"
                :rules="[(v) => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
              ></v-checkbox>
              <v-select
                :items="items"
                label="Standard"
                outlined
                dense
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </form>
    </ValidationObserver>
  </v-layout>
</template>

<script>
export default {
  methods: {
    save() {}
  },
  data() {
    return {
      checkbox: true,
      items: [
        {
          text: 'One',
          value: 'one'
        },
        {
          text: 'Two',
          value: 'two'
        }
      ],
      firstname: '',
      lastname: '',
      city: '',
      phone: ''
    }
  }
}
</script>
