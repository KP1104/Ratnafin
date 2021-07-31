export const calculateAmount = (value, name, dependentFields) => {
  if (isNaN(Number(value))) {
    return null;
  }
  const total =
    (dependentFields["facilityDetails.fundAmount"]?.value * value) / 100;
  if (isNaN(total)) {
    return "";
  }
  return total;
};

export const calculatePercentage = (value, name, dependentFields) => {
  if (isNaN(Number(value))) {
    return null;
  }
  const total =
    (value / dependentFields["facilityDetails.fundAmount"]?.value) * 100;
  if (isNaN(total)) {
    return "";
  }
  return total;
};

export const visaversaValidateValue = async (fieldData, dependentFields) => {
  let totalAmount = Number(
    dependentFields["facilityDetails.fundAmount"]?.value
  );
  let value = Number(fieldData?.value["fundFeeInAmount"]);

  if (value >= totalAmount) {
    return "Should not be greater than previous one value";
  }
  return "";
};
