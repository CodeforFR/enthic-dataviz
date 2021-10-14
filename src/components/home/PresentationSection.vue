<template>
  <!-- <div class="columns p-20 m-b-10 has-background-white-bis is-vcentered">
    <div class="column is-half">
      <div class="content">
        <h1 class="is-size-1">Enthic Dataviz : c'est quoi?</h1>
        <p>
          Enthic DataViz est un outil de data visualisation de la base de
          données <a href="https://www.enthic.fr">Enthic</a> qui contient des
          données sur plus de 1,6 millions d'entreprises françaises : bénéfice,
          chiffre d'affaires, salaire, impôt, et plein d'autres informations que
          seuls les comptables comprennent (tous les détails d'un compte de
          résultat en fait).
        </p>
        <p>
          Le but est de rendre les données compréhensible au plus grand nombre,
          à l'aide de graphiques, d'indicateurs, de comparaisons et
          d'explications.
        </p>
        <p>
          Nous avons monté ce projet car nous pensons que ces données doivent
          être facilement accessible et compréhensible par tous, pour mieux
          comprendre
          <b
            >qui, en France, crée la richesse, paye bien ses salarié⋅es, paye
            des impôts</b
          >, et d'autres question de ce genre que plein de citoyen⋅nes et
          consommateur/rices français⋅ses se posent.
        </p>
      </div>
    </div>
    <div class="column is-half">
      <img src="../../assets/img/home/CA_Graphic_example.png" alt="" />
    </div>
  </div> -->
  <carousel
    per-page="1"
    autoplay="true"
    loop="true"
    autoplayTimeout="5000"
    paginationActiveColor="#19117A"
    paginationColor="#E1E6FF"
    class="carousel"
  >
    <slide class="slide">
      <h1>Enthic c'est quoi?</h1>
      <p class="text">
        Enthic DataViz est un outil de data visualisation de la base de données
        <a href="https://www.enthic.fr">Enthic</a> qui contient de données sur
        plus de 1,6 millions d'entreprises françaises : bénéfice, chiffre
        d'affaires, salaire, impôt, et plein d'autres informations que seuls les
        comptables comprennent (tous les détails d'un compte de résultat en
        fait).
      </p>
      <a class="more" href="#">En savoir +</a>
    </slide>
    <slide class="slide">
      <h1>À qui ça sert ?</h1>
      <p class="text">
        Les consommateur/trices, les salarié⋅es, les data-journalistes,
        scientifiques et associations, les syndicats et représentant⋅es du
        personnel, n'importe qui sachant utiliser un tableur et voulant explorer
        ces données.
      </p>
      <a class="more" href="#">En savoir +</a>
    </slide>
    <slide class="slide">
      <h1>Qui sommes-nous ?</h1>
      <p class="text">
        Nous sommes une poignée de citoyen⋅nes français⋅es qui croyons en ce
        projet libre et ouvert, et nous y contribuons bénévolement sur notre
        temps libre.
      </p>
      <a class="more" href="#">En savoir +</a>
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  components: {
    Carousel,
    Slide,
  },
};
</script>
