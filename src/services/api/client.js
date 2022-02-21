import axios from 'axios'
import * as apiTypes from './api-types'
import apiPath from '../../constants/apipath.json'
import appConfig from '../../constants/appconfig.json'
import voa from './voa'
import voaFiserv from './voaFiserv'

const getHeader = (token, attr = {}) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      ...attr
    }
  }
}

const getCustomerUserProducts = (userId, token) => {
  return new Promise((resolve, reject) => {
    const endpoint = `${appConfig.integrationApiEndpoint}/${apiPath.voa.getUserProducts}?UserId=${userId}`
    axios
      .get(endpoint, getHeader(token))
      .then((response) => {
        if (response && response.status === 200) {
          resolve(response)
        } else {
          reject()
        }
      })
      .catch((error) => reject(error))
  })
}

export default {
  getClientConfig(client) {
    const token = client.query?.Token
    const product = (client.params.product || '').toLowerCase()
    const name = (client.name || '').toLowerCase()
    const orderId = client.params.orderId || ''

    if (!token || !name) {
      return new Promise(({ reject }) => {
        reject(new Error('invalid request... no token'))
      })
    }

    switch (name) {
      case apiTypes.INTEGRATION_VOA:
        return voa.pullVOA(token)
      case apiTypes.SUMMARY_REQUEST:
      case apiTypes.SUMMARY_REQUEST_INTERNAL:
        if (product === apiTypes.PRODUCT_VOA) {
          return voa.pullClientConfig(token)
        }
        break
    }

    return new Promise(({ reject }) => {
      reject()
    })
  },
  doPOST({ product, payload, token }) {
    switch (product) {
      case apiTypes.PRODUCT_VOA:
        return voa.submitVOA(payload, token)
      case apiTypes.CPSS_POST_SEND_MAIL:
        return voa.sendMail(payload, token)
      case apiTypes.INTEGRATION_REQUIRED_PRE_POST_CALL_FOR_VOA_IGNORE_RESPONSE:
        return voa.mandatoryCall(payload, token)
      case apiTypes.PRODUCT_FISERV:
        return voaFiserv.submitVOAFiserv(payload, token)
    }
    return new Promise(({ reject }) => reject())
  },
  doGET({ getType, params }) {
    // console.log(getType, params)
    switch (getType) {
      case apiTypes.CPSS_GET_VOA_SUMMARY:
        return voa.pullSummaryVOA(params.orderId, params.token)
      case apiTypes.CPSS_GET_VOA_REPORT:
        return voa.pullReportVOA(params.orderId, params.token)
      case apiTypes.CPSS_GET_DOCUMENT_DOWNLOAD:
        return voa.downloadPdfVOA(params.orderId, params.token)
      case apiTypes.CPSS_GET_CUST_USER_PRODUCTS:
        return getCustomerUserProducts(params.userId, params.token)
    }

    return new Promise(({ reject }) => reject())
  }
}
