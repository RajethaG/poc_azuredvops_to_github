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
      const endpoint = `${appConfig.integrationApiEndpoint}/${apiPath.voa.getVoaSummaryConfig}`
      axios
        .get(endpoint, getHeader(token))
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
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
          reject(error)
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
          reject(error)
        })
    })
  },
  sendMail(payload, token) {
    const endpoint = `${appConfig.cpssApiEndpoint}/${apiPath.voa.sendMail}?orderId=${payload.orderId}`
    return new Promise((resolve, reject) => {
      axios
        .post(endpoint, getHeader(token))
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  downloadPdfVOA(orderId, token) {
    const endpoint = `${appConfig.cpssApiEndpoint}/${apiPath.voa.downloadfile}?orderFileId=${orderId}`
    return new Promise((resolve, reject) => {
      axios
        .get(endpoint, getHeader(token))
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
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
  },
  mandatoryCall(payload, token) {
    return axios.post(
      `${appConfig.integrationApiEndpoint}/${apiPath.voa.mandatoryCallAsPerAPIRequest}`,
      payload,
      getHeader(token)
    )
  }
}
