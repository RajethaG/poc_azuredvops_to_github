import axios from 'axios'
import apiPath from '../../constants/apipath.json'
import appConfig from '../../constants/appconfig.json'
import * as types from './api-types'

const getHeader = (token, attr = {}) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      ...attr
    }
  }
}

const pullVOA = (token) => {
  return new Promise((resolve, reject) => {
    const endpoint = `${appConfig.apiEndPoint}/${apiPath.voa.getvoaorder}`

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
}

const pullSummaryVOA = (orderId, token) => {
  return new Promise((resolve) => {
    resolve()
  })
}

export default {
  getClientConfig(client) {
    const token = client.query?.tk
    const product = (client.params.product || '').toLowerCase()
    const name = (client.name || '').toLowerCase()

    if (!token || !name) {
      return new Promise((reject) => {
        reject(new Error('invalid request'))
      })
    }

    switch (name) {
      case types.INTEGRATION_VOA:
        return pullVOA(token)
      case types.SUMMARY_REQUEST:
        if (product === types.PRODUCT_VOA) {
          return pullSummaryVOA(client.params.orderId, token)
        }
        break
    }

    return new Promise((reject) => {
      reject()
    })

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     if (token === 'avantus') {
    //       resolve({
    //         status: 200,
    //         data: {
    //           layout: 'default',
    //           theme: 'def',
    //           themes: {
    //             primary: '#0277BD'
    //           },
    //           customerInfo: {},
    //           autoFill: {
    //             reference: '283020338',
    //             firstname: 'first _name',
    //             lastname: 'last _name',
    //             ssn: '333-99-333',
    //             email: 'autoemail@abc.com'
    //           }
    //         }
    //       })
    //     } else {
    //       resolve({
    //         status: 200,
    //         data: {
    //           layout: 'small',
    //           theme: 'def',
    //           themes: {
    //             primary: '#FFA000'
    //           },
    //           autoFill: {
    //             reference: '283020338',
    //             firstname: 'first _name',
    //             lastname: 'last _name',
    //             ssn: '333-99-333',
    //             email: 'autoemail@abc.com'
    //           }
    //         }
    //       })
    //     }
    //   }, 1500)
    // })
    // return axios.get('/api/theme', client)
  }
}
