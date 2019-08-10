export const state = () => ({
  myApps: []
})

export const mutations = {
  setAppList (state, data) {
    state.myApps = [...data]
  }
}

export const actions = {
  getInfo ({ commit }) {
    this.$axios.$get('https://cors-anywhere.herokuapp.com/https://app.autoapps.dk/backend/api/landing/suzuki/apps')
      .then((res) => {
        console.log('res', res)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
}
