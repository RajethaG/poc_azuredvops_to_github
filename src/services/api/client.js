import axios from 'axios'

export default {
  getClientConfig(token) {
    console.log(
      'calling API curl GET https://devapi.creditplus.com/consumerreport/api/voa/OrderReport --header Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2Vy...'
    )
    return new Promise((resolve) => {
      setTimeout(() => {
        if (token === 'avantus') {
          resolve({
            status: 200,
            data: {
              layout: 'default',
              theme: 'def',
              themes: {
                primary: '#0277BD'
              },
              customerInfo: {},
              autoFill: {
                reference: '283020338',
                firstname: 'first _name',
                lastname: 'last _name',
                ssn: '333-99-333',
                email: 'autoemail@abc.com'
              }
            }
          })
        } else {
          resolve({
            status: 200,
            data: {
              layout: 'small',
              theme: 'def',
              themes: {
                primary: '#FFA000'
              },
              autoFill: {
                reference: '283020338',
                firstname: 'first _name',
                lastname: 'last _name',
                ssn: '333-99-333',
                email: 'autoemail@abc.com'
              }
            }
          })
        }
      }, 1500)
    })
    // return axios.get('/api/theme', client)
  }
}
