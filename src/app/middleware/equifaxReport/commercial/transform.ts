import { mapper } from "../config";

export const transform = ({
  CommercialRequestInfo,
  Score,
  CCRResponse,
  InquiryResponseHeader,
}: any = {}) => {
  let newData = {
    header: {
      clientID: InquiryResponseHeader?.ClientID,
      reportOrderNo: InquiryResponseHeader?.ReportOrderNO,
      referenceNumber: InquiryResponseHeader?.CustRefField,
      reportDate: InquiryResponseHeader?.Date,
      reportTime: InquiryResponseHeader?.Time,
      tranID:
        CCRResponse?.CommercialBureauResponse?.InquiryResponseHeader?.TranID,
      copyrightYear: "2021",
    },

    entityName: CommercialRequestInfo?.BusinessName,
    lastUpdatedOn:
      CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
        ?.CommercialCIRSummary?.CommercialHeaderDetails?.last_updated_on,
    severityGrid:
      CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
        ?.CommercialCIRSummary?.SeverityGrid?.SeverityGridDetailsMap,
    equifaxScoresCommercial: {
      scoreName:
        CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
          ?.CommercialCIRSummary?.EquifaxScoresCommercial
          ?.CommercialScoreDetailsLst?.[0]?.ScoredEntity,
      scoredEntity:
        CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
          ?.CommercialCIRSummary?.EquifaxScoresCommercial
          ?.CommercialScoreDetailsLst?.[0]?.Relationship,
      relationship:
        CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
          ?.CommercialCIRSummary?.EquifaxScoresCommercial
          ?.CommercialScoreDetailsLst?.[0]?.ScoreName,
      scoreValue:
        CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
          ?.CommercialCIRSummary?.EquifaxScoresCommercial
          ?.CommercialScoreDetailsLst?.[0]?.ScoreValue,
    },
    overallCreditSummary:
      CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
        ?.CommercialCIRSummary?.OverallCreditSummary,
    enquirySummary:
      CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
        ?.EnquirySummary,
    inquiryInputDetails: {
      inquiryInfo: {
        inquiryPurpose:
          mapper.EQFX_INQ_PURPOSE[CommercialRequestInfo?.InquiryPurpose] ??
          CommercialRequestInfo?.InquiryPurpose,
        transactionAmount: CommercialRequestInfo?.TransactionAmount ?? "",
        businessName: CommercialRequestInfo?.BusinessName ?? "",
        dateIncorporation: CommercialRequestInfo?.Dateincorporation ?? "",
        businessCategory: CommercialRequestInfo?.BusinessCategory ?? "",
        businessIndustryType: CommercialRequestInfo?.BusinessIndustryType ?? "",
        businessRegistrationNo:
          getIdDetails(CommercialRequestInfo?.IDDetails)
            ?.businessRegistrationNo ?? "",
      },
      ...getInquiryAddresses(CommercialRequestInfo?.InquiryAddresses),
      idAndPhoneDetails: {
        ...getIdAndPhoneDetails(
          CommercialRequestInfo?.IDDetails,
          CommercialRequestInfo?.InquiryPhones
        ),
      },
    },
    ...getEnquiriesDetails(
      CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
        ?.RecentEnquiries
    ),
    entityDetailsBorrower: {
      personalInformation:
        CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
          ?.IDAndContactInfo?.CommercialPersonalInfo ?? {},
      idInformation: {
        CIN:
          CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
            ?.IDAndContactInfo?.CommercialIdentityInfo?.CIN?.[0]?.IdNumber ??
          "",
        TIN:
          CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
            ?.IDAndContactInfo?.CommercialIdentityInfo?.TIN?.[0]?.IdNumber ??
          "",
        PANId:
          CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
            ?.IDAndContactInfo?.CommercialIdentityInfo?.PANId?.[0]?.IdNumber ??
          "",
        Dunsnbr:
          CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
            ?.IDAndContactInfo?.CommercialIdentityInfo?.Dunsnbr?.[0]
            ?.IdNumber ?? "",
        ServiceTax:
          CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
            ?.IDAndContactInfo?.CommercialIdentityInfo?.ServiceTax?.[0]
            ?.IdNumber ?? "",
        BusinessRegistration:
          CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
            ?.IDAndContactInfo?.CommercialIdentityInfo
            ?.BusinessRegistration?.[0]?.IdNumber ?? "",
        roc_BusinessRegistrationDate:
          CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
            ?.IDAndContactInfo?.CommercialIdentityInfo
            ?.roc_BusinessRegistrationDate?.[0]?.IdNumber ?? "",
      },
      contactInformation: {
        ...getPhoneInfo(
          CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
            ?.IDAndContactInfo?.CommercialPhoneInfo ?? {}
        ),
      },
      ...getAddressInfo(
        CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
          ?.IDAndContactInfo?.CommercialAddressInfo ?? {}
      ),
      ...getRelationshipInfo(
        CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
          ?.RelationshipDetails ?? []
      ),
    },
    openCreditFacilitySummary:
      CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
        ?.CommercialCIRSummary?.OpenCreditFacilitySummary ?? {},
    delinquencySummary:
      CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
        ?.CommercialCIRSummary?.DelinquencySummary ?? {},
    derogSummary:
      CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
        ?.CommercialCIRSummary?.DerogSummary ?? {},
    creditTypeSummary:
      CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
        ?.CommercialCIRSummary?.CreditTypeSummary ?? {},
    ...getCreditFaciltyDetails(
      CCRResponse?.CommercialBureauResponse?.CommercialBureauResponseDetails
        ?.CreditFacilityDetails ?? []
    ),
    CCRHitDetailsLst:
      CCRResponse?.CommercialBureauResponse?.CCRHitDetailsLst ?? [],
  };
  return newData;
};
const getInquiryAddresses = (data) => {
  let result = {
    inquiryAddresses: [],
  };
  if (Array.isArray(data) && data.length > 0) {
    let array = data.map((one) => {
      return {
        seq: one?.seq ?? "",
        addressType: Array.isArray(one?.AddressType)
          ? one.AddressType.map((type) => {
              return mapper.ADDRESS_TYPE[type];
            }).join("")
          : "",
        addressLine1: one?.AddressLine1 ?? "",
        addressLine2: one?.AddressLine2 ?? "",
        locality: one?.Locality ?? "",
        city: one?.City ?? "",
        state: one?.State ?? "",
        postal: one?.Postal ?? "",
      };
    });
    return { inquiryAddresses: array };
  }
  return result;
};

