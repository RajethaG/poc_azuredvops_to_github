/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import Vue from 'vue'
import * as VeeValidate from 'vee-validate'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { extend } from 'vee-validate'
import {
  required,
  email,
  min,
  confirmed,
  max,
  min_value,
  max_value,
  numeric,
  alpha_num,
  alpha_spaces
} from 'vee-validate/dist/rules'

extend('required', { ...required, message: '{_field_} Is Required' })
extend('confirmed', confirmed)
extend('email', email)
extend('numeric', { ...numeric, message: '{_field_} Must Be Number' })
extend('min', { ...min, message: '{_field_} Minimum {length} Expected' })
extend('max', { ...max, message: '{_field_} Maximum Length Exceeded' })
extend('alpha_num', {
  ...alpha_num,
  message: '{_field_} should not contain special characters'
})
extend('alpha_spaces', {
  ...alpha_spaces,
  message: '{_field_} should not contain  characters'
})
extend('digits_between', {
  validate: (value, { min, max } = {}) => {
    return Number(min) <= value && Number(max) >= value
  },
  params: ['min', 'max'],
  message: 'Must be between {min} and {max}'
})

extend('min_value', { ...min_value, message: '{_field_} Is Too Low' })
extend('max_value', { ...max_value, message: '{_field_} Is Too High' })

extend('url', {
  validate: (str) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ) // fragment locator
    return !!pattern.test(str)
  }
})

extend('alpha_num_spaces', {
  validate: (str) => {
    const pattern = new RegExp('^[A-Za-z0-9 ]*$')
    return !!pattern.test(str)
  }
})

Vue.use(VeeValidate)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
export default VeeValidate
