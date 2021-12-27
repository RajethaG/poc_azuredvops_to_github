import axios from 'axios'

export default {
  getClientConfig(client) {
    console.log('calling API endpoint for client configuration')
    return new Promise((resolve) => {
      setTimeout(() => {
        if (client === 'avantus') {
          resolve({
            status: 200,
            data: {
              client,
              layout: 'default',
              theme: 'def',
              themes: {
                primary: '#0277BD'
              }
            }
          })
        } else {
          resolve({
            status: 200,
            data: {
              client,
              layout: 'small',
              theme: 'def',
              themes: {
                primary: '#FFA000'
              }
            }
          })
        }
      }, 1500)
    })
    // return axios.get('/api/theme', client)
  }
}
