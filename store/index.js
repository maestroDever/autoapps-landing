import axios from 'axios'

export const state = () => ({
  brandName: '',
  brandLogo: '',
  myApps: [],
  myLocation: null,
  deviceType: null
})

export const mutations = {
  setAppList (state, data) {
    state.brandName = data.brand_name
    state.brandLogo = data.brand_logo
    state.myApps = [...data.departments]
  },
  setLocation (state, data) {
    state.myLocation = data
  },
  setDevice (state, type) {
    state.deviceType = type
  }
}

export const actions = {
  nuxtServerInit ({ commit }) {
    return axios.get('http://139.162.255.138/backend/api/landing/suzuki/apps')
      .then((res) => {
        commit('setAppList', res.data)
      })
  }
}
