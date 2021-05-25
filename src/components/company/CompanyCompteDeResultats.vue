<template>
  <div>
    <div class="columns" v-if="comptesDeResultats">
      <div class="column">
        <div class="box has-background-info" v-if="chartDetails">
          <h3 class="title is-3">Répartition du chiffre d'affaire</h3>
          <p>
            Ce graphique montre la répartition des charges payées par le chiffre
            d'affaire de l'entreprise. La hauteur de chaque colonne correspond
            au chiffre d'affaire.
          </p>

          <BarChart
            :options="chartDetails.optionsChartCA"
            :isStacked="true"
          ></BarChart>
          <p>Listes des problèmes pour afficher le graphique</p>
          <ul>
            <li
              v-for="(item, index) in chartDetails.listOfUndisplayableData"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="columns" v-if="comptesDeResultats">
      <div class="column">
        <div class="box has-background-info" v-if="chartDetails">
          <h3 class="title is-3">Répartition du profit de l'entreprise</h3>
          <p>
            Ce graphique montre comment la marge de l'entreprise sur son
            activité principale (résultat d'exploitation) est répartie entre :
          </p>
          <ul>
            <li>les salarié⋅es (participation)</li>
            <li>la collectivité (impôts)</li>
            <li>l'entreprise (bénéfices)</li>
            <li>
              les créanciers, les marchés, etc... (Résultats financier et
              exceptionnel)
            </li>
          </ul>
          <BarChart :options="chartDetails.optionsChartMargin"></BarChart>

          <p>
            Un montant positif signifie que l'entreprise a donné de l'argent à
            l'acteur économique en question, un montant négatif signifie que
            l'acteur économique donne de l'argent à l'entreprise.
          </p>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import BarChart from "@/components/charts/BarChart";
import ChartDataService from "@/services/companyData/CompteDeResultatsCharts.js";

export default {
  name: "CompanyCompteDeResultats",
  props: ["comptesDeResultats"],
  components: {
    BarChart,
  },
  computed: {
    chartDetails() {
      const chartData = ChartDataService.calculateChartDetails(this.comptesDeResultats);
      return chartData;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/app-colors.scss";
@import "../../assets/css/app-misc.scss";

main {
  // background-color: $app-blue-deep;
  background-color: $app-grey-background;
  margin-top: 0; // $app-navbar-height;
  height: 100%;
  padding-bottom: 3em;
}

ul {
  list-style-type: circle;
}

.block-color {
  background-color: $app-secondary !important;
  color: white;
}

.tag {
  background-color: $app-secondary;
  color: white;
  margin-right: 1em;
  margin-bottom: 0.5em;
}

a.disabled {
  pointer-events: none;
  border-bottom: none !important ;
  cursor: default;
}

a.back {
  padding: 1em 0;
  display: block;

  color: $app-text-color;
  // color: white ;

  img,
  .icon {
    height: 1.5em;
    transform: translateY(0.1em);
  }

  span {
    margin-left: 1em;
    // color: white ;
  }
}

.columns {
  margin-top: 0;
}

.illustration {
  width: 100%;
  margin-bottom: 1em;
}

.description,
.added {
  // background-color: $app-blue-deep;
  background-color: white;
  // color: white;
  padding: 1em;
  margin-bottom: 1em;
}

.description {
  p {
    margin-bottom: 1em;
  }

  a {
    color: $app-primary;
    border-bottom: 1px solid $app-primary;
  }
}

.added {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;

  .link-at-sourcer img {
    max-height: 1.1em;
    transform: translateY(0.2em);
  }

  img {
    height: auto;
  }

  .no-left-padding {
    padding-left: 0em;
  }
  .is-vertical-centered {
    // padding-left: 1em;
    display: flex;
    align-items: center;
  }

  .logo {
    // max-width: 175px;
    height: auto;
    width: 100%;
  }

  a {
    color: $app-primary;
    font-weight: bold;
  }
}

.pending {
  text-align: center;
  padding: 9em;
}

svg {
  margin: 25px;
}
path {
  fill: none;
  stroke: #76bf8a;
  stroke-width: 3px;
}
</style>