const getIdAndPhoneDetails = (IDDetails, PhoneDetails) => {
  let obj = {},
    idObj = getIdDetails(IDDetails),
    phoneObj = getPhonesDetails(PhoneDetails);
  obj = {
    ...idObj,
    ...phoneObj,
  };
  return obj;
};

const getIdDetails = (IDDetails) => {
  let idObj = {
    pan: "",
    cin: "",
    tin: "",
    serviceTaxNo: "",
    dunsNumber: "",
    businessRegistrationNo: "",
  };
  let reducer = (prev, current) => {
    if (!Array.isArray(prev[current?.IDType])) {
      prev[current?.IDType] = [current?.IDValue];
    } else {
      prev[current?.IDType]?.push(current?.IDValue);
    }
    return prev;
  };

  if (Array.isArray(IDDetails)) {
    let numbersObj = IDDetails.reduce(reducer, {});
    return {
      pan: numbersObj["T"]?.join(", ") ?? "",
      cin: numbersObj["C"]?.join(", ") ?? "",
      tin: numbersObj["A"]?.join(", ") ?? "",
      serviceTaxNo: numbersObj["S"]?.join(", ") ?? "",
      dunsNumber: numbersObj["U"]?.join(", ") ?? "",
      businessRegistrationNo: numbersObj["B"]?.join(", ") ?? "",
    };
  }
  return idObj;
};

const getPhonesDetails = (PhoneDetails) => {
  let reducer = (prev, current) => {
    if (!Array.isArray(prev[current?.PhoneType?.[0]])) {
      prev[current?.PhoneType?.[0]] = [current?.Number];
    } else {
      prev[current?.PhoneType?.[0]]?.push(current?.Number);
    }
    return prev;
  };

  if (Array.isArray(PhoneDetails)) {
    let numbersObj = PhoneDetails.reduce(reducer, {});
    return {
      mobile: numbersObj["M"]?.join(", "),
    };
  }
  return { mobile: "" };
};

const getPhoneInfo = (data) => {
  let result = {
    Mobile: "",
    Landline: "",
    Fax: "",
    Other: "",
  };
  let reducer = (prev, current) => {
    if (!Array.isArray(prev[current?.typeCode])) {
      prev[current?.typeCode] = [current?.Number];
    } else {
      prev[current?.typeCode]?.push(current?.Number);
    }
    return prev;
  };
  if (Array.isArray(data)) {
    let numbersObj = data.reduce(reducer, {});
    return {
      Mobile: numbersObj["M"]?.join(","),
      Landline: numbersObj["L"]?.join(","),
      Fax: numbersObj["F"]?.join(","),
      Other: numbersObj["O"]?.join(","),
    };
  }
  return result;
};

