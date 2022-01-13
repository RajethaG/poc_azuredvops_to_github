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
  pullClientConfig(token) {
    return new Promise((resolve, reject) => {
      this.pullVOA(token)
        .then((response) => {
          const config = {
            status: 200,
            data: {
              appTheme: response.data.appTheme
            }
          }
          resolve(config)
        })
        .catch(() => {
          console.error('pullClientConfig error')
          reject()
        })
    })
  },
  pullSummaryVOA(orderId, token) {
    const endpoint = `${appConfig.cpssApiEndpoint}/${apiPath.voa.getvoasummary}?orderId=${orderId}`
    return new Promise((resolve, reject) => {
      axios
        .get(endpoint, getHeader(token))
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject()
        })
    })
  },
  pullReportVOA(orderId, token) {
    const endpoint = `${appConfig.cpssApiEndpoint}/${apiPath.voa.getvoareport}?orderId=${orderId}`
    return new Promise((resolve, reject) => {
      axios
        .get(endpoint, getHeader(token))
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject()
        })
    })
  },
  sendMail(payload, token) {
    console.log(payload)
    const endpoint = `${appConfig.cpssApiEndpoint}/${apiPath.voa.sendMail}?orderId=${payload.orderId}`
    return new Promise((resolve, reject) => {
      axios
        .post(endpoint, getHeader(token))
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject()
        })
    })
  },
  downloadPdfVOA(orderId, token) {
    const endpoint = `${appConfig.cpssApiEndpoint}/${apiPath.voa.downloadfile}?orderFileId=${orderId}`
    return new Promise((resolve, reject) => {
      axios
        .get(endpoint, { headers: this.getHeader(token) })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject()
        })
    })
  },
  pullVOA(token) {
    return new Promise((resolve, reject) => {
      const endpoint =
        // 'https://azapp-cpss-dev-api-001.azurewebsites.net/consumerreportapi/api/voa/getvoaOrder'
        `${appConfig.integrationApiEndpoint}/${apiPath.voa.getvoaorder}`

      axios
        .get(endpoint, getHeader(token))
        .then((response) => {
          response.data.appTheme = {
            Layout: 'small',
            Theme: '#3949AB'
          }
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
      `${appConfig.cpssApiEndpoint}/${apiPath.voa.submitVOA}`,
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
