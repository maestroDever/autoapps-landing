<template>
  <div class="columns is-mobile is-tablet" style="cursor: pointer;">
    <div class="column is-one-quarter">
      <figure class="image">
        <img
          class="image is-inline-block logo--image"
          :src="appItem.app_icon"
          alt="logo"
        >
      </figure>
    </div>
    <div class="column">
      <h3 class="title">
        <!-- Bilforhandler A/S -->
        {{ appItem.app_name }}
        <span class="icon is-pulled-right">
          <font-awesome-icon icon="angle-right" class="is-size-2" />
        </span>
      </h3>
      <p class="subtitle">
        {{ appItem.company_name }}
        <br>
        {{ appItem.department_info.zip }} {{ appItem.department_info.address }} {{ appItem.department_info.city }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppComponent',
  props: {
    appItem: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