const getAddressInfo = (data) => {
  let result = {
    addressInformation: [],
  };
  if (Array.isArray(data) && data.length > 0) {
    let array = data.map((one) => {
      return {
        type: one?.Type ?? "",
        address: one?.Address ?? "",
        state: one?.State ?? "",
        postal: one?.Postal ?? "",
        reportedDate: one?.ReportedDate ?? "",
        city: one?.City ?? "",
        district: one?.District ?? "",
        country: one?.Country ?? "",
      };
    });
    return { addressInformation: array };
  }
  return result;
};
const getRelationshipInfo = (data) => {
  let result = {
    relatedIndividuals: [],
    relatedEntities: [],
  };
  let individual = data.filter((one) => "full_name" in one);
  let entity = data.filter((one) => "business_entity_name" in one);
  if (Array.isArray(data) && data.length > 0) {
    entity = entity.map((one) => {
      return {
        Relationship: one?.Relationship ?? "",
        full_name: one?.full_name ?? "",
        business_entity_name: one?.business_entity_name ?? "",
        date_of_incorporation: one?.date_of_incorporation ?? "",
        CommercialAddressInfo: one?.CommercialAddressInfo ?? [],
        ...gerRelationIdentityInfo(one?.IdentityInfo ?? {}),
        PhoneInfo: { ...gerRelationPhoneInfo(one?.PhoneInfo ?? []) },
      };
    });
    individual = individual.map((one) => {
      return {
        Relationship: one?.Relationship ?? "",
        full_name: one?.full_name ?? "",
        CommercialAddressInfo: one?.CommercialAddressInfo ?? [],
        ...gerRelationIdentityInfo(one?.IdentityInfo ?? {}),
        PhoneInfo: { ...gerRelationPhoneInfo(one?.PhoneInfo ?? []) },
      };
    });

    return { relatedIndividuals: individual, relatedEntities: entity };
  }
  return result;
};
const gerRelationIdentityInfo = (data) => {
  if (typeof data === "object" && Boolean(data)) {
    return {
      IdentityInfo: {
        PANId: data?.PANId?.[0]?.IdNumber ?? "",
        VoterID: data?.VoterID?.[0]?.IdNumber ?? "",
        NationalIDCard: data?.NationalIDCard?.[0]?.IdNumber ?? "",
        Passport: data?.Passport?.[0]?.IdNumber ?? "",
        DriverLicense: data?.DriverLicense?.[0]?.IdNumber ?? "",
        RationCard: data?.RationCard?.[0]?.IdNumber ?? "",
        OtherId: data?.OtherId?.[0]?.IdNumber ?? "",
        BusinessRegistration: data?.BusinessRegistration?.[0]?.IdNumber ?? "",
        CIN: data?.CIN?.[0]?.IdNumber ?? "",
        TIN: data?.TIN?.[0]?.IdNumber ?? "",
      },
    };
  }
};

const gerRelationPhoneInfo = (data) => {
  let result = {
    Mobile: "",
    Landline: "",
    Fax: "",
    Other: "",
  };
  let reducer = (prev, current) => {
    if (!Array.isArray(prev[current?.typeCode])) {
      prev[current?.typeCode] = [current?.Number];
    } else {
      prev[current?.typeCode]?.push(current?.Number);
    }
    return prev;
  };
  if (Array.isArray(data)) {
    let numbersObj = data.reduce(reducer, {});
    return {
      Mobile: numbersObj["M"]?.join(","),
      Landline: numbersObj["L"]?.join(","),
      Fax: numbersObj["F"]?.join(","),
      Other: numbersObj["O"]?.join(","),
    };
  }
  return result;
};

