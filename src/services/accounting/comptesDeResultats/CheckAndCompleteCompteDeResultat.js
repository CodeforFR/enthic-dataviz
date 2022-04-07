/**
The function checkTreeData takes a CompteDeResultat tree like the one in "arbreCompteDeResultat.json" file,
where every child should have been filled with data , which consist of a new member like :
data = {
  code : string,
  description : string,
  value : integer,
  status : "official"
}
*/

// Accepted amount of difference when checking parent value against it's children
const relativeError = 0.008;
const absoluteError = 10;

export function checkTreeData(item) {
  if (!item.data) {
    // console.log(" from item :", item);
    item.data = {
      code: item.codeLiasses.toString(),
      description: "non fourni",
      value: undefined,
      status: "missing",
    };
  }
  if (item.children) {
    for (var childName in item.children) {
      checkTreeData(item.children[childName]);
    }

    // Compute ourself item's value from its children
    var computedSum = 0; // Result from official children's value
    var computedSumFromComputed = 0; // Result from computed children's value
    var computedSumWithoutSign = 0; // Result by adding all children (even if somme children should be substracted)
    var childMissingCount = 0; // Count of child without value officially given
    for (var childName1 in item.children) {
      var child = item.children[childName1];
      if (child.data.value) {
        computedSum += child.data.value * (child.sign ? -1 : 1);
        computedSumFromComputed += child.data.value * (child.sign ? -1 : 1);
        computedSumWithoutSign += child.data.value;
      } else {
        childMissingCount += 1;
        if (child.data.computedValue) {
          computedSumFromComputed +=
            child.data.computedValue * (child.sign ? -1 : 1);
        }
      }
    }

    if (item.data.value) {
      // If official value match computed value from official children's value with less than 0.5% error
      if (
        Math.abs((computedSum - item.data.value) / item.data.value) <
          relativeError ||
        Math.abs(computedSum - item.data.value) < absoluteError
      ) {
        item.data.status = "checked";
        // Fix children values if needed
        if (childMissingCount > 0) {
          for (var childName2 in item.children) {
            setToZeroComputed(item.children[childName2]);
          }
        }
      }
      // If official value match computed value from computed children's value with less than 0.5% error
      else if (
        Math.abs(
          (computedSumFromComputed - item.data.value) / item.data.value
        ) < relativeError ||
        Math.abs(computedSumFromComputed - item.data.value) < absoluteError
      ) {
        item.data.status = "checked";
        // Fix children values if needed
        for (var childName3 in item.children) {
          if (item.children[childName3].data.value == undefined) {
            if ("computedValue" in item.children[childName3].data) {
              item.children[childName3].data.value =
                item.children[childName3].data.computedValue;
              for (childName in item.children[childName3].children) {
                setToZeroComputed(
                  item.children[childName3].children[childName]
                );
              }
            } else {
              item.children[childName3].data.value = 0;
            }
            item.children[childName3].data.status = "computed";
          }
        }
        computedSum = computedSumFromComputed;
      }
      // If official value match computed value * 1000, it mean value was multiplied by 1000 by mistake
      else if (
        Math.abs((computedSum * 1000 - item.data.value) / item.data.value) <
          relativeError ||
        Math.abs(computedSum * 1000 - item.data.value) < absoluteError
      ) {
        item.data.status = "scaled down";
        item.data.value = computedSum;
        // Fix children values if needed
        if (childMissingCount > 0) {
          for (childName in item.children) {
            setToZeroComputed(item.children[childName]);
          }
        }
      }
      // If official value match computed value / 1000, it mean value was divided by 1000 by mistake
      else if (
        Math.abs((computedSum - item.data.value * 1000) / item.data.value) <
          relativeError ||
        Math.abs(computedSum - item.data.value * 1000) < absoluteError
      ) {
        item.data.status = "scaled up";
        item.data.value = computedSum;
        // Fix children values if needed
        if (childMissingCount > 0) {
          for (childName in item.children) {
            setToZeroComputed(item.children[childName]);
          }
        }
      }
      // If there is only one value missing from children, set this child's value equal to the computed difference
      else if (childMissingCount == 1) {
        for (var childName4 in item.children) {
          var child2 = item.children[childName4];
          if (!item.children[childName4].data.value) {
            doubleCheckComputedValueWithChildren(
              item.children[childName4],
              (item.data.value - computedSum) / (child2.sign ? -1 : 1)
            );
            item.data.status = "checked";

            if (item.data.value == 6) {
              console.log("checked 3 item:", item);
            }
            break;
          }
        }
      }
      // If official value match computed value by adding all children's value (no substraction) with less than 0.5% error
      else if (
        Math.abs((computedSumWithoutSign - item.data.value) / item.data.value) <
          relativeError ||
        Math.abs(computedSumWithoutSign - item.data.value) < absoluteError
      ) {
        item.data.status = "checked";

        if (item.data.value == 6) {
          console.log("checked 4 item:", item);
        }
        item.data.computedValue = computedSumWithoutSign;
        // Fix children sign and/or set to zero missing values if any
        for (var childName5 in item.children) {
          flipSign(item.children[childName5]);
          setToZeroComputed(item.children[childName5]);
        }
      } else if (
        Math.abs((computedSum - item.data.value) / item.data.value) > 100
      ) {
        item.data.status = "error";
      } else {
        item.data.status = "error";
      }
    }
    if (computedSum != item.data.value && !item.data.computedValue) {
      item.data.computedValue = computedSumFromComputed;
    }
  }
}

function computeChildrenSum(item) {
  console.log("computeChildrenSum", item);
  var result = 0;
  for (var childName in item.children) {
    var child = item.children[childName];
    if (child.data.value) {
      result += child.data.value * (child.sign ? -1 : 1);
    }
  }
  return result;
}

function areOpposite(value, reference) {
  var sum = value + reference;
  if (
    Math.abs(sum / reference) < relativeError ||
    Math.abs(sum) < absoluteError
  ) {
    return true;
  }
  return false;
}

function doubleCheckComputedValueWithChildren(item, computedValue) {
  item.data.value = computedValue;
  item.data.status = "computed";
  if (item.children) {
    var computedSum = computeChildrenSum(item);
    if (areOpposite(computedSum, item.data.value)) {
      item.data.value = -item.data.value;
      flipSign(item);
    }
  }
}

function setToZeroComputed(item) {
  if (
    item.data.value == undefined &&
    (item.data.computedValue == undefined || item.data.computedValue == 0)
  ) {
    item.data.value = 0;
    item.data.status = "computed";
    for (var childName in item.children) {
      setToZeroComputed(item.children[childName]);
    }
  }
}

function flipSign(item) {
  if (item.sign && item.sign == -1) {
    item.data.value = -item.data.value;
    item.data.status = "signFlipped";
    console.log(item.name, "flipped, newvalue=", item.data.value);
    var computedSum = computeChildrenSum(item);
    if (areOpposite(computedSum, item.data.value)) {
      for (var childName in item.children) {
        var child = item.children[childName];
        child.data.value = -child.data.value;
        console.log("child", child.name, "flipped");
        if (child.data.status == "computed") {
          child.data.status = "computed then signFlipped";
        } else {
          child.data.status = "signFlipped";
        }
      }
    }
  }
}
