<template>
  <div class="columns">
    <div class="column">
      <div class="box has-background-grey-lighter">
        <h3 class="tile title">Autre représentation des comptes de résultat</h3>
        <ul
          v-for="oneYeardata in companyData.comptesDeResultats"
          v-bind:key="oneYeardata.year"
        >
          <p>Année {{ oneYeardata.year }}</p>
          <TreeView class="item" :item="oneYeardata" />
        </ul>

        <!-- BLOCK SOURCE -->
        <div class="added" id="block-src" v-if="isPositionFilled('block_src')">
          <div class="columns">
            <div class="column is-12">
              <div>
                <span
                  class="has-text-weight-semibold has-text-primary has-text-primary-c"
                >
                  <!-- {{ sourceData }}  -->
                  {{ getDefaultText("source") }}
                  :
                </span>
                <span>
                  {{ matchProjectWithConfig("block_src") }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- BLOCK SCALE -->
        <div
          class="added"
          id="block-scale"
          v-if="
            isPositionFilled('block_scale') ||
            isPositionFilled('block_scale_address')
          "
        >
          <div class="columns">
            <div class="column is-12">
              <div>
                <span
                  v-if="getCustomBlockTitle('block_scale_tags')"
                  class="has-text-weight-semibold has-text-primary has-text-primary-c"
                >
                  {{ getCustomBlockTitle("block_scale_tags") }}
                </span>
                <span
                  class="tag"
                  v-for="(tag, i) in matchProjectWithConfig('block_scale_tags')"
                  :key="tag + i"
                >
                  {{ tag }}
                </span>
              </div>

              <div id="block-scale-2">
                <span
                  v-if="getCustomBlockTitle('block_scale_2')"
                  class="has-text-weight-semibold has-text-primary has-text-primary-c"
                >
                  {{ getCustomBlockTitle("block_scale_2") }}
                </span>
                <span>
                  {{ matchProjectWithConfig("block_scale_2") }}
                </span>
              </div>

              <div
                id="block-scale-address"
                v-if="isPositionFilled('block_scale_address')"
              >
                <span class="icon">
                  <img
                    class="image is-16x16"
                    src="/static/icons/icon_pin.svg"
                  />
                </span>
                {{ matchProjectWithConfig("block_scale_address") }}
              </div>
            </div>
          </div>
        </div>

        <!-- BLOCK PERIOD -->
        <div
          class="added"
          id="block-period"
          v-if="isPositionFilled('block_period')"
        >
          <div class="columns">
            <div class="column is-12">
              <div>
                <span
                  class="has-text-weight-semibold has-text-primary has-text-primary-c"
                >
                  <!-- {{ periodData }}  -->
                  {{ getDefaultText("period") }}
                  :
                </span>
                <span>
                  {{ matchProjectWithConfig("block_period") }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- BLOCK CONTACT -->
        <div
          v-if="
            isPositionFilled('block_contact_name') ||
            isPositionFilled('block_contact_email')
          "
          class="added is-info-b has-text-white"
          id="block-contact"
        >
          <div class="columns">
            <div class="column is-12">
              <div>
                <span class="has-text-weight-semibold">
                  <!-- {{ seeContact }}  -->
                  {{ getDefaultText("see_contact") }}
                  :
                </span>
              </div>
              <br />

              <div v-if="isPositionFilled('block_contact_name')">
                <span class="icon is-small">
                  <i class="far fa-user"></i>
                </span>
                <span>
                  <span v-if="isPositionFilled('block_contact_name')">
                    {{ matchProjectWithConfig("block_contact_name") }}
                  </span>
                  <span v-if="isPositionFilled('block_contact_surname')">
                    {{ matchProjectWithConfig("block_contact_surname") }}
                  </span>
                  <span v-if="isPositionFilled('block_contact_fullname')">
                    {{ matchProjectWithConfig("block_contact_fullname") }}
                  </span>
                  <span v-if="isPositionFilled('block_contact_title')"
                    ><br />
                    {{ matchProjectWithConfig("block_contact_title") }}
                    <br />
                  </span>
                </span>
                <br />
              </div>

              <div v-if="isPositionFilled('block_contact_email')">
                <span class="icon is-small">
                  <i class="fas fa-at"></i>
                </span>
                <span>
                  {{ matchProjectWithConfig("block_contact_email") }}
                  <br />
                </span>
              </div>

              <div v-if="isPositionFilled('block_contact_tel')">
                <span class="icon is-small">
                  <i class="fas fa-phone"></i>
                </span>
                <span>
                  {{ matchProjectWithConfig("block_contact_tel") }} <br />
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- BLOCK OPEN INFOS -->
        <div
          class="added"
          id="block-infos"
          v-if="isPositionFilled('block_open_infos')"
        >
          <div class="columns">
            <div class="column is-12">
              <div>
                <span
                  class="has-text-weight-semibold has-text-primary has-text-primary-c"
                >
                  <!-- {{ infosData }}  -->
                  {{ getDefaultText("infos") }}
                  : <br /><br />
                </span>
              </div>

              <div id="block-tel" v-if="isPositionFilled('block_tel')">
                <span class="icon is-small">
                  <i class="fas fa-angle-right"></i>
                </span>
                <span>
                  <!-- {{ infosTel }}  -->
                  {{ getDefaultText("tel") }}
                  :
                  {{ matchProjectWithConfig("block_tel") }} <br />
                </span>
              </div>

              <div
                id="block-open-infos"
                v-if="isPositionFilled('block_open_infos')"
              >
                <span class="icon is-small">
                  <i class="fas fa-angle-right"></i>
                </span>
                <span>
                  <!-- {{ infosOpen }}  -->
                  {{ getDefaultText("open_infos") }}
                  : <br />
                  {{ matchProjectWithConfig("block_open_infos") }} <br />
                </span>
              </div>

              <div
                id="block-infos-pract"
                v-if="isPositionFilled('block_infos_pract')"
              >
                <span class="icon is-small">
                  <i class="fas fa-angle-right"></i>
                </span>
                <span>
                  <!-- {{ infosMore }}  -->
                  {{ getDefaultText("more_infos") }}
                  :
                  {{ matchProjectWithConfig("block_infos_pract") }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- BLOCK RIGHT BOTTOM 1 -->
        <div
          class="added"
          id="block-RB1"
          v-if="
            isPositionFilled('block_right_bottom_1') ||
            isPositionFilled('block_rb1_tags') ||
            isPositionFilled('block_right_bottom_2')
          "
        >
          <div class="columns">
            <div class="column is-12">
              <!-- BLOCK RB1 TAGS -->
              <div
                id="block-RB1-tags"
                v-if="isPositionFilled('block_rb1_tags')"
              >
                <span
                  v-if="getCustomBlockTitle('block_rb1_tags')"
                  class="has-text-weight-semibold has-text-primary has-text-primary-c"
                >
                  {{ getCustomBlockTitle("block_rb1_tags") }}
                </span>
                <br /><br />
                <span
                  class="tag"
                  v-for="(tag, i) in matchProjectWithConfig('block_rb1_tags')"
                  :key="tag + i"
                >
                  {{ tag }}
                </span>
                <br /><br />
              </div>

              <div>
                <span
                  v-if="getCustomBlockTitle('block_right_bottom_1')"
                  class="has-text-weight-semibold has-text-primary has-text-primary-c"
                >
                  {{ getCustomBlockTitle("block_right_bottom_1") }}
                  <br /><br />
                </span>

                <span>
                  {{ matchProjectWithConfig("block_right_bottom_1") }}
                </span>
              </div>

              <div v-if="isPositionFilled('block_right_bottom_2')">
                <br />

                <span
                  v-if="getCustomBlockTitle('block_right_bottom_2')"
                  class="has-text-weight-semibold has-text-primary has-text-primary-c"
                >
                  {{ getCustomBlockTitle("block_right_bottom_2") }}
                  <br /><br />
                </span>

                <span>
                  {{ matchProjectWithConfig("block_right_bottom_2") }}
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
import TreeView from "./TreeView.vue";

export default {
  name: "CompanyOtherCompteDeResultats",
  props: ["companyData"],
  data() {
    return {
      contentFields: [
        {
          custom_title: null,
          field: "Name",
          field_format: { retrieve: [0], trim: null, type: "object" },
          is_visible: true,
          locale: "fr",
          position: "block_title",
        },
      ],
    };
  },
  components: {
    TreeView,
  },
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

.tag {
  background-color: $app-secondary;
  color: white;
  margin-right: 1em;
  margin-bottom: 0.5em;
}
</style>
