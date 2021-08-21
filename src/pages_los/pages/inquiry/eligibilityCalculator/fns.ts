export const applicantMonthlySalaryFieldShow = (_, dependentFields) => {
  if (dependentFields["employementType"]?.value === "Salaried") {
    return false;
  }
  return true;
};

export const applicantFilingDetailsFieldShow = (_, dependentFields) => {
  if (dependentFields["employementType"]?.value !== "Salaried") {
    return false;
  }
  return true;
};

export const coApplicantMonthlySalaryFieldShow = (_, dependentFields) => {
  if (dependentFields["coApplicantEmployement"]?.value === "02") {
    return false;
  }
  return true;
};

export const coApplicantFilingDetailsFieldShow = (_, dependentFields) => {
  if (dependentFields["coApplicantEmployement"]?.value === "01") {
    return false;
  }
  return true;
};

export const calculateTotalObligation = (dependentFields) => {
  const applicantObligation = Number(dependentFields["obligation"]?.value);
  const CoApplicantObligation = Number(
    dependentFields["coApplicantObligation"]?.value
  );
  if (!isNaN(applicantObligation) && !isNaN(CoApplicantObligation)) {
    return applicantObligation + CoApplicantObligation;
  }
  return 0;
};

export const calculateApplicantIncome = (dependentFields) => {
  const previousYearIncome = Number(
    dependentFields["previousAnnualNetProfit"]?.value
  );
  const currentYearIncome = Number(
    dependentFields["currentAnnualNetProfit"]?.value
  );

  let income = 0;
  if (isNaN(previousYearIncome) || previousYearIncome == 0) {
    income = currentYearIncome / 12;
  } else {
    income = Math.abs(currentYearIncome - previousYearIncome);
    if (income > 0) {
      income = (income / previousYearIncome) * 100;
      if (income <= 50) {
        income = currentYearIncome / 12;
      } else {
        income = (previousYearIncome * 1.5) / 12;
      }
    } else {
      income = 0;
    }
  }
  return income;
};

export const calculateCoApplicantIncome = (dependentFields) => {
  const previousYearIncome = Number(
    dependentFields["coApplicantPreviousAnnualNetProfit"]?.value
  );
  const currentYearIncome = Number(
    dependentFields["coApplicantCurrentAnnualNetProfit"]?.value
  );

  let income = 0;
  if (!isNaN(previousYearIncome) || previousYearIncome == 0) {
    income = currentYearIncome / 12;
  } else {
    income = Math.abs(currentYearIncome - previousYearIncome);
    if (income > 0) {
      income = (income / previousYearIncome) * 100;
      if (income <= 50) {
        income = currentYearIncome / 12;
      } else {
        income = (previousYearIncome * 1.5) / 12;
      }
    } else {
      income = 0;
    }
  }
  return income;
};

export const calculateApplicantCoApplcantTotalIncome = (dependentFields) => {
  const applicantEmployementType = dependentFields["employementType"]?.value;
  const coApplicantEmployementType =
    dependentFields["coApplicantEmployement"]?.value;
  let applicantIncome = 0;
  let coApplicantIncome = 0;

  if (applicantEmployementType == "01" || applicantEmployementType == "03") {
    applicantIncome = Number(dependentFields["applicantIncome"]?.value);
  } else if (applicantEmployementType == "02") {
    applicantIncome = Number(dependentFields["monthlyIncome"]?.value);
  }

  if (coApplicantEmployementType == "01") {
    coApplicantIncome = Number(dependentFields["coApplicantIncome"]?.value);
  } else if (coApplicantEmployementType == "02") {
    coApplicantIncome = Number(
      dependentFields["coApplicantMonthlyIncome"]?.value
    );
  }
  if (!isNaN(applicantIncome) && !isNaN(coApplicantIncome)) {
    return applicantIncome + coApplicantIncome;
  }
  return 0;
};
