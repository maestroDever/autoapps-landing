<template>
  <section id="page-index">
    <div class="logo">
      <img
        class="image is-64x64 is-inline-block logo--image"
        :src="$store.state.brandLogo"
        alt="logo"
      >
      <span class="image is-64x64 is-size-5 logo--text">
        Way of life!
      </span>
    </div>
    <section class="hero is-primary">
      <div class="hero-head bg-darkblue" />
      <div class="hero-body has-text-centered bg-skyblue">
        <div class="container">
          <h1 class="title is-2">
            78 forhandlere i hele landet
          </h1>
        </div>
      </div>
      <div class="hero-foot has-text-centered bg-darkblue">
        <div class="container">
          <h2 class="subtitle is-3">
            Find din forhandler app
          </h2>
        </div>
      </div>
    </section>
    <section class="section small-padding" style="padding-bottom: .75rem;">
      <div class="field">
        <div class="control">
          <span class="icon is-large is-size-4">
            <font-awesome-icon icon="paper-plane" class="color-skyblue" />
          </span>
          <h3 class="title is-size-3 is-inline-block padding-left-1 color-skyblue">
            Vis nærmeste først
          </h3>
          <span class="is-pulled-right" style="padding-top: 1rem;">
            <input
              id="isDistanceSort"
              type="checkbox"
              class="switch is-rounded is-medium is-info"
              name="isDistanceSort"
              @input="test"
            >
            <label for="isDistanceSort" />
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left">
          <input class="input is-large is-size-4" type="text" placeholder="Indtast postnummer">
          <span class="icon is-large is-size-4 is-left">
            <font-awesome-icon icon="search" class="color-skyblue" />
          </span>
        </div>
      </div>
    </section>
    <section class="section no-padding-top">
      <ul class="list">
        <li
          v-for="item in appList"
          :key="item.department_id"
          class="list-item is-relative"
        >
          <app-component :app-item="item" />
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import axios from 'axios'
import AppComponent from '../components/AppComponent.vue'
export default {
  components: {
    AppComponent
  },
  data () {
    return {
      isSortbyDistance: false
    }
  },
  computed: {
    appList () {
      return this.$store.state.myApps
    }
  },
  fetch ({ store }) {
    return axios.get('http://139.162.255.138/backend/api/landing/suzuki/apps')
      .then((res) => {
        store.commit('setAppList', res.data)
      })
  },
  mounted () {
    if (navigator.geolocation) {
      const locationTimeout = setTimeout(() => {
        this.$store.commit('setLocation', null)
      }, 10000)

      navigator.geolocation.getCurrentPosition((position) => {
        clearTimeout(locationTimeout)

        this.$store.commit('setLocation', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        this.isSortbyDistance = true
      }, () => {
        clearTimeout(locationTimeout)
        this.$store.commit('setLocation', null)
      })
    } else {
      // Fallback for no geolocation
      this.$store.commit('setLocation', null)
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import '../node_modules/bulma-extensions/dist/css/bulma-extensions.min.css';
  #page-index {
    .logo {
      &--image {
        position: absolute;
        left: .5rem;
      }
      &--text {
        position: absolute;
        left: 6.9rem;
        background-color: #0a3145;
        color: #fff;
        text-align: center;
        line-height: 6.4rem;
        font-weight: 700;
      }
    }
    .hero {
      &-head,
      &-foot {
        height: 5rem;
      }
      &-foot {
        .subtitle {
          line-height: 5rem;
        }
      }
    }
  }
</style>
