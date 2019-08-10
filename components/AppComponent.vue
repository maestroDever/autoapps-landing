<template>
  <div class="columns is-mobile is-tablet">
    <div class="column is-one-quarter">
      <img
        class="image is-inline-block logo--image"
        :src="appItem.avatar"
        alt="logo"
      >
    </div>
    <div class="column">
      <h3 class="title">
        <!-- Bilforhandler A/S -->
        {{ appItem.first_name }}
        <span class="icon is-pulled-right">
          <font-awesome-icon icon="angle-right" class="is-size-2" />
        </span>
      </h3>
      <p class="subtitle">
        {{ appItem.email }}
        <br>
        Med Andersen Biler app’en, er dit liv som bilejer gjort både nemmere, mere sikkert og mere fordelagtigt:<br><br>• Opret din bil i garagen, så tidsbestilling hurtigt kan klares fra mobilen.<br>• Optjen rabatter og fordele ved at samle stempler i loyalitetsprogrammet.<br>• Modtag personlige nyheder og spændende tilbud målrettet til dig og din bil.<br>• Kom nemt i kontakt med os, se vores åbningstider og find vej. <br>• Oplev vores udvalg af nye og brugte biler.<br><br>Hvis uheldet er ude, eller du blot ønsker hjælp til hverdagens udfordringer som bilejer, så giver app’en dig desuden også adgang, til en række praktiske og nyttige værktøjer:<br><br>• En komplet guide til førstehjælp <br>• En formular til skadesrapportering<br>• Kontakt til vejhjælp og del din position<br>• Hold dig opdateret med trafikinformationer<br>• Parkeringsassistent med timer og parkeringsmarkør<br><br>Andersen Biler A/S er autoriseret forhandler og serviceværksted af Suzuki.<br><br>Vi glæder os til at betjene dig!
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
