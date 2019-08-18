<template>
  <section class="section is-paddingless has-text-centered app-wrapper">
    <div class="body">
      <div class="bg-image">
        <figure class="image">
          <img src="/iphone-frame.png" alt="iPhone-Frame">
        </figure>
      </div>

      <div class="dashboard-image">
        <figure class="image">
          <transition name="fade" :appear="true" mode="out-in">
            <img :key="dashboardImage" :src="dashboardImage" alt="">
          </transition>
        </figure>
      </div>

      <div class="app-icon-wrapper">
        <figure class="image is-100x100">
          <img
            class="box is-paddingless"
            :src="appItem.app_icon"
            alt="App Icon"
          >
        </figure>
        <div class="app-name">
          {{ appItem.app_name }}
        </div>
        <div class="company-name">
          {{ companyName }}
        </div>
      </div>
    </div>
    <div class="footer" style="padding-bottom: 2rem;">
      <div class="text">
        Få personlig service med vores app. Hent appen for at komme i gang.
      </div>
      <div class="buttons">
        <a :href="appItem.app_store_link">
          <img src="/app-store-1.png" alt="App Store Button">
        </a>
        <a :href="appItem.google_play_link">
          <img src="/google-play-store-1.png" alt="Google Play Button">
        </a>
      </div>
      <div class="text">
        {{ appItem.description }}
      </div>
    </div>

    <div class="post-footer">
      <div class="text">
        ent appen ved at scanne QR koden med din smartphone
      </div>
      <div class="column is-full-desktop">
        <button class="button light">
          iOS
        </button>
        <button class="button dark">
          Android
        </button>
      </div>
      <div class="column is-full-desktop is-flex" style="justify-content: center;">
        <figure class="image is-128x128">
          <img src="/qr-code.png" alt="QR code">
        </figure>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      slug: this.$route.params.slug,
      appItem: {},
      dashboardImage: ''
    }
  },
  computed: {
    appList () {
      return this.$store.state.myApps
    },
    companyName () {
      return this.appItem.departments && this.appItem.departments[0].company_name
    }
  },
  created () {
    axios.get('https://cors-anywhere.herokuapp.com/http://139.162.255.138/backend/api/landing/apps/' + this.slug)
      .then((res) => {
        this.appItem = res.data
        this.dashboardImage = this.appItem.departments[0].info.dashboard_background_image
      })
  },
  mounted () {
    let i = 1
    setInterval(() => {
      this.dashboardImage = this.appItem.departments[i].info.dashboard_background_image
      i = (i + 1) % this.appItem.departments.length
    }, 10000)
  }
}
</script>

<style lang="scss" scoped>
  .body {
    height: 75vh;
    overflow: hidden;
  }
  .bg-image {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 75vh;
    overflow: hidden;
    z-index: 2;

    .image {
      width: 400px;
    }

    @media screen and (max-width: 400px) {
      .image {
        width: 320px;
      }
    }
  }

  .dashboard-image {
    position: absolute;
    top: 110px;
    height: calc(75vh - 110px);
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;

    .image {
      width: 320px;
      height: 100%;

      img {
        height: 100%;
      }
    }
    @media screen and (max-width: 400px) {
      top: 90px;
      height: calc(75vh - 90px);
      .image {
        width: 252px;
      }
    }
  }

  .app-icon-wrapper {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .is-100x100 {
      width: 100px;
      height: 100px;
    }
    .app-name {
      color: rgb(0, 0, 0);
      font-size: 2.2rem;
      padding-top: 1rem;
    }

    .company-name {
      color: rgb(0, 0, 0);
      font-size: 1.5rem;
    }
  }

  .buttons {
    justify-content: center;
    margin: 3rem 0;

    img {
      margin: 1rem 1rem;
      cursor: pointer;
    }
  }
  .text {
    font-size: 1.8rem;
  }
  .button {
    width: 18rem;
    height: 3.6rem;
    font-size: 1.6rem;
    margin: .4rem;

    &.light {
      color: #000;
    }
    &.dark {
      background-color: #444;
      color: #fff;
      border: none;
    }
  }

  .post-footer {
    background-color: #111;
    color: #fff;
    text-align: center;
    padding: 1rem 1.5rem 6rem;
  }
</style>
