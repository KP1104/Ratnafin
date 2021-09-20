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
export const showFixedROIField = (_, dependentValues) => {
  if (
    dependentValues["facilityDetails.fixedOrFloatingRate"]?.value === "fixed" &&
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
  const facilityType = dependentValues["facilityDetails.facilityType"]?.value;
  if (["06", "07", "08", "09"].indexOf(facilityType) >= 0) {
    return true;
  }
  return false;
};

export const postValidationSetFuntBaseType = async (fieldData) => {
  const fieldValues = fieldData.incomingMessage?.others[fieldData.value];
  return {
    fundBaseType: {
      value: fieldValues?.fundValue,
    },
  };
};

export const showDSCRAField = (_, dependentValues) => {
  const facilityType = dependentValues["facilityDetails.facilityType"]?.value;
  if (["04", "05"].indexOf(facilityType) >= 0) {
    return false;
  }
  return true;
};
export const calculateAdvance = (data) => {
  let total = 0;
  let result = data.map((one) => {
    if (one.advance !== "" && !isNaN(Number(one.advance))) {
      total = total + Number(one.advance) ?? 0;
      return { ...one, cumulativeAdvance: total };
    } else {
      return { ...one, cumulativeAdvance: 0 };
    }
  });
  return result;
};

export const shouldExcludeDisburesementTranchesMilestone = (
  _,
  dependentValues
) => {
  if (dependentValues["fundingType"]?.value === "M") {
    return false;
  }
  return true;
};

export const shouldExcludeDisburesementTranchesCashflow = (
  _,
  dependentValues
) => {
  if (dependentValues["fundingType"]?.value === "C") {
    return false;
  }
  return true;
};

export const calculateDSCRAAmount = (dependentFields) => {
  let interestRate;

  const loanPeriod = Number(dependentFields["facilityDetails.tenure"].value);
  const loanAmount = Number(
    dependentFields["facilityDetails.sanctionAmount"]?.value
  );
  const fixedROI: any =
    Number(dependentFields["facilityDetails.fixedActualROI"]?.value) / 100;
  const floatingROI: any =
    Number(dependentFields["facilityDetails.floatingActualROI"]?.value) / 100;
  const dscraMonths = Number(
    dependentFields["facilityDetails.dscraMonths"]?.value
  );

  if (fixedROI !== 0) {
    interestRate = fixedROI;
  } else if (floatingROI !== 0) {
    interestRate = floatingROI;
  } else {
  }

  const pmtCalculation = Math.abs(PMT(interestRate, loanPeriod, loanAmount));
  if (!isNaN(Number(pmtCalculation)) && !isNaN(Number(dscraMonths))) {
    return pmtCalculation * dscraMonths;
  }
};

function PMT(ir, np, pv) {
  var presentValueInterstFector = Math.pow(1 + ir, np);
  var pmt =
    (ir * pv * presentValueInterstFector) / (presentValueInterstFector - 1);
  return pmt;
}