const getCreditFaciltyDetails = (data) => {
  let result = {
    creditFacilityDetails: [],
  };
  if (Array.isArray(data) && data.length > 0) {
    let obj = data.map((one) => {
      return {
        assetclassification_dayspastdue:
          one?.assetclassification_dayspastdue ?? "",
        accountSeqNo: one?.accountSeqNo ?? "",
        accountNumber: one?.account_number ?? "",
        sanctionDateLoanActivation: one?.sanctiondate_loanactivation ?? "",
        loanExpiryMaturityDate: one?.loan_expiry_maturity_date ?? "",
        currentBalanceLimitUtilizedMarkToMarket:
          one?.current_balance_limit_utilized_marktomarket ?? "",
        creditType: one?.credit_type ?? "",
        dtReportedLst: one?.dt_reported_lst ?? "",
        currencyCode: one?.currency_code ?? "",
        amountOverdueLimitOverdue: one?.amount_overdue_limit_overdue ?? "",
        lastRepaidAmount: one?.last_repaid_amount ?? "",
        highCredit: one?.high_credit ?? "",
        guaranteeCoverage: one?.guarantee_coverage ?? "",
        writtenOffAmount: one?.written_off_amount ?? "",
        loanRenewalDate: one?.loan_renewal_date ?? "",
        drawingPower: one?.drawing_power ?? "",
        settledAmount: one?.settled_amount ?? "",
        sanctionedAmountNotionalAmountOfContract:
          one?.sanctioned_amount_notional_amountofcontract ?? "",
        amountOfContractsClassifiedNPA:
          one?.amount_of_contracts_classified_npa ?? "",
        tenureWeightedAvgMaturityPeriod:
          one?.tenure_weighted_avg_maturityperiod ?? "",
        repaymentFrequency: one?.repayment_frequency ?? "",
        installmentAmount: one?.installment_amount ?? "",
        accountStatus: one?.account_status ?? "",
        accountStatusDate: one?.account_status_dt ?? "",
        suitFiledStatus: one?.suit_filed_status ?? "",
        dateOfSuit: one?.date_of_suit ?? "",
        wilfulDefaultStatus: one?.wilful_default_status ?? "",
        dateClassifiedAsWilfulDefault:
          one?.date_classified_as_wilful_default ?? "",
        majorReasonsForRestructuring:
          one?.major_reasons_for_restructuring ?? "",
        disputeIDNo: one?.dispute_id_no ?? "",
        notionalAmountOutstandingRestructuredContracts:
          one?.notional_amount_outstanding_restructured_contracts ?? "",
        assetBasedSecurityCoverage: one?.asset_based_security_coverage ?? "",
        creditTypeGroup: one?.credit_type_group ?? "",
        memberType: one?.member_type ?? "",
        sectorType: one?.sector_type ?? "",
        memberBranch_cd: one?.member_branch_cd ?? "",
        institution: one?.Institution ?? "",
        ...getHistory48Month(one?.History48Months ?? []),
        ...getDishonouredChequeDetails(one?.DishonouredChequeDetails ?? []),
        ...getSecutitySegment(one?.SecuritySgmnt ?? []),
      };
    });
    return {
      creditFacilityDetails: obj,
    };
  }
  return result;
};

const getHistory48Month = (data) => {
  if (Array.isArray(data) && data.length > 0) {
    let obj = data.map((one) => {
      return {
        yyyymm: one?.yyyymm ?? "",
        overdueBucket: one?.overduebucket ?? "",
        assetClassificationDaysPastDue:
          one?.assetclassification_dayspastdue ?? "",
        suitFiledStatus: one?.suit_filed_status ?? "",
        currentBalanceLimitUtilizedMarktomarket:
          one?.current_balance_limit_utilized_marktomarket ?? "",
        amountOverdueLimitOverdue: one?.amount_overdue_limit_overdue ?? "",
      };
    });
    return {
      history48Months: obj,
    };
  }
  return {
    history48Months: [],
  };
};

const getDishonouredChequeDetails = (data) => {
  let result = {
    dishonouredChequeDetails: [],
  };
  if (Array.isArray(data) && data.length > 0) {
    let obj = data.map((one) => {
      return {
        sequence: one?.Seq ?? "",
        amount: one?.Amount ?? "",
        reasonForDishonour: one?.ReasonForDishonour ?? "",
        numberOfTimesDishonoured: one?.NumberOfTimesDishonoured ?? "",
        dateOfDishonour: one?.DateOfDishonour ?? "",
      };
    });
    return {
      dishonouredChequeDetails: obj,
    };
  }
  return result;
};

const getSecutitySegment = (data) => {
  let result = {
    securitySgmnt: [],
  };
  if (Array.isArray(data) && data.length > 0) {
    let obj = data.map((one) => {
      return {
        valueOfSecurity: one?.value_of_security ?? "",
        currencyType: one?.currency_type ?? "",
        typeOfSecurity: one?.type_of_security ?? "",
        securityClassification: one?.security_classification ?? "",
        dateOfValuation: one?.date_of_valuation ?? "",
      };
    });
  }
  return result;
};

const getEnquiriesDetails = (data) => {
  let result = {
    enquiriesDetails: [],
  };
  if (Array.isArray(data) && data.length > 0) {
    let obj = data.map((one) => {
      return {
        institution: one?.Institution ?? "",
        date: one?.Date ?? "",
        time: one?.Time ?? "",
        requestPurpose: "N/A",
        amount: one?.Amount ?? "",
      };
    });
    return {
      enquiriesDetails: obj,
    };
  }
  return result;
};
