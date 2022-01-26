<template>
  <div
    class="tile is-parent is-vertical"
    v-bind:class="{ gotchildren: hasChildren }"
  >
    <div class="tile is-parent" @click="toggle">
      <div class="is-6-container">
        <div
          class="tile is-child is-6"
          :style="[
            hasChildren ? { fontWeight: 'bold' } : { fontWeight: 'normal' },
          ]"
        >
          {{ getDescription }}
        </div>
        <div class="button-dropdown" v-if="hasChildren">
          {{ isOpen ? "-" : "+" }}
        </div>
      </div>

      <div
        class="tile is-child tooltip"
        v-for="(oneYearItem, index) in rowItem"
        v-bind:style="{ borderLeft: '3px solid #' + getColor(oneYearItem) }"
        :key="index"
      >
        <span class="tooltiptext">{{ getTooltip(oneYearItem) }}</span>
        {{ getDisplayedValue(oneYearItem) }}
      </div>
    </div>
    <div v-if="hasChildren" v-bind:class="{ subtotal: hasChildren && isOpen }">
      <FoldingRow
        v-show="isOpen"
        v-for="(child, index) in getChildren"
        :key="index"
        :rowItem="child"
      ></FoldingRow>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.is-6-container {
  display: flex;
  justify-content: space-between;
  width: 45%;
}

body {
  color: #444;
}

.button-dropdown {
  width: 60px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(156, 164, 209, 0.16);
}
.gotchildren {
  cursor: pointer;
}
.subtotal {
  cursor: auto;
  .is-child {
    padding-left: 10px;
  }
}
.bold {
  font-weight: bold;
}

.tile .is-child {
  border-collapse: collapse;
  border-bottom: 1px solid rgb(179, 179, 179);
  margin-right: 10px !important;
  font-size: 14px;
  width: 100px;
  display: flex;
  align-items: center;
}
.tile .is-parent {
  padding: 0px;
  margin-right: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 14px;
  white-space: nowrap;
}

/* Tooltip container */
.tooltip {
  position: relative;
  padding: 10px 11px 5px 20px;
  background-color: white;
  width: 45%;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  white-space: initial;
  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
<script>
export default {
  name: "FoldingRow",
  props: {
    rowItem: Array,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    hasChildren() {
      return this.rowItem[0].children;
    },
    getDescription() {
      let text = "";
      if (this.rowItem[0].data.description === "non fourni") {
        text += this.rowItem[0].name;
      } else {
        text += this.rowItem[0].data.description;
      }
      text += "(code:" + this.rowItem[0].data.code + ") : ";
      return text;
    },

    getChildren() {
      let children = {};
      for (let property in this.rowItem[0].children) {
        children[property] = [];
        for (let yearItem of this.rowItem) {
          children[property].push(yearItem.children[property]);
        }
      }
      return children;
    },
  },
  methods: {
    toggle() {
      if (this.hasChildren) {
        this.isOpen = !this.isOpen;
      }
    },
    getDisplayedValue(oneYearItem) {
      let formatter = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
      });
      let text = "";
      if (isNaN(oneYearItem.data.value)) {
        if (oneYearItem.data.computedValue) {
          text +=
            formatter.format(oneYearItem.data.computedValue) + " (calculé)";
        } else {
          text += "non fourni";
        }
      } else {
        text += formatter.format(oneYearItem.data.value);
      }
      return text; //+ ' ' + JSON.stringify(oneYearItem.data, {}, 2)
    },
    getTooltip(oneYearItem) {
      let euroFormatter = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
      });
      let percentFormatter = new Intl.NumberFormat(undefined, {
        style: "percent",
        maximumFractionDigits: 2,
      });
      let text = "";
      if (isNaN(oneYearItem.data.value)) {
        if (oneYearItem.data.computedValue) {
          text +=
            "montant officiellement non fourni, et impossible de le déduire des autres montants présents";
        } else {
          text += "non fourni";
        }
      } else if (oneYearItem.data.status === "checked") {
        text += "montant fourni et cohérent avec les autres montants présents";
        if (oneYearItem.data.computedValue && oneYearItem.data.value) {
          text +=
            " (seulement " +
            euroFormatter.format(
              oneYearItem.data.value - oneYearItem.data.computedValue
            ) +
            " de différence)";
        }
      } else if (oneYearItem.data.status === "computed") {
        text +=
          "montant non fourni mais déduit d'après les autres montants présents";
      } else if (oneYearItem.data.status === "official") {
        text += "montant fourni et pas de vérification possible";
      } else if (oneYearItem.data.status === "signFlipped") {
        text += "montant fourni avec, semble-t-il, une erreur de signe";
      } else {
        text +=
          "montant fourni mais incohérent avec les autres montants présents";
        if (oneYearItem.data.computedValue && oneYearItem.data.value) {
          let diff = oneYearItem.data.value - oneYearItem.data.computedValue;
          let percentDiff = Math.abs(diff / oneYearItem.data.value);

          text +=
            " (" +
            percentFormatter.format(percentDiff) +
            " d'erreur, soit " +
            euroFormatter.format(diff) +
            ")";
        }
      }
      return text; //+ JSON.stringify(oneYearItem.data, {}, 2)
    },
    getColor(oneYearItem) {
      if (
        oneYearItem.data.status === "official" ||
        oneYearItem.data.status === "checked"
      ) {
        return "00bfc7";
      } else if (oneYearItem.data.status === "error") {
        return 941;
      } else if (oneYearItem.data.status === "computed") {
        return "536dfc";
      } else if (oneYearItem.data.status === "signFlipped") {
        return "ff4a4a";
      }
      return 941;
    },
  },
};
</script>
