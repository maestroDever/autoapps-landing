<template>
  <section class="section is-paddingless has-text-centered">
    <div class="bg-image">
      <nuxt-link to="/" class="back-button">
        Back
      </nuxt-link>

      <div class="app-icon-wrapper">
        <figure class="image is-128x128">
          <img
            class="box is-paddingless"
            :src="appItem.app_icon"
            alt="App Icon"
          >
        </figure>
        <div class="app-name">
          {{ appItem.app_name }}
        </div>
        <div class="department-name">
          {{ appItem.department_name }}
        </div>
      </div>
    </div>
    <div class="footer">
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure incidunt ut impedit atque enim deserunt repellendus laborum magni sed amet exercitationem voluptas veritatis nisi a praesentium tenetur similique in, perferendis excepturi expedita consequuntur velit.
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      slug: this.$route.params.slug
    }
  },
  head () {
    return {
      title: this.appItem.app_name,
      meta: [
        { name: 'description', content: this.appItem.description },
        { name: 'image', content: this.appItem.app_icon },
        { itemprop: 'name', content: this.appItem.app_name },
        { itemprop: 'description', content: this.appItem.description },
        { itemprop: 'image', content: this.appItem.app_icon },
        { name: 'apple-itunes-app', content: `app-id=${this.appStoreId}` },
        { name: 'google-play-app', content: this.googlePlayId },
        { property: 'og:title', content: this.appItem.app_name },
        { property: 'og:description', content: this.appItem.description },
        { property: 'og:image', content: this.appItem.app_icon },
        { property: 'og:url', content: this.$route.fullPath },
        { property: 'og:site_name', content: this.appItem.app_name },
        { property: 'og:locale', content: 'da_DK' },
        { property: 'fb:admins', content: '1061564169' },
        { property: 'fb:app_id', content: '2307210935983207' },
        { property: 'og:type', content: 'website' },
        { property: 'al:ios:app_store_id', content: `app-id=${this.appStoreId}` },
        { property: 'al:ios:app_name', content: this.appItem.app_name },
        { property: 'al:ios:url', content: `${this.appItem.app_slug}://` },
        { property: 'al:android:package', content: this.googlePlayId },
        { property: 'al:android:app_name', content: this.appItem.app_name },
        { property: 'al:android:url', content: `${this.appItem.app_slug}://` }
      ]
    }
  },
  computed: {
    appList () {
      return this.$store.state.myApps
    },
    appItem () {
      return this.appList.find(item => item.app_slug === this.slug)
    },
    appStoreId () {
      return this.appItem.app_store_link.match(/id([\d]{10,})/g)[0]
    },
    googlePlayId () {
      return this.appItem.google_play_link.match(/(?<=[?&]id=)[^&]+/g)[0]
    }
  }
}
</script>

<style lang="scss" scoped>
  .bg-image {
    background-image: url('https://autoapps.dk/wp-content/uploads/2018/01/Sk%C3%A6rmbillede-2018-01-18-kl.-12.12.46.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #eee;
    height: 95vh;
  }

  .app-icon-wrapper {
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .app-name {
    color: #fff;
    font-size: 2.2rem;
    padding-top: 2rem;
  }

  .department-name {
    color: #fff;
    font-size: 1.5rem;
    padding-top: 1.2rem;
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
</style>
