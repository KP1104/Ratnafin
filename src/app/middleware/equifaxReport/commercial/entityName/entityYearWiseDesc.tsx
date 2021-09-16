export const EntityYearWiseDesc = ({ severityGrid }) => {
  return (
    <div className="top-middle-part">
      {typeof severityGrid === "object" && Boolean(severityGrid)
        ? Object.keys(severityGrid).map((key, i) => {
            return (
              <ul>
                <h2>FY{key}</h2>
                <table className="table">
                  <tbody>
                    <tr>
                      <DisplayColor
                        value={severityGrid[key]?.overdueGreaterThan_0}
                        label="Overdue &gt; 0"
                      />
                      <DisplayColor
                        value={severityGrid[key]?.DPD_1_90}
                        label="1-90 DPD"
                      />
                      <DisplayColor
                        value={severityGrid[key]?.SMA_0_1_2}
                        label="SMA 0/1/2"
                      />
                    </tr>
                    <tr>
                      <DisplayColor
                        value={
                          severityGrid[key]?.SubStd_Restr_DBT_Loss_NPA_90PLUS
                        }
                        label="SUB/RES/DBT /Loss/NPA/ 90+"
                      />
                      <DisplayColor
                        value={
                          severityGrid[key]
                            ?.Invoked_Devolved_Dishonoured_Coff_Settled_Suitfiled
                        }
                        label="Invoked / Devolved /Dishonoured CHQ / CHG-off / SET /
                        Suit filed"
                      />
                      <DisplayColor
                        value={severityGrid[key]?.WilfulDefault}
                        label="Wilful Default"
                      />
                    </tr>
                  </tbody>
                </table>
              </ul>
            );
          })
        : null}
    </div>
  );
};

const DisplayColor = ({ label, value }) => {
  return (
    <>
      {Boolean(value) ? (
        <td
          style={{
            backgroundColor: "#FF0000",
            WebkitPrintColorAdjust: "exact",
          }}
        >
          {label}
        </td>
      ) : (
        <td>{label}</td>
      )}
    </>
  );
};
