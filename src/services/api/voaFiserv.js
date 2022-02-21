import axios from 'axios'
import apiPath from '../../constants/apipath.json'
import appConfig from '../../constants/appconfig.json'
const getHeader = (token, attr = {}) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      ...attr
    }
  }
}
export default {
  submitVOAFiserv(payload, token) {
    return axios.post(
      `${appConfig.cpssApiEndpoint}/${apiPath.voaFiserv.fiservOrder}`,
      payload,
      getHeader(token)
    )
  }
}
