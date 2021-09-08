import { differenceInMonths, endOfMonth, startOfMonth } from "date-fns";

export const AutoFillGender = (field) => {
  if (typeof field.value === "string") {
    field.value = field.value.trim();
  }
  return new Promise((res) => {
    if (field.value === "00") {
      res({
        gender: {
          value: "00",
        },
        firstName: {
          value: "",
        },
      });
    } else if (field.value === "01" || field.value === "02") {
      res({
        gender: {
          value: "01",
        },
      });
    } else {
      res({
        gender: {
          value: "00",
        },
      });
    }
  });
};

export const getGenderValue = async (field) => {
  if (field.value === "00") {
    return {
      gender: {
        value: "00",
      },
    };
  }
  if (field.value === "01") {
    return {
      gender: {
        value: "01",
      },
    };
  } else if (field.value === "02" || field.value === "03") {
    return {
      gender: {
        value: "02",
      },
    };
  } else {
    return {
      gender: {
        value: "00",
      },
    };
  }
};

export const getYesOrNoOptions = () => {
  return new Promise((res) => {
    res([
      { label: "Yes", value: "Y" },
      { label: "No", value: "N" },
    ]);
  });
};

export const getMonthlyEmiPayValidateValue = async (fieldData) => {
  if (
    fieldData.value === "X" ||
    fieldData.value === false ||
    fieldData.value === "" ||
    fieldData.value === null
  ) {
    return "This field is required";
  } else {
  }
};

export const getValidateValue = async (fieldData) => {
  if (
    fieldData.value === "X" ||
    fieldData.value === "" ||
    fieldData.value === "0" ||
    fieldData.value === false ||
    fieldData.value === null ||
    fieldData.value === "00"
  ) {
    return "This field is required";
  } else {
  }
};

export const validateFOIRUpto85Percent = async (fieldData) => {
  if (Number(fieldData.value) > 85) {
    return "This value should not be greater than 85%";
  } else {
  }
};

export const setValueOnDependentFieldsChangeOne = (dependentFields) => {
  if (typeof dependentFields === "object") {
    let result = Object.values(dependentFields);
    if (Array.isArray(result) && result.length > 0) {
      const total = result.reduce((accum, one) => {
        accum = Number(accum) + Number(one.value);
        return accum;
      }, 0);
      return total;
    }
  }
};

export const setLTVValue = async (fieldData) => {
  const fieldValues = fieldData.incomingMessage?.others[fieldData.value];
  return {
    minLTV: {
      value: fieldValues?.minLTV,
    },
    maxLTV: {
      value: fieldValues?.maxLTV,
    },
  };
};

export const setNewLTVValue = async (fieldData) => {
  const fieldValues = fieldData.incomingMessage?.others[fieldData.value];
  return {
    newltvCondition: {
      value: fieldValues?.maxLTV,
    },
  };
};

export const setLTVValueForCAM = async (fieldData) => {
  const fieldValues = fieldData.incomingMessage?.others[fieldData.value];
  return {
    ltv: {
      value: fieldValues?.maxLTV,
    },
  };
};

//Dummy only for testing
export const shouldExcludeDummy = async (_, dependentFields, formState) => {
  if (dependentFields["dummy"].value === "1") {
    return true;
  } else {
    return false;
  }
};

export const getMonthDifferenceInRows = (_, dependentFields, formState) => {
  let from = dependentFields["fromDate"]?.value;
  let to = dependentFields["toDate"]?.value;
  let result = -1;
  if (from instanceof Date && to instanceof Date) {
    from = startOfMonth(from);
    to = endOfMonth(to);
    result = differenceInMonths(to, from);
  }
  if (isNaN(result)) {
    return -1;
  } else if (result < 0) {
    return -1;
  } else {
    return result + 1;
  }
};

export const setBankFacilityValue = (fieldData) => {
  const fieldValues = fieldData.incomingMessage?.others[fieldData.value];
  return {
    bankFacility: {
      value: fieldValues?.facility,
    },
  };
};

export const setFacilityFundBaseValue = (fieldData) => {
  const fieldValues = fieldData.incomingMessage?.others[fieldData.value];
  return {
    fundBaseType: {
      value: fieldValues?.fundValue,
    },
  };
};

export const setCompanyNameFromGSTNumber = (fieldData) => {
  const fieldValues = fieldData.incomingMessage?.others[fieldData.value];
  return {
    fundBaseType: {
      value: fieldValues?.fundValue,
    },
  };
};

export const validateLoanAmount = async (fieldData) => {
  if (fieldData.value === "0" || fieldData.value < 0) {
    return "Loan Amount should be greater than Zero";
  } else {
  }
};
