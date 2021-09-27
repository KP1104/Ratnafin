import { mapper } from "../config";

export const transform = ({
  Score,
  InquiryResponseHeader,
  InquiryRequestInfo,
  CCRResponse,
}: any = {}) => {
  let newData = {
    header: {
      clientID: InquiryResponseHeader?.ClientID,
      reportOrderNo: InquiryResponseHeader?.ReportOrderNO,
      reportDate: InquiryResponseHeader?.Date,
      reportTime: InquiryResponseHeader?.Time,
      referenceNumber: InquiryResponseHeader?.CustRefField,
      reportType: "individual",
      copyrightYear: "2021",
    },
    inputEnquiry: {
      inquiryPurpose:
        mapper.EQFX_INQ_PURPOSE[InquiryRequestInfo?.InquiryPurpose] ??
        InquiryRequestInfo?.InquiryPurpose,
      transactionAmount: InquiryRequestInfo?.TransactionAmount ?? "",
      firstName: InquiryRequestInfo?.FirstName ?? "",
      middleName: InquiryRequestInfo?.MiddleName ?? "",
      lastName: InquiryRequestInfo?.LastName ?? "",
      dateOfBirth: InquiryRequestInfo?.DOB ?? "",
      gender: InquiryRequestInfo?.Gender ?? "",
      address: InquiryRequestInfo?.InquiryAddresses ?? "",
      number:
        Array.isArray(InquiryRequestInfo?.InquiryPhones) &&
        InquiryRequestInfo?.InquiryPhones.length > 0
          ? InquiryRequestInfo?.InquiryPhones[0]?.Number ?? ""
          : "",
      email:
        Array.isArray(InquiryRequestInfo?.EmailAddresses) &&
        InquiryRequestInfo?.EmailAddresses.length > 0
          ? InquiryRequestInfo?.EmailAddresses[0]?.Email ?? ""
          : "",
      idAndPhoneDetails: {
        ...getIdAndPhoneDetails(
          InquiryRequestInfo?.IDDetails,
          InquiryRequestInfo?.InquiryPhones
        ),
      },
    },
    ...getEnquirySummary(CCRResponse?.CIRReportDataLst),
    ...getCustomer(CCRResponse?.CIRReportDataLst),
    ...getAccountDetails(CCRResponse?.CIRReportDataLst),
  };
  console.log("generated:", newData);
  return newData;
};

const getIdValues = (IDDetails) => {
  let result = {
    pan: "",
    voterID: "",
    passportID: "",
    uid: "",
    driverLicense: "",
  };
  if (Array.isArray(IDDetails)) {
    let obj = IDDetails.map((one) => {
      if (one.IDType === "T") {
        return { pan: one.IDValue };
      } else if (one.IDType === "V") {
        return { voterID: one.IDValue };
      } else if (one.IDType === "P") {
        return { passportID: one.IDValue };
      } else if (one.IDType === "M") {
        return { uid: one.IDValue };
      } else if (one.IDType === "D") {
        return { driverLicense: one.IDValue };
      }
    });
    result = {
      pan: obj?.[0]?.pan ?? "",
      voterID: obj?.[1]?.voterID ?? "",
      driverLicense: obj?.[2]?.driverLicense ?? "",
      uid: obj?.[3]?.uid ?? "",
      passportID: obj?.[4]?.passportID ?? "",
    };
  }
  return result;
};

const getIdAndPhoneDetails = (IDDetails, PhoneDetails) => {
  let obj = {},
    idObj = getIdValues(IDDetails),
    phoneObj = getInquiryPhones(PhoneDetails);
  obj = {
    ...idObj,
    ...phoneObj,
  };
  return obj;
};
const getInquiryPhones = (data) => {
  let result = {
    homePhone: "",
    mobilePhone: "",
  };
  let reducer = (prev, current) => {
    if (!Array.isArray(prev[current?.PhoneType])) {
      prev[current?.PhoneType?.[0]] = [current?.Number];
    } else {
      prev[current?.PhoneType?.[0]]?.push(current?.Number);
    }
    return prev;
  };
  if (Array.isArray(data)) {
    let numbersObj = data.reduce(reducer, {});
    return {
      homePhone: numbersObj["H"]?.join(", ") ?? "",
      mobilePhone: numbersObj["M"]?.join(", ") ?? "",
    };
  }
  return result;
};

