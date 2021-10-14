<template>
  <div>
    <TitleSection />
    <PresentationSection />
    <!-- <div class="columns p-20 m-b-30 m-t-30 has-background-white-bis">
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
    </div> -->
    <PartnersSection />
    <iframe
      src="https://framaforms.org/le-projet-vous-interesse-laissez-nous-un-message-1631199316"
      style="width: 100%; height: 656px"
      border="0"
    ></iframe>
  </div>
</template>

<script>
import PartnersSection from "@/components/home/PartnersSection";
import TitleSection from "@/components/home/TitleSection";
import PresentationSection from "@/components/home/PresentationSection";

export default {
  name: "Home",
  components: {
    PartnersSection,
    PresentationSection,
    TitleSection,
  },
};
</script>
