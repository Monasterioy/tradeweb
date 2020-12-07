import mutations from './mut_user'

const store = {
  state: () => ({
    Authorization: null,
    data: null
  }),
  mutations
}

export default store
