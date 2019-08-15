<template>
  <section class="section is-paddingless has-text-centered app-wrapper">
    <div class="bg-image">
      <nuxt-link to="/" class="back-button">
        Back to home
      </nuxt-link>

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
        <div class="department-name">
          {{ appItem.department_name }}
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure incidunt ut impedit atque enim deserunt repellendus laborum magni sed amet exercitationem voluptas veritatis nisi a praesentium tenetur similique in, perferendis excepturi expedita consequuntur velit.
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
export default {
  data () {
    return {
      slug: this.$route.params.slug
    }
  },
  computed: {
    appList () {
      return this.$store.state.myApps
    },
    appItem () {
      return this.appList.find(item => item.app_slug === this.slug)
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-wrapper {
    background-image: url('/bg-check.png');
  }
  .bg-image {
    background-image: url('/app-iphone.png');
    background-size: auto;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: auto;
    background-color: #eee;
    height: 55vh;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    background-position-y: 10%;
    background-color: transparent;
  }

  .app-icon-wrapper {
    position: absolute;
    bottom: 50%;
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
      color: #fff;
      font-size: 2.2rem;
      padding-top: 1rem;
    }

    .department-name {
      color: #fff;
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
