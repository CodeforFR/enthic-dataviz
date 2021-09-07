<template>
  <div class="container is-fullheight m-t-30">
    <div class="columns p-20 m-b-30 m-t-30 has-background-white-bis">
      <div class="column">
        <div class="content has-text-centered">
          <h2 class="is-size-2">
            Explorez les données financières des entreprises françaises!
          </h2>
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
    <div class="columns p-20 m-b-10 has-background-white-bis is-vcentered">
      <div class="column is-half">
        <div class="content">
          <h1 class="is-size-1">Enthic Dataviz : c'est quoi?</h1>
          <p>
            Enthic DataViz est un outil de data visualisation de la base de
            données <a href="https://www.enthic.fr">Enthic</a> qui contient des
            données sur plus de 1,6 millions d'entreprises françaises :
            bénéfice, chiffre d'affaires, salaire, impôt, et plein d'autres
            informations que seuls les comptables comprennent (tous les détails
            d'un compte de résultat en fait).
          </p>
          <p>
            Le but est de rendre les données compréhensible au plus grand
            nombre, à l'aide de graphiques, d'indicateurs, de comparaisons et
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
        <img src="../assets/img/home/CA_Graphic_example.png" alt="" />
      </div>
    </div>
    <div class="columns p-20 m-b-30 m-t-30 has-background-white-bis">
      <div class="column is-12">
        <div class="content">
          <h2 class="is-size-2">À qui ça sert ?</h2>
          <ul>
            <li>
              les consommateur/trices qui veulent consommer mieux pour
              contribuer à la relocalisation de l'économie
            </li>
            <li>
              les salarié⋅es qui veulent savoir comment leur entreprise réparti
              la valeur ajoutée produite entre les salarié⋅es, l'État, les
              investissements et les actionnaires.
            </li>
            <li>
              Les data-journalistes, scientifiques et associations (et même des
              élu⋅es) qui s'intéressent à l'impact économique des entreprises.
            </li>
            <li>
              Les syndicats et représentant⋅es du personnel qui voudraient
              comprendre le modèle économique de leur entreprise et comparer son
              impact social avec des concurrents, ou alors pour informer leurs
              collègues à travers tracts et articles.
            </li>
            <li>
              N'importe qui sachant utiliser un tableur et voulant explorer ces
              données, via leur téléchargement en fichier .csv
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
            Nous sommes une poignée de citoyen⋅nes français⋅es qui croyons en ce
            projet libre et ouvert, et nous y contribuons bénévolement sur notre
            temps libre, car nous pensons que ces données doivent être
            facilement accessible et compréhensible par tous, pour mieux
            comprendre qui crée la richesse en France, qui touche des
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
