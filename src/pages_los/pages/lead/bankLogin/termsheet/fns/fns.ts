export const showFixedOrFloatingRateFields = (_, dependentValues) => {
  if (
    dependentValues["facilityDetails.fixedOrFloatingRate"]?.value === "FLR" &&
    dependentValues["facilityDetails.facilityType"]?.value !== "LCBG"
  ) {
    return false;
  }
  return true;
};
export const showSelectionOfFixedOrFloatingRate = (_, dependentValues) => {
  if (dependentValues["facilityDetails.facilityType"]?.value === "LCBG") {
    return true;
  }
  return false;
};

export const showTenureOrMoratoriumField = (_, dependentValues) => {
  if (dependentValues["facilityDetails.facilityType"]?.value === "TL") {
    return false;
  }
  return true;
};
