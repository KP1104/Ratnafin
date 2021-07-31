export const showFixedOrFloatingRateFields = (_, dependentValues) => {
  if (
    dependentValues["facilityDetails.fixedOrFloatingRate"]?.value ===
      "floating" &&
    dependentValues["facilityDetails.facilityType"]?.value !== "15"
  ) {
    return false;
  }
  return true;
};
export const showSelectionOfFixedOrFloatingRate = (_, dependentValues) => {
  if (dependentValues["facilityDetails.facilityType"]?.value !== "15") {
    return false;
  }
  return true;
};

export const showTenureOrMoratoriumField = (_, dependentValues) => {
  if (dependentValues["facilityDetails.facilityType"]?.value === "04") {
    return false;
  }
  return true;
};

export const showDependentFieldsOfCC = (_, dependentValues) => {
  if (dependentValues["facilityDetails.facilityType"]?.value === "01") {
    return false;
  }
  return true;
};
export const showDependentFieldsOfLCBG = (_, dependentValues) => {
  if (dependentValues["facilityDetails.facilityType"]?.value === "15") {
    return false;
  }
  return true;
};

export const showDependentFieldsOfFundbase = (_, dependentValues) => {
  if (dependentValues["facilityDetails.fundBaseType"]?.value === "fundBased") {
    return false;
  }
  return true;
};
