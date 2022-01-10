import axios from 'axios'
import apiPath from '../../constants/apipath.json'
import appConfig from '../../constants/appconfig.json'
import * as apiTypes from './api-types'
import voa from './voa'

// const getHeader = (token, attr = {}) => {
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       ...attr
//     }
//   }
// }

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
      case apiTypes.INTEGRATION_VOA:
        return voa.pullVOA(token)
      case apiTypes.SUMMARY_REQUEST:
        if (product === apiTypes.PRODUCT_VOA) {
          return voa.pullSummaryVOA(client.params.orderId, token)
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
  },
  doPOST({ product, payload, token }) {
    switch (product) {
      case apiTypes.PRODUCT_VOA:
        return voa.submitVOA(payload, token)
    }
    return new Promise((reject) => reject())
  }
}
