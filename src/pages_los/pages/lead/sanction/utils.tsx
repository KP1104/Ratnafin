export const calculateActualRateofInte = (dependentFields) => {
  const baseRate = Number(
    dependentFields["facilityDetails.baseRate"]?.value / 100
  );
  const spread = Number(
    dependentFields["facilityDetails.spreadInPercent"]?.value / 100
  );
  const total = (baseRate + spread) * 100;
  return total;
};
