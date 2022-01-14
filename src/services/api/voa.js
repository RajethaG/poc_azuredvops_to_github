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
        .get(endpoint, { headers: this.setHeaders() })
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
          // response.data.appTheme = {
          //   Layout: 'small',
          //   Theme: '#3949AB'
          // }
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
  setHeaders() {
    return {
      'Content-Type': 'application/json',
      // eslint-disable-next-line max-len
      Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRXh0ZXJuYWxJRCI6ImU4YzI1YzljLTg0OTItNGIzNS05ZGRhLTk2NDVmNmE0ZTQ3ZSIsIlVzZXJJRCI6IjIiLCJDdXN0b21lcklkIjoiMSIsIkZpcnN0TmFtZSI6ImNwc3MiLCJNaWRkbGVJbml0aWFsIjoiSjEiLCJMYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJjcHNzYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDcmVkaXQgUGx1cyBBZG1pbiIsIkxvZ2luU2Vzc2lvbklEIjoiMCIsIkN1c3RvbWVyTmFtZSI6IkNyZWRpdCBQbHVzIiwiUm9sZXMiOiJDcmVkaXQgUGx1cyBBZG1pbiIsImV4cCI6MTY0MTQ3MDQzNywiaXNzIjoiaHR0cHM6Ly9hemFwcC1jcHNzLWRldi1hcGktMDAxLmF6dXJld2Vic2l0ZXMubmV0L2F1dGgiLCJhdWQiOiJodHRwczovL2F6YXBwLWNwc3MtZGV2LWFwaS0wMDEuYXp1cmV3ZWJzaXRlcy5uZXQvIn0.r9dhN68EoSkLXk4kUyALhX5Pj9cFhZ2uIYV0EY9SpfQ`
    }
  }
}