const getEnquirySummary = (data) => {
  let result = {};
  if (Array.isArray(data) && data.length > 0) {
    result = {
      purpose:
        mapper.EQFX_INQ_PURPOSE[
          data[0]?.CIRReportData?.EnquirySummary?.Purpose
        ] ?? data[0]?.CIRReportData?.EnquirySummary?.Purpose,
      total: data[0]?.CIRReportData?.EnquirySummary?.Total,
      past30Days: data[0]?.CIRReportData?.EnquirySummary?.Past30Days,
      past12Months: data[0]?.CIRReportData?.EnquirySummary?.Past12Months ?? "",
      past24Months: data[0]?.CIRReportData?.EnquirySummary?.Past24Months ?? "",
      recent: data[0]?.CIRReportData?.EnquirySummary?.Recent ?? "",
      enquiries: data[0]?.CIRReportData.Enquiries.map((one) => ({
        institution: one?.Institution,
        date: one?.Date,
        time: one?.Time,
        requestPurpose:
          mapper.EQFX_INQ_PURPOSE[one?.RequestPurpose] ?? one?.RequestPurpose,
        amount: one?.Amount,
      })),
    };
    return { enquirySummary: result };
  }
};

const getCustomer = (data) => {
  let result = {};
  if (Array.isArray(data) && data.length > 0) {
    result = {
      fullName:
        data[0]?.CIRReportData?.IDAndContactInfo?.PersonalInfo?.Name
          ?.FullName ?? "",
      dob:
        data[0]?.CIRReportData?.IDAndContactInfo?.PersonalInfo?.DateOfBirth ??
        "",
      age:
        data[0]?.CIRReportData?.IDAndContactInfo?.PersonalInfo?.Age?.Age ?? "",
      gender:
        data[0]?.CIRReportData?.IDAndContactInfo?.PersonalInfo?.Gender ?? "",
      totalIncome:
        data[0]?.CIRReportData?.IDAndContactInfo?.PersonalInfo?.TotalIncome ??
        "",
      occupation:
        data[0]?.CIRReportData?.IDAndContactInfo?.PersonalInfo?.Occupation ??
        "",
      panID:
        data[0]?.CIRReportData?.IDAndContactInfo?.IdentityInfo?.PANId?.[0]
          ?.IdNumber ?? "",
      voterID:
        data[0]?.CIRReportData?.IDAndContactInfo?.IdentityInfo?.VoterID?.[0]
          ?.IdNumber ?? "",
      nationalIDCard:
        data[0]?.CIRReportData?.IDAndContactInfo?.IdentityInfo
          ?.NationalIDCard?.[0]?.IdNumber ?? "",
      ...getPhoneInfo(data[0]?.CIRReportData?.IDAndContactInfo?.PhoneInfo),
      email:
        data[0]?.CIRReportData?.IDAndContactInfo?.EmailAddressInfo?.[0]
          ?.EmailAddress,
      ...getAddressInfo(data[0]?.CIRReportData?.IDAndContactInfo?.AddressInfo),
      recentActivities: {
        accountsDeliquent:
          data[0]?.CIRReportData?.RecentActivities?.AccountsDeliquent ?? "",
        accountsOpened:
          data[0]?.CIRReportData?.RecentActivities?.AccountsOpened ?? "",
        totalInquiries:
          data[0]?.CIRReportData?.RecentActivities?.TotalInquiries ?? "",
        accountsUpdated:
          data[0]?.CIRReportData?.RecentActivities?.AccountsUpdated ?? "",
      },
      score: {
        scoreName: data[0]?.CIRReportData?.ScoreDetails?.[0]?.Name ?? "",
        scoreValue: data[0]?.CIRReportData?.ScoreDetails?.[0]?.Value ?? "",
        scoreDescription: getScoreDescription(
          data[0]?.CIRReportData?.ScoreDetails?.[0]?.Value
        ),
      },
      purpose:
        mapper.EQFX_INQ_PURPOSE[
          data[0]?.CIRReportData?.IDAndContactInfo?.Purpose
        ] ?? data[0]?.CIRReportData?.IDAndContactInfo?.Purpose,
      total: data[0]?.CIRReportData?.EnquirySummary?.Total,
      past30Days: data[0]?.CIRReportData?.EnquirySummary?.Past30Days,
      past12Months: data[0]?.CIRReportData?.EnquirySummary?.Past12Months ?? "",
      past24Months: data[0]?.CIRReportData?.EnquirySummary?.Past24Months ?? "",
      recent: data[0]?.CIRReportData?.EnquirySummary?.Recent ?? "",
      enquiries: data[0]?.CIRReportData.Enquiries.map((one) => ({
        institution: one?.Institution,
        date: one?.Date,
        time: one?.Time,
        requestPurpose:
          mapper.EQFX_INQ_PURPOSE[one?.RequestPurpose] ?? one?.RequestPurpose,
        amount: one?.Amount,
      })),
    };
    return { customer: result };
  }
};

