import axios from 'axios'
import apiPath from '../../constants/apipath.json'
import appConfig from '../../constants/appconfig.json'

export default {
  getClientConfig(token) {
    return axios
      .get(`${appConfig.apiEndPoint}/${apiPath.voa.getvoaorder}`)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error
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
