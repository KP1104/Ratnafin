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
                      <td>{severityGrid[key]?.overdueGreaterThan_0}</td>
                      <td>{severityGrid[key]?.DPD_1_90}</td>
                      <td>SMA 0/1/2</td>
                    </tr>
                    <tr>
                      <td>SUB/RES/DBT /Loss/NPA/ 90+</td>
                      <td>
                        Invoked / Devolved /Dishonoured CHQ / CHG-off / SET /
                        Suit filed
                      </td>
                      <td>Wilful Default</td>
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
