import { Fragment } from "react";

export const CreditTypeSummary = ({ label, sequence, onData, offData }) => {
  return (
    <Fragment>
      <table
        className="table borrower-table-sec"
        style={{ marginBottom: 0, fontSize: "12px" }}
      >
        <tbody>
          <tr>
            <th colSpan={12}>
              <h2>
                <strong>{sequence} </strong>
                {label}
                <span style={{ float: "right" }}>
                  (All amounts mentioned are in INR)
                </span>
              </h2>
            </th>
          </tr>

          <tr>
            <th scope="col" style={{ width: "17.7%" }}>
              <span className="heading-color">&nbsp;</span>
            </th>
            <th scope="col" style={{ textAlign: "center", width: "40%" }}>
              <span className="heading-color">On Member</span>
            </th>
            <th scope="col" style={{ textAlign: "center", width: "40%" }}>
              <span className="heading-color">Off Member</span>
            </th>
          </tr>
          <tr>
            <td colSpan={15} style={{ padding: 0 }}>
              <table
                className="table borrower-table-one"
                style={{ marginBottom: 0 }}
              >
                <tbody>
                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td colSpan={3}>
                      <b style={{ fontWeight: "normal", float: "right" }}>
                        CF Group-&gt;
                      </b>{" "}
                      <br />
                      Asset Class
                    </td>
                    <td>WC</td>
                    <td>NF</td>
                    <td>TL</td>
                    <td>Fx</td>
                    <td>Other</td>
                    <td>Total</td>
                    <td>WC</td>
                    <td>NF</td>
                    <td>TL</td>
                    <td>Fx</td>
                    <td>Other</td>
                    <td>Total</td>
                  </tr>
                  <RenderRows
                    key="STD"
                    groups={[
                      "DPD 0",
                      "DPD 1–30",
                      "DPD 31-60",
                      "DPD 61–90",
                      "SMA 0",
                      "SMA 1",
                      "SMA 2",
                      "OVERDUE",
                    ]}
                    assetClassName="STD"
                    onData={onData}
                    offData={offData}
                  />
                  <RenderRows
                    key="NONSTD"
                    groups={[
                      "DPD 91-180",
                      "DPD > 180",
                      "SUB",
                      "RES",
                      "NPA",
                      "DBT",
                      "LOSS",
                    ]}
                    assetClassName="NONSTD"
                    onData={onData}
                    offData={offData}
                  />
                  <RenderRows
                    key="CLOSED"
                    groups={["CLOSED"]}
                    assetClassName="CLOSED"
                    onData={onData}
                    offData={offData}
                  />
                  <RenderRows
                    key="OTHERS"
                    groups={["OTHERS"]}
                    assetClassName="OTHERS"
                    onData={onData}
                    offData={offData}
                  />
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

const RenderRows = ({ groups = [], assetClassName, onData, offData }: any) => {
  let FirstCFRowX =
    assetClassName === "CLOSED" || assetClassName === "OTHERS"
      ? FirstCFRow2
      : FirstCFRow;
  let renderedGroups = groups.map((group, index) => {
    let result: JSX.Element | null = null;
    if (index === 0) {
      result = (
        <Fragment>
          <FirstCFRowX
            assetClassName={assetClassName}
            groupName={group}
            onData={onData?.[assetClassName]}
            offData={offData?.[assetClassName]}
            rowSpan={groups.length * 2}
          />
          <AmountRow
            groupName="DPD 0"
            onData={onData?.[assetClassName]}
            offData={offData?.[assetClassName]}
          />
        </Fragment>
      );
    } else {
      result = (
        <Fragment>
          <CFRow
            groupName={group}
            onData={onData?.[assetClassName]}
            offData={offData?.[assetClassName]}
          />
          <AmountRow
            groupName="DPD 0"
            onData={onData?.[assetClassName]}
            offData={offData?.[assetClassName]}
          />
        </Fragment>
      );
    }
    return result;
  });
  return <Fragment>{renderedGroups}</Fragment>;
};

const FirstCFRow = ({
  assetClassName,
  groupName,
  onData,
  offData,
  rowSpan,
}) => {
  return (
    <tr style={{ borderBottom: "1px solid #dee2e6" }}>
      <td rowSpan={rowSpan}>{assetClassName}</td>
      <td rowSpan={2}>{groupName}</td>
      <td>CF(#)</td>
      <td>{onData?.[groupName]?.WC_CFCount ?? "-"}</td>
      <td>{onData?.[groupName]?.NF_CFCount ?? "-"}</td>
      <td>{onData?.[groupName]?.TL_CFCount ?? "-"}</td>
      <td>{onData?.[groupName]?.FX_CFCount ?? "-"}</td>
      <td>{onData?.[groupName]?.Other_CFCount ?? "-"}</td>
      <td>{onData?.[groupName]?.Total_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.WC_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.NF_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.TL_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.FX_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.Other_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.Total_CFCount ?? "-"}</td>
    </tr>
  );
};

const FirstCFRow2 = ({ assetClassName, groupName, onData, offData }) => {
  return (
    <tr style={{ borderBottom: "1px solid #dee2e6" }}>
      <td rowSpan={2} colSpan={2}>
        {assetClassName}
      </td>
      <td>CF(#)</td>
      <td>{onData?.[groupName]?.WC_CFCount ?? "-"}</td>
      <td>{onData?.[groupName]?.NF_CFCount ?? "-"}</td>
      <td>{onData?.[groupName]?.TL_CFCount ?? "-"}</td>
      <td>{onData?.[groupName]?.FX_CFCount ?? "-"}</td>
      <td>{onData?.[groupName]?.Other_CFCount ?? "-"}</td>
      <td>{onData?.[groupName]?.Total_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.WC_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.NF_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.TL_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.FX_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.Other_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.Total_CFCount ?? "-"}</td>
    </tr>
  );
};

const CFRow = ({ groupName, onData, offData }) => {
  return (
    <tr style={{ borderBottom: "1px solid #dee2e6" }}>
      <td rowSpan={2}>{groupName}</td>
      <td>CF(#)</td>
      <td>{onData?.[groupName]?.WC_CFCount ?? "-"}</td>
      <td>{onData?.[groupName]?.NF_CFCount ?? "-"}</td>
      <td>{onData?.[groupName]?.TL_CFCount ?? "-"}</td>
      <td>{onData?.[groupName]?.FX_CFCount ?? "-"}</td>
      <td>{onData?.[groupName]?.Other_CFCount ?? "-"}</td>
      <td>{onData?.[groupName]?.Total_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.WC_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.NF_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.TL_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.FX_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.Other_CFCount ?? "-"}</td>
      <td>{offData?.[groupName]?.Total_CFCount ?? "-"}</td>
    </tr>
  );
};

const AmountRow = ({ groupName, onData, offData }) => {
  return (
    <tr style={{ borderBottom: "1px solid #dee2e6" }}>
      <td>Amount</td>
      <td>{onData?.[groupName]?.WC_Amt ?? "-"}</td>
      <td>{onData?.[groupName]?.NF_Amt ?? "-"}</td>
      <td>{onData?.[groupName]?.TL_Amt ?? "-"}</td>
      <td>{onData?.[groupName]?.FX_Amt ?? "-"}</td>
      <td>{onData?.[groupName]?.Other_Amt ?? "-"}</td>
      <td>{onData?.[groupName]?.Total_Amt ?? "-"}</td>
      <td>{offData?.[groupName]?.WC_Amt ?? "-"}</td>
      <td>{offData?.[groupName]?.NF_Amt ?? "-"}</td>
      <td>{offData?.[groupName]?.TL_Amt ?? "-"}</td>
      <td>{offData?.[groupName]?.FX_Amt ?? "-"}</td>
      <td>{offData?.[groupName]?.Other_Amt ?? "-"}</td>
      <td>{offData?.[groupName]?.Total_Amt ?? "-"}</td>
    </tr>
  );
};
