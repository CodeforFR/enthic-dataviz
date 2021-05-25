<template>
  <div class="columns" v-if="companyData.comptesDeResultats">
    <div class="column">
      <div class="box">
        <h3 class="title is-3">Comptes de résultat détaillés</h3>
        <div
          class="tile is-ancestor is-vertical"
          v-if="
            companyData.comptesDeResultats &&
            companyData.comptesDeResultats.length > 0
          "
        >
          <p class="subtitle">
            Cliquer sur une ligne permet de découvrir les détails de sa
            composition
          </p>
          <div class="tile is-parent">
            <div class="tile is-6"></div>
            <div
              class="tile"
              v-for="(oneYeardata, index) in companyData.comptesDeResultats"
              :key="index"
            >
              Année {{ oneYeardata.year }}
            </div>
          </div>
          <FoldingArray
            :rowItem="companyData.comptesDeResultats"
          ></FoldingArray>
          <div class="tile is-parent">
            <p class="tile" style="color: #194">
              Une valeur en vert est une valeur officielle et qui peut être
              retrouvée avec les autres valeurs fournies (erreur de maximum 0,5%
              ou 10€ tolérée)
            </p>
            <p class="tile" style="color: #419">
              Une valeur en bleu est une valeur non fournie mais qui peut être
              retrouvée avec les autres valeurs
            </p>
            <p class="tile" style="color: #941">
              Une valeur en rouge est une valeur non fournie, ou officielle mais
              ne correspondant pas aux autres valeurs
            </p>
          </div>
        </div>
        <div v-else>Aucune données</div>
      </div>
    </div>
  </div>
</template>

<script>
import FoldingArray from "./FoldingArray.vue";

export default {
  name: "CompanyCompteDeResultatsTree",
  props: ["companyData"],
  components: {
    FoldingArray,
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/app-colors.scss";
@import "../../assets/css/app-misc.scss";

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
