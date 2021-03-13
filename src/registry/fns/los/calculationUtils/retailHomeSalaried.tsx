import { PV } from "./utils";

export const calculateFOIR = (dependentFields) => {
  const totalIncome = Number(dependentFields?.totalIncome?.value);
  if (totalIncome < 20000) {
    return 60;
  } else if (totalIncome > 100000) {
    return 70;
  } else {
    return 65;
  }
};

export const eligibleEMI = (dependentFields) => {
  const percentageValue = dependentFields?.foir?.value / 100;
  if (typeof dependentFields === "object") {
    const total =
      Number(dependentFields?.totalIncome?.value) * percentageValue -
      Number(dependentFields?.totalActualObligations?.value);
    return total;
  }
};

export const loanAmountBasedOnFOIR = (dependentFields) => {
  const rateValue = Number(dependentFields?.rate?.value / 100 / 12);
  const tenur = Number(dependentFields?.tenur?.value);
  const emi = Number(dependentFields?.eligibleEMI?.value) * -1;
  const result = PV(rateValue, tenur, emi, 0, 0);
  if (isNaN(result)) {
    return 0;
  }
  return Math.floor(result);
};

export const calculateLTV = (dependentFields) => {
  const ltvValue = Number(dependentFields?.propertyMarketValue?.value);
  if (ltvValue >= 0 && ltvValue <= 3000000) {
    return 90;
  } else if (ltvValue > 3000000 && ltvValue <= 7500000) {
    return 80;
  }
  return 75;
};

export const loanAmountBasedOnLTV = (dependentFields) => {
  const ltvPercentageValue = Number(dependentFields?.ltv?.value) / 100;
  const marketPropertyValue = Number(
    dependentFields?.propertyMarketValue?.value
  );
  if (ltvPercentageValue && marketPropertyValue !== null) {
    const total = ltvPercentageValue * marketPropertyValue;
    return total;
  }
};

export const loanAmountBasedOnFOIRLTV = (dependentFields) => {
  const loanAmountBasedOnFOIR = Number(
    dependentFields?.loanAmountBasedOnFOIR?.value
  );
  const loanAmountBasedOnLTV = Number(
    dependentFields?.loanAmountBasedOnLTV?.value
  );
  const result = Math.min(loanAmountBasedOnFOIR, loanAmountBasedOnLTV);
  return Math.round(result);
};

export const eligibileLoanAmountDifference = (dependentFields) => {
  const loanAmount = Number(dependentFields?.loanAmount?.value);
  const loanAmountBasedOnFOIRLTV = Number(
    dependentFields?.loanAmountBasedOnFOIRLTV?.value
  );

  const differencePercentage =
    (loanAmount - loanAmountBasedOnFOIRLTV) / loanAmount;
  return Math.ceil(differencePercentage * 100);
};

export const setEligibleLoanAmount = (dependentFields) => {
  return Number(dependentFields?.loanAmountBasedOnFOIRLTV?.value);
};

export const balanceLeasePeriodRemaining = (dependentFields) => {
  const totalMonthLeasePeriod = dependentFields?.totalMonthLeasePeriod?.value;
  const momnthPassed = dependentFields?.momnthPassed?.value * 30;
  return totalMonthLeasePeriod - momnthPassed;
};

export const rentRevisionMonths = (dependentFields) => {
  const momnthPassed = dependentFields?.momnthPassed?.value;
  const rentReviFrequency = dependentFields?.rentReviFrequency?.value;
  const calculateMod = momnthPassed % rentReviFrequency;
  return rentReviFrequency - calculateMod;
};

export const calculateLTVLRD = (dependentFields) => {
  const propertyType = dependentFields?.propertyType?.value;

  if (propertyType === "01" || propertyType === "02") {
    return 65;
  } else if (propertyType === "03") {
    return 60;
  } else {
    return null;
  }
};

export const loanAmountBasedOnLTVLRD = (dependentFields) => {
  const ltv = dependentFields?.ltv?.value / 100;
  const propertyValue = Number(dependentFields?.propertyValue?.value);
  return ltv * propertyValue;
};