const getAccountDetails = (data) => {
  let result = {
    account: {},
  };
  if (Array.isArray(data) && data.length > 0) {
    result = {
      account: {
        accountDetails: data[0].CIRReportData?.RetailAccountDetails,

        noOfAccounts:
          data[0].CIRReportData?.RetailAccountsSummary?.NoOfAccounts ?? "",
        noOfActiveAccounts:
          data[0].CIRReportData?.RetailAccountsSummary?.NoOfActiveAccounts ??
          "",
        noOfWriteOffs:
          data[0].CIRReportData?.RetailAccountsSummary?.NoOfWriteOffs ?? "",
        totalPastDue:
          data[0].CIRReportData?.RetailAccountsSummary?.TotalPastDue ?? "",
        singleHighestCredit:
          data[0].CIRReportData?.RetailAccountsSummary?.SingleHighestCredit ??
          "",
        singleHighestSanctionAmount:
          data[0].CIRReportData?.RetailAccountsSummary
            ?.SingleHighestSanctionAmount ?? "",
        totalHighCredit:
          data[0].CIRReportData?.RetailAccountsSummary?.TotalHighCredit ?? "",
        averageOpenBalance:
          data[0].CIRReportData?.RetailAccountsSummary?.AverageOpenBalance ??
          "",
        singleHighestBalance:
          data[0].CIRReportData?.RetailAccountsSummary?.SingleHighestBalance ??
          "",
        noOfPastDueAccounts:
          data[0].CIRReportData?.RetailAccountsSummary?.NoOfPastDueAccounts ??
          "",
        noOfZeroBalanceAccounts:
          data[0].CIRReportData?.RetailAccountsSummary
            ?.NoOfZeroBalanceAccounts ?? "",
        recentAccount:
          data[0].CIRReportData?.RetailAccountsSummary?.RecentAccount ?? "",
        oldestAccount:
          data[0].CIRReportData?.RetailAccountsSummary?.OldestAccount ?? "",
        totalBalanceAmount:
          data[0].CIRReportData?.RetailAccountsSummary?.TotalBalanceAmount ??
          "",
        totalSanctionAmount:
          data[0].CIRReportData?.RetailAccountsSummary?.TotalSanctionAmount ??
          "",
        totalCreditLimit:
          data[0].CIRReportData?.RetailAccountsSummary?.TotalCreditLimit ?? "",
        totalMonthlyPaymentAmount:
          data[0].CIRReportData?.RetailAccountsSummary
            ?.TotalMonthlyPaymentAmount ?? "",
        mostSevereStatusWithIn24Months:
          data[0].CIRReportData?.RetailAccountsSummary
            ?.MostSevereStatusWithIn24Months ?? "",
      },
    };
    return result;
  }
  return result;
};

const getPhoneInfo = (data) => {
  let result = {
    homePhone: "",
    officePhone: "",
    mobilePhone: "",
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
      homePhone: numbersObj["H"]?.join(", "),
      officePhone: numbersObj["T"]?.join(", "),
      mobilePhone: numbersObj["M"]?.join(", "),
    };
  }
  return result;
};

const getAddressInfo = (data) => {
  let result = {
    addressInfo: [],
  };
  if (Array.isArray(data) && data.length > 0) {
    let array = data.map((one) => {
      return {
        type: mapper.ADDRESS_TYPE[one?.Type] ?? one?.Type,
        address: one?.Address ?? "",
        state: one?.State ?? "",
        postal: one?.Postal ?? "",
        reportedDate: one?.ReportedDate ?? "",
      };
    });
    return { addressInfo: array };
  }
  return result;
};

const getScoreDescription = (data) => {
  let scoreDescription = "";
  if (data >= 750) {
    scoreDescription = "Excellent";
  } else if (data <= 550) {
    scoreDescription = "Bad";
  } else if (data >= 700 || data <= 749) {
    scoreDescription = "Good";
  } else if (data >= 650 || data <= 699) {
    scoreDescription = "Fair";
  } else if (data >= 649 || data <= 550) {
    scoreDescription = "Poor";
  }
  return scoreDescription;
};
