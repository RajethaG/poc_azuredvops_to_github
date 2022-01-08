import axios from 'axios'
import apiPath from '../../constants/apipath.json'
import appConfig from '../../constants/appconfig.json'
import * as apiTypes from './api-types'
import * as types from '@/store/mutation-types'

const getHeader = (token, attr = {}) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      // Authorization: 'Bearer a211d13f72d14c2a9a2c9a06a0e1f14c',
      ...attr
    }
  }
}

export default {
  pullSummaryVOA(orderId, token) {
    const endpoint = `${appConfig.apiEndPoint}/${apiPath.voa.getvoasummary}
    /orderId=${orderId}`
    axios
      .get(endpoint, getHeader(token))
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  pullVOA(token) {
    return new Promise((resolve, reject) => {
      const endpoint =
        'https://azapp-cpss-dev-api-001.azurewebsites.net/consumerreportapi/api/voa/getvoaOrder'
      //  `${appConfig.apiEndPoint}/${apiPath.voa.getvoaorder}`

      console.log('Requesting Endpoint ', endpoint)

      axios
        .get(endpoint, getHeader(token))
        .then((response) => {
          response.data.appTheme = {
            Layout: 'small',
            Theme: '#FFA0F0'
          }
          response.data.autoFill = [
            { key: 'referenceNumber', value: '12345' },
            { key: 'accountHistory', value: '30' },
            { key: 'refreshPeriod', value: '30 days' }
          ]

          response.data.productOptions = [
            { key: '50', value: 'Verification of Employment' },
            { key: '51', value: 'Verification of Assets' }
          ]

          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  submitVOA(payload, token) {
    return axios.post(
      'https://apim-dev-cpss.azure-api.net/consumerreport/api/VOA/OrderReport',
      payload,
      getHeader(token)
    )
    // .then((response) => {
    //   if (response && response.data.responseStatus === 0) {
    //     //   this.messageType = constant.imageHeaderError
    //     //   this.alertMessage = response.data.message
    //   } else {
    //     const respData = response.data || response
    //     if (respData.orderId !== undefined) {
    //       // this.sendMessageToParent(respData.orderId)

    //       // this.$router.push({
    //       //   name: 'integration-voa-results',
    //       //   params: {
    //       //     orderId: respData.orderId,
    //       //     callOrigin: constant.origin.OrderReport,
    //       //     productId: '112'
    //       //   }
    //       // })
    //     }
    //   }
    // })
    // .catch((error) => {
    // })
  }
}
