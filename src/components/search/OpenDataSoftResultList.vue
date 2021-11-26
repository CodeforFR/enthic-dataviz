<template>
  <div v-if="companies" class="layout-search-table px-6">
    <div class="columns">
      <div class="column column_name">
        {{ search_result_count }} sociétés trouvées
      </div>
      <div class="column column_name">
        <SortableTitle
          :sortOrder="sortOrderForField(FIELD_TRI_EFFECTIF)"
          @sortOrderChanged="
            (order) => handleSortOrderChangeForField(FIELD_TRI_EFFECTIF)(order)
          "
          name="Salarié⋅es"
        />
      </div>
      <div class="column column_name">Secteur / code APE</div>
      <div class="column column_name">
        <SortableTitle
          :sortOrder="sortOrderForField(FIELD_TRI_DATE)"
          @sortOrderChanged="
            (order) => handleSortOrderChangeForField(FIELD_TRI_DATE)(order)
          "
          name="Date de création"
        />
      </div>
      <div class="column column_name">Nature juridique</div>
    </div>
    <div v-for="(company, index) in companies" :key="index">
      <router-link
        class="result-link"
        :to="companyDetailRoute(company)"
        v-if="company.isInEnthic"
      >
        <OpenDataSoftOneResult
          :displayable_company="computeDisplayableCompany(company)"
        />
      </router-link>
      <div class="company_no_data" v-else>
        <OpenDataSoftOneResult
          :displayable_company="computeDisplayableCompany(company)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SortableTitle from "./SortableTitle.vue";
import OpenDataSoftSearchRepository from "@/repositories/search/OpenDataSoftSearchRepository";
import OpenDataSoftOneResult from "./OpenDataSoftOneResult.vue";

const { FIELD_TRI_EFFECTIF, FIELD_TRI_DATE } =
  OpenDataSoftSearchRepository.fields;

export default {
  components: { SortableTitle, OpenDataSoftOneResult },
  props: {
    companies: {
      type: Array,
      required: true,
    },
    sort: {
      type: Object,
      default: null,
      required: false,
    },
    search_result_count: Number,
  },
  data() {
    return {
      FIELD_TRI_EFFECTIF,
      FIELD_TRI_DATE,
    };
  },
  methods: {
    sortOrderForField(field) {
      if (this.sort?.field === field) return this.sort?.order;
      return null;
    },
    companyDetailRoute: (company) => ({
      name: "Detail",
      params: { siren: company.fields.siren },
    }),
    handleSortOrderChangeForField(field) {
      return (order) => {
        // console.log("EMIT sortChanged", { field, order });
        this.$emit("sortChanged", { field, order });
      };
    },
    getSortOrder(field) {
      console.log("getSortOrder", {
        sort: this.sort,
        field,
        order: this.sort?.order,
      });
      if (this.sort?.field === field) return this.sort?.order;
      return null;
    },
    emitSortOrderChange(field, order) {
      this.$emit("sortChanged", { field, order });
    },
    computeDisplayableCompany(company) {
      return {
        denomination: this.getDenomination(company),
        siren: company.fields.siren,
        effectif: this.getEffectif(company),
        secteur: {
          description: company.fields.classeetablissement,
          code: company.fields.activiteprincipaleunitelegale,
        },
        dates: this.getDates(company),
        nature_juridique: company.fields.naturejuridiqueunitelegale,
      };
    },
    getEffectif(company) {
      if (!company.fields.trancheeffectifsunitelegale) {
        return { count: "Non rempli" };
      }
      var effectifMapping = {
        "00": "0 salarié⋅e",
        "01": "1 à 2 salarié⋅es",
        "02": "3 à 5 salarié⋅es",
        "03": "6 à 9 salarié⋅es",
        11: "10 à 19 salarié⋅es",
        12: "20 à 49 salarié⋅es",
        21: "50 à 99 salarié⋅es",
        22: "100 à 199 salarié⋅es",
        31: "200 à 249 salarié⋅es",
        32: "250 à 499 salarié⋅es",
        41: "500 à 999 salarié⋅es",
        42: "1 000 à 1 999 salarié⋅es",
        51: "2 000 à 4 999 salarié⋅es",
        52: "5 000 à 9 999 salarié⋅es",
        53: "10 000 salarié⋅es et plus",
      };
      var text = "";
      if (company.fields.trancheeffectifsunitelegale in effectifMapping) {
        text = effectifMapping[company.fields.trancheeffectifsunitelegale];
      } else {
        text = company.fields.trancheeffectifsunitelegale;
      }
      var annee = "";
      if (company.fields.anneeeffectifsunitelegale) {
        annee = " (en " + company.fields.anneeeffectifsunitelegale + ")";
      }
      return { count: text, annee: annee };
    },
    getDenomination(company) {
      if (company.fields.denominationunitelegale) {
        return company.fields.denominationunitelegale;
      }
      var text = "";
      if (company.fields.prenomusuelunitelegale) {
        text += company.fields.prenomusuelunitelegale;
      }
      if (company.fields.nomunitelegale) {
        text += " " + company.fields.nomunitelegale;
      }
      if (company.fields.nomusageunitelegale) {
        text += " " + company.fields.nomusageunitelegale;
      }
      return text;
    },
    getDates(company) {
      var creation_date = company.fields.datecreationunitelegale;
      if (company.fields.datefermetureunitelegale) {
        var closing_date =
          "(Fermée le " + company.fields.datefermetureunitelegale + ")";
      }
      return { creation: creation_date, fermeture: closing_date };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/app-colors.scss";

.company_no_data {
  opacity: 0.7;
}

.column_name {
  font-family: Poppins;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #18097c;
}
</style>
