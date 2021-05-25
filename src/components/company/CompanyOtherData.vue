<template>
  <div class="columns">
    <div class="column">
      <div class="box">
        <h3 class="tile title">
          Autres données présentes dans la base Enthic (mais pas valorisées ici)
        </h3>
        <div v-for="(year, index) in companyData.yearData" :key="index">
          {{ year.year }}
          <ul>
            <li v-for="(data, index) in year.data" :key="index">
              {{ data.description }} : {{ data.value }}
            </li>
          </ul>
        </div>
        <div class="description">
          <!-- BLOCK MAIN TAGS -->
          <div id="block-main-tags" v-if="isPositionFilled('block_main_tags')">
            <span
              v-if="getCustomBlockTitle('block_main_tags')"
              class="has-text-weight-semibold has-text-primary has-text-primary-c"
            >
              {{ getCustomBlockTitle("block_main_tags") }}
            </span>
            <br />
            <span
              class="tag"
              v-for="(tag, i) in matchProjectWithConfig('block_main_tags')"
              :key="tag + i"
            >
              {{ tag }}
            </span>
            <br /><br />
          </div>

          <!-- BLOCK ADDRESS -->
          <p id="block-address" v-if="isPositionFilled('block_address')">
            <span class="icon">
              <img class="image is-16x16" src="@/assets/icons/icon_pin.svg" />
            </span>
            {{ matchProjectWithConfig("block_address") }}
          </p>

          <!-- BLOCK PRE ABSTRACT -->
          <p
            id="block-pre-abstract"
            v-if="isPositionFilled('block_pre_abstract')"
          >
            <span
              v-if="getCustomBlockTitle('block_pre_abstract')"
              class="has-text-weight-semibold has-text-primary has-text-primary-c"
            >
              {{ getCustomBlockTitle("block_pre_abstract") }}
              <br /><br />
            </span>
            {{ matchProjectWithConfig("block_pre_abstract") }}
          </p>

          <!-- BLOCK PARTNERS -->
          <div id="block-partners" v-if="isPositionFilled('block_partners')">
            <p>{{ matchProjectWithConfig("block_partners") }}</p>
          </div>

          <!-- BLOCK POST ABSTRACT 1 -->
          <p id="block-post-abstract-1"></p>

          <!-- BLOCK POST ABSTRACT 2 -->
          <p id="block-post-abstract-2"></p>

          <!-- BLOCK POST ABSTRACT 3 -->
          <p
            id="block-post-abstract-3"
            v-if="isPositionFilled('block_post_abstract_3')"
          >
            <span
              v-if="getCustomBlockTitle('block_post_abstract_3')"
              class="has-text-weight-semibold has-text-primary has-text-primary-c"
            >
              {{ getCustomBlockTitle("block_post_abstract_3") }}
              <br /><br />
            </span>
            {{ matchProjectWithConfig("block_post_abstract_3") }}
          </p>
        </div>

        <!-- BLOCK SERVICES -->
        <div
          class="added"
          id="block-services"
          v-if="isPositionFilled('block_services')"
        >
          <div class="columns">
            <div class="column is-12">
              <div>
                <span
                  class="has-text-weight-semibold has-text-primary has-text-primary-c"
                >
                  <!-- {{ servicesData }}  -->
                  {{ getDefaultText("services") }}
                  : <br /><br />
                </span>
                <span>
                  {{ matchProjectWithConfig("block_services") }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- BLOCK BOTTOM 2 -->
        <div
          class="added"
          id="block-LB2"
          v-if="isPositionFilled('block_left_bottom_2')"
        >
          <div class="columns">
            <div class="column is-12">
              <div>
                <span
                  v-if="getCustomBlockTitle('block_left_bottom_2')"
                  class="has-text-weight-semibold has-text-primary has-text-primary-c"
                >
                  {{ getCustomBlockTitle("block_left_bottom_2") }}
                  <br /><br />
                </span>
                <span>
                  {{ matchProjectWithConfig("block_left_bottom_2") }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyOtherData",
  props: ["companyData"],
  methods: {
    isPositionFilled(fieldBlock) {
      console.log("isPositionFilled", fieldBlock);
      // console.log("isPositionFilled /  fieldBlock :", fieldBlock)
      return false; // this.listOfPositions.indexOf(fieldBlock) !== -1;
    },
    getCustomBlockTitle(fieldBlock) {
      let customBlockTitle = undefined;
      const contentField = this.contentFields.find(
        (f) => f.position === fieldBlock
      );
      if (contentField) {
        customBlockTitle = contentField.custom_title;
      }
      return customBlockTitle;
    },
    matchProjectWithConfig(fieldBlock) {
      console.log("matchProjectWithConfig fieldBlock =", fieldBlock);
      return this.noData;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/app-colors.scss";
@import "../../assets/css/app-misc.scss";

ul {
  list-style-type: circle;
}

.description,
.added {
  // background-color: $app-blue-deep;
  background-color: white;
  // color: white;
  padding: 1em;
  margin-bottom: 1em;
}

.tag {
  background-color: $app-secondary;
  color: white;
  margin-right: 1em;
  margin-bottom: 0.5em;
}
</style>
