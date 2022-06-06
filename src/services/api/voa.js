import axios from 'axios'
import apiPath from '../../constants/apipath.json'
import appConfig from '../../constants/appconfig.json'
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
          resolve(this.mockApiResponse(response))
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
  pullSummaryVOAFiserv(orderId, token) {
    const endpoint = `${appConfig.cpssApiEndpoint}/${
      apiPath.voaFiserv.getvoafiservsummary
    }?orderId=${39479}`
    return new Promise((resolve, reject) => {
      // getHeader(token)
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
  getStates(token) {
    const endpoint = `${appConfig.cpssApiEndpoint}/${apiPath.masterData.states}`
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
  validateCard(payload, token) {
    const endpoint = `${appConfig.cpssApiEndpoint}/${apiPath.voa.validateCredit}`
    return new Promise((resolve, reject) => {
      return axios
        .post(endpoint, payload, getHeader(token))
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

  // payload.orderId
  sendFiservMail(payload, token) {
    const endpoint = `${appConfig.cpssApiEndpoint}/${
      apiPath.voaFiserv.sendMail
    }?orderId=${39479}`
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
          resolve(this.mockApiResponse(response))
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
  },
  mockApiResponse(response) {
    //   response.data.appTheme.pageBackgroundColor = '#cccccc'
    //   response.data.appTheme.backgroundColor = '#fff'

    // response.data.voaRequest.POS_Display = 'Y'
    // response.data.voaRequest.POS_Required = 'Y'
    // response.data.voaRequest.POS_CardHolderName = 'Michael Abacommon'
    // response.data.voaRequest.POS_CardHolderStreet = '600 Saw Mill Rd'
    // response.data.voaRequest.POS_CardHolderCity = 'West Haven'
    // response.data.voaRequest.POS_CardHolderState = 'CT'
    // response.data.voaRequest.POS_CardHolderZip = '06516'
    // response.data.voaRequest.POS_CardType = 'MC'
    // response.data.voaRequest.POS_CardNumber = '5424000000000015'
    // response.data.voaRequest.POS_CardExpiry = '02/2024'
    return response
  }
}
