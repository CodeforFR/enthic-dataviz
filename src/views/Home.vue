<template>
  <div class="container is-fullheight m-t-30">
    <div class="columns p-20 m-b-10 has-background-white-bis is-vcentered">
      <div class="column is-half">
        <div class="content">
          <h1 class="is-size-1">Enthic Dataviz</h1>
          <h2 class="is-size-2">
            Explorez les données financières des entreprises françaises
          </h2>
          <p>
            <a href="/">Enthic DataViz</a> est un outil de data visualisation de
            la base de données <a href="https://www.enthic.fr">Enthic</a> qui
            contient des données sur plus de 1,6 millions d'entreprises
            françaises : bénéfice, chiffre d'affaires, salaire, cotisations
            sociales, prime participation, effectif, impôt, et plus encore (tous
            les détails d'un compte de résultat en fait).
          </p>
          <p>
            Nous avons monté ce projet libre et ouvert, et nous le réalisons
            bénévolement sur notre temps libre, car nous pensons que ces données
            doivent être facilement accessible et compréhensible par tous, pour
            mieux comprendre qui crée la richesse en France, qui touche des
            subventions de la France, qui paye des impôts en France, et d'autres
            question de ce genre que plein de citoyen⋅nes et consommateur/rices
            français⋅ses se posent.
          </p>
        </div>
      </div>
      <div class="column is-half">
        <img src="../assets/img/home/home.svg" alt="" />
      </div>
    </div>
    <div class="columns p-20 m-b-30 m-t-30 has-background-white-bis">
      <div class="column">
        <div class="content has-text-centered">
          <h2 class="is-size-2">Démarrer !</h2>
          <SearchBar />
          <div class="m-t-20">
            par exemple l'entreprise
            <router-link class="result-link" to="/recherche?text=enercoop">
              "Enercoop"</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="columns p-20 m-b-30 m-t-30 has-background-white-bis">
      <div class="column is-12">
        <div class="content">
          <h2 class="is-size-2">A qui ça sert ?</h2>
          <h3 class="is-size-3">Les bénéficiaires du projet sont :</h3>
          <ul>
            <li>
              les consommateur/trices qui veulent consommer mieux pour
              contribuer à la relocalisation de l'économie
            </li>
            <li>
              que les salarié⋅es puissent savoir comment leur entreprise réparti
              la valeur ajoutée produite entre les salarié⋅es, l'État, les
              investissements et les actionnaires.
            </li>
            <li>
              Pour que les data-journalistes, les syndicats, les associations,
              et même des élu⋅es puissent faire usage de ces données.
            </li>
            <li>
              de rendre facilement récupérable et analysable les données sans
              requérir de écrire du code : un des buts du projet est de rendre
              accessible les données à n'importe qui sachant utiliser un
              tableur.
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="columns p-20 m-b-30 m-t-30 has-background-white-bis">
      <div class="column is-12">
        <div class="content">
          <h2 class="is-size-2">Qui sommes-nous ?</h2>
          <p>
            Nous avons monté ce projet libre et ouvert, et nous le réalisons
            bénévolement sur notre temps libre, car nous pensons que ces données
            doivent être facilement accessible et compréhensible par tous, pour
            mieux comprendre qui crée la richesse en France, qui touche des
            subventions de la France, qui paye des impôts en France, et d'autres
            question de ce genre que plein de citoyen⋅nes et consommateur/rices
            français⋅ses se posent.
          </p>
        </div>
      </div>
      <div class="column"></div>
    </div>
    <PartnersSection />
  </div>
</template>

<script>
import SearchBar from "@/components/search/SearchBar";
import PartnersSection from "@/components/home/PartnersSection";

export default {
  name: "Home",
  components: {
    SearchBar,
    PartnersSection,
  },
};
</script>
