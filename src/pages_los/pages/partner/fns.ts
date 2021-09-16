import { LOSSDK } from "registry/fns/los";

export const becomePartner = (_, dependentValues) => {
  if (dependentValues?.partnerType?.value === "C") {
    return false;
  }
  return true;
};
export const becomePartnerIndividual = (_, dependentValues) => {
  if (dependentValues?.partnerType?.value === "I") {
    return false;
  }
  return true;
};
export const becomePartnerNominee = (_, dependentValues) => {
  if (
    dependentValues?.nomineeFlag?.value === "Y" &&
    dependentValues?.partnerType?.value === "I"
  ) {
    return false;
  }
  return true;
};

export const getCompanyNameFromGST = async (currentField) => {
  const { status, data } = await LOSSDK.internalFetcher(
    "./partner/external/gst/fetch/company-name",
    {
      method: "POST",
      body: JSON.stringify({
        request_data: {
          gstNumber: currentField?.value ?? "INVALID_GST",
        },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    let legalEntityName = data?.response_data?.companyName;
    return legalEntityName;
  } else {
    throw new Error(data?.error_data?.error_msg);
  }
};

export const getGSTCompanyNameDtl = (getGSTCompanyName) => async (
  fieldData
) => {
  let codes = await getGSTCompanyName(fieldData);
  return {
    legalEntityName: {
      value: codes,
    },
  };
};

export const getCompanyNameGST = getGSTCompanyNameDtl(getCompanyNameFromGST);
