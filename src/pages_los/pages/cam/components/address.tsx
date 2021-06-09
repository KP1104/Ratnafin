import { Default } from "pages_los/pages/cam/components";
export const Address = ({ value }) => {
  if (!Array.isArray(value) || value.length <= 0) {
    return (
      <>
        <tr>
          <Default
            className="form-sub-heading"
            colspan={9}
            element="th"
            value="Address Details"
            align="center"
          />
        </tr>
        <tr>
          <Default colspan={9} value="Not Available" align="center" />
        </tr>
      </>
    );
  }

  let addressArray: any = [];
  addressArray = value.map((addressData) => {
    return [
      addressData?.address1 ?? addressData?.addressLine1 ?? "",
      addressData.address2 ?? addressData?.addressLine2 ?? "",
      addressData?.landmark ?? "",
      addressData?.location ?? "",
      addressData?.district ?? "",
      addressData?.city ?? "",
      addressData?.state ?? "",
      addressData?.country ?? "",
      addressData?.pincode ?? "",
    ];
  });

  let addressType: any = [];
  addressType = value.map((data) => {
    return data.addressType;
  });

  var addressFinalDetails: any = [];
  addressFinalDetails = addressArray.map((data: any) => {
    return data.filter((item) => (item !== "" ? true : false)).join(", ");
  });

  return (
    <>
      <tr>
        <Default
          className="form-sub-heading"
          colspan={9}
          element="th"
          value=" Address Details"
          align="center"
        />
      </tr>
      {addressFinalDetails.map((addressData, index) => {
        return (
          <tr>
            <th colSpan={2}>
              {addressData?.index?.addressType ??
                addressType[index] ??
                "No Address Type"}{" "}
              Address
            </th>
            <td colSpan={7}>{addressData}</td>
          </tr>
        );
      })}
    </>
  );
};
