export const calculateAmount = (value, dependentField) => {
  if (isNaN(Number(value))) {
    return null;
  }
  const total = (value * dependentField) / 100;
  if (isNaN(total)) {
    return "";
  }
  return total;
};

export const calculatePercentage = (value, dependentField) => {
  if (isNaN(Number(value))) {
    return null;
  }
  const total = (value / dependentField) * 100;
  if (isNaN(total)) {
    return "";
  }
  return total.toFixed(2);
};

export const visaversaValidateValue = async (fieldData, dependentFields) => {
  let totalAmount = Number(
    dependentFields["facilityDetails.fundAmount"]?.value
  );
  let value = Number(fieldData?.value["fundFeeInAmount"]);

  if (value >= totalAmount) {
    return "Should not be greater than Raised Fund Amount";
  }
  return "";
};
