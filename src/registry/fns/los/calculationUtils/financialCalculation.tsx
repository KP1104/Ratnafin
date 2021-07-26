export const calculateEBITDA = (dependentFields) => {
  const depreciation = Number(dependentFields?.depreciation?.value);
  const ebit = Number(dependentFields?.ebit?.value);
  const total = ebit + depreciation;
  if (isNaN(total)) {
    return "";
  }
  return total;
};

export const calculateEBIT = (dependentFields) => {
  const ebt = Number(dependentFields?.ebt?.value);
  const interestExpenses = Number(dependentFields?.interestExpenses?.value);
  const total = interestExpenses + ebt;
  if (isNaN(total)) {
    return "";
  }
  return total;
};

export const calculateEBT = (dependentFields) => {
  const tax = Number(dependentFields?.tax?.value);
  const pat = Number(dependentFields?.pat?.value);
  const total = pat + tax;
  if (isNaN(total)) {
    return "";
  }
  return total;
};

export const calculateCashProfit = (dependentFields) => {
  const depreciation = Number(dependentFields?.depreciation?.value);
  const pat = Number(dependentFields?.pat?.value);
  const total = pat + depreciation;
  if (isNaN(total)) {
    return "";
  }
  return total;
};

export const calculateEBITDAPercentage = (dependentFields) => {
  const ebitDa = Number(dependentFields?.ebitDa?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  const total = (ebitDa / revenue) * 100;
  if (isNaN(total)) {
    return "";
  }
  return total.toPrecision(5);
};

export const calculateEBTPercentage = (dependentFields) => {
  const ebt = Number(dependentFields?.ebt?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  const total = (ebt / revenue) * 100;
  if (isNaN(total)) {
    return "";
  }
  return total.toPrecision(5);
};

export const calculatePatPercentage = (dependentFields) => {
  const pat = Number(dependentFields?.pat?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  const total = (pat / revenue) * 100;
  if (isNaN(total)) {
    return "";
  }
  return total.toPrecision(5);
};

export const calculateCashProfitPercentage = (dependentFields) => {
  const cashProfit = Number(dependentFields?.cashProfit?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  const total = (cashProfit / revenue) * 100;
  if (isNaN(total)) {
    return "";
  }
  return total.toPrecision(5);
};

export const calculateAdjustedPat = (dependentFields) => {
  const pat = Number(dependentFields?.pat?.value);
  const directorsOrPartnersRemuneration = Number(
    dependentFields?.directorsOrPartnersRemuneration?.value
  );
  const interestOnCapital = Number(dependentFields?.interestOnCapital?.value);
  const total = pat + directorsOrPartnersRemuneration + interestOnCapital;
  if (isNaN(total)) {
    return "";
  }
  return total;
};

export const calculateAdjustedCashProfit = (dependentFields) => {
  const adjustedPat = Number(dependentFields?.adjustedPat?.value);
  const depreciation = Number(dependentFields?.depreciation?.value);
  const total = adjustedPat + depreciation;
  if (isNaN(total)) {
    return "";
  }
  return total;
};

export const calculateAdjustedPatPercentage = (dependentFields) => {
  const adjustedPat = Number(dependentFields?.adjustedPat?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  const total = (adjustedPat / revenue) * 100;
  if (isNaN(total)) {
    return "";
  }
  return total.toPrecision(5);
};

export const calculateAdjustedCashProfitPercentage = (dependentFields) => {
  const adjustedCashProfit = Number(dependentFields?.adjustedCashProfit?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  const total = (adjustedCashProfit / revenue) * 100;
  if (isNaN(total)) {
    return "";
  }
  return total.toPrecision(5);
};

export const calculateNetWorth = (dependentFields) => {
  const shareCapital = Number(dependentFields?.shareCapital?.value);
  const reservesSurplus = Number(dependentFields?.reservesSurplus?.value);
  const total = shareCapital + reservesSurplus;
  if (isNaN(total)) {
    return "";
  }
  return total;
};

export const calculateNetWorthQuasi = (dependentFields) => {
  const netWorth = Number(dependentFields?.netWorth?.value);
  const unsecLoanPromoter = Number(dependentFields?.unsecLoanPromoter?.value);
  const total = netWorth + unsecLoanPromoter;
  if (isNaN(total)) {
    return "";
  }
  return total;
};

export const calculateLongTermDebtEquity = (dependentFields) => {
  const networthQuasi = Number(dependentFields?.networthQuasi?.value);
  const longTermDebtFund = Number(dependentFields?.longTermDebtFund?.value);
  const total = longTermDebtFund / networthQuasi;
  console.log(total);
  if (isNaN(total)) {
    return "";
  }
  return Math.round(total).toFixed(2);
};

export const calculateTolTnvQuasi = (dependentFields) => {
  const longTermDebtFund = Number(dependentFields?.longTermDebtFund?.value);
  const shortTermDebtFund = Number(dependentFields?.shortTermDebtFund?.value);
  const networthQuasi = Number(dependentFields?.networthQuasi?.value);
  const currentLiabilities = Number(dependentFields?.currentLiabilities?.value);
  const sumOfAll = shortTermDebtFund + longTermDebtFund + currentLiabilities;
  const total = sumOfAll / networthQuasi;
  if (isNaN(total)) {
    return "";
  }
  return Math.round(total);
};

export const calculateCurrentRatio = (dependentFields) => {
  const currentAssets = Number(dependentFields?.currentAssets?.value);
  const currentLiabilities = Number(dependentFields?.currentLiabilities?.value);
  const total = currentAssets / currentLiabilities;
  if (isNaN(total)) {
    return "";
  }
  return Math.round(total);
};
