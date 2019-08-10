export const state = () => ({
  brandName: '',
  brandLogo: '',
  myApps: []
})

export const mutations = {
  setAppList (state, data) {
    state.brandName = data.brand_name
    state.brandLogo = data.brand_logo
    state.myApps = [...data.departments]
  }
}

export const actions = {

}
