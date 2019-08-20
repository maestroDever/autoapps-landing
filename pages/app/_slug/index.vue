<template>
  <section class="section is-paddingless has-text-centered app-wrapper">
    <div class="body">
      <div class="app-image-wrapper">
        <figure class="image">
          <!-- <img v-if="window.width >= 640" src="/graphics_iphone_2x.png" alt="iPhone-Frame"> -->
          <img src="/graphics_iphone.png" alt="iPhone-Frame">
          <transition name="fade" :appear="true" mode="out-in">
            <img :key="dashboardImage" class="dashboard-image" :src="dashboardImage" alt="">
          </transition>
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
        </figure>
      </div>
    </div>
    <div class="footer" style="padding-bottom: 2rem;">
      <div class="text footer--title">
        Få personlig service med vores app. Hent appen for at komme i gang.
      </div>
      <div class="buttons">
        <a :href="appItem.app_store_link">
          <img class="store-link" src="/app-store-1.png" alt="App Store Button">
        </a>
        <a :href="appItem.google_play_link">
          <img class="store-link" src="/google-play-store-1.png" alt="Google Play Button">
        </a>
      </div>
      <div class="text description">
        {{ appItem.description }}
      </div>
    </div>

    <div class="post-footer">
      <div class="text">
        Hent appen ved at scanne QR koden med din smartphone
      </div>
      <div class="column is-full-desktop">
        <button
          class="button"
          :class="{'active': qrFor === 'ios'}"
          @click="setQR('ios')"
        >
          iOS
        </button>
        <button
          class="button"
          :class="{'active': qrFor === 'android'}"
          @click="setQR('android')"
        >
          Android
        </button>
      </div>
      <div class="column is-full-desktop is-flex" style="justify-content: center;">
        <figure class="image is-128x128">
          <!-- <img src="/qr-code.png" alt="QR code"> -->
          <qrcode-vue :value="qrFor === 'ios' ? appItem.app_store_link : appItem.google_play_link" size="128" level="H" />
        </figure>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import QrcodeVue from 'qrcode.vue'

export default {
  components: {
    QrcodeVue
  },
  data () {
    return {
      slug: this.$route.params.slug,
      dashboardImage: '',
      qrFor: 'ios',
      window: {
        width: 0,
        height: 0
      }
    }
  },
  computed: {
    companyName () {
      return this.appItem.departments && this.appItem.departments[0].company_name
    },
    appStoreId () {
      return this.appItem.app_store_link && this.appItem.app_store_link.match(/id([\d]{10,})/g)[0]
    },
    googlePlayId () {
      return this.appItem.google_play_link && this.appItem.google_play_link.match(/id=([^&]+)/g)[0]
    }
  },
  asyncData ({ params }) {
    return axios.get('http://139.162.255.138/backend/api/landing/apps/' + params.slug)
      .then((res) => {
        return { appItem: res.data }
      })
  },
  head () {
    const appItem = this.appItem
    return {
      title: appItem.app_name,
      meta: [
        { name: 'description', content: appItem.description },
        { name: 'image', content: appItem.app_icon },
        { itemprop: 'name', content: appItem.app_name },
        { itemprop: 'description', content: appItem.description },
        { itemprop: 'image', content: appItem.app_icon },
        { name: 'apple-itunes-app', content: `app-id=${this.appStoreId}` },
        { name: 'google-play-app', content: this.googlePlayId },
        { property: 'og:title', content: appItem.app_name },
        { property: 'og:description', content: appItem.description },
        { property: 'og:image', content: appItem.app_icon },
        { property: 'og:url', content: this.$route.fullPath },
        { property: 'og:site_name', content: appItem.app_name },
        { property: 'og:locale', content: 'da_DK' },
        { property: 'fb:admins', content: '1061564169' },
        { property: 'fb:app_id', content: '2307210935983207' },
        { property: 'og:type', content: 'website' },
        { property: 'al:ios:app_store_id', content: `app-id=${this.appStoreId}` },
        { property: 'al:ios:app_name', content: appItem.app_name },
        { property: 'al:ios:url', content: `${appItem.app_slug}://` },
        { property: 'al:android:package', content: this.googlePlayId },
        { property: 'al:android:app_name', content: appItem.app_name },
        { property: 'al:android:url', content: `${appItem.app_slug}://` }
      ]
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    this.dashboardImage = this.appItem.departments[0].info.dashboard_background_image
    if (this.appItem.departments.length > 1) {
      let i = 1
      setInterval(() => {
        this.dashboardImage = this.appItem.departments[i].info.dashboard_background_image
        i = (i + 1) % this.appItem.departments.length
      }, 10000)
    }
  },
  methods: {
    setQR (val) {
      this.qrFor = val
    },
    handleResize () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-image-wrapper {

    .image {
      position: relative;
      overflow: hidden;

      img {
        width: auto;
        margin: auto;
      }

      .dashboard-image {
        position: absolute;
        // top: 185px;
        // width: 510px;
        top: 92px;
        width: 255px;
        left: 50%;
        transform: translateX(-50%);

        // @media screen and (max-width: 640px) {
        //   top: 92px;
        //   width: 255px;
        // }
      }
      .app-icon-wrapper {
        position: absolute;
        // top: 75%;
        top: 65%;
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        // @media screen and (max-width: 640px) {
        //   top: 65%;
        // }

        .is-100x100 {
          width: 100px;
          height: 100px;
        }
        .app-name {
          color: rgb(0, 0, 0);
          font-size: 2.2rem;
          padding-top: 1rem;
          color: #fff;
        }

        .company-name {
          color: rgb(0, 0, 0);
          font-size: 1.5rem;
          color: #fff;
        }
      }
    }
  }

  .footer {
    & > * {
      margin: auto;
    }

    &--title {
      width: 32rem;
    }

    .description {
      @media screen and (min-width: 400px) {
        width: 40rem;
      }
    }

    .buttons {
      justify-content: center;
      margin: auto;

      img {
        margin: 1rem 1rem;
        cursor: pointer;
        max-width: 20rem;
      }
    }
  }

  .text {
    font-size: 1.8rem;
  }

  .post-footer {
    background-color: #111;
    color: #fff;
    text-align: center;
    padding: 1rem 1.5rem 6rem;

    .text {
      @media screen and (min-width: 360px) {
        width: 36rem;
        margin: auto;
      }
    }

    .button {
      width: 18rem;
      height: 3.6rem;
      font-size: 1.6rem;
      margin: .4rem;

      &:not(.active) {
        background-color: #444;
        color: #fff;
        border: none;
      }
    }
  }
</style>
