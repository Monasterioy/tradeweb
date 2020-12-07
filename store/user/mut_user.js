/* eslint-disable no-console */
import _ from 'lodash'

const mutations = {
  mut_load_authorization: (state, info) => {
    if (info !== null) {
      state.data = info.data
      state.token = info.token
      localStorage.setItem('user', JSON.stringify(state))
    } else {
      state.data = null
      state.token = null
      localStorage.removeItem('user')
    }
  }
}
export default mutations
