export const GuarantorEntities = ({ count }) => {
  return (
    <>
      <h2>
        <strong>7.1.{count}.2</strong>Guarantors(Entities)
      </h2>
      <table className="table borrower-table-sec">
        <tbody>
          <tr>
            <td
              colSpan={15}
              style={{
                padding: 0,
                //@ts-ignore
                textAlign: "center !important",
              }}
            >
              No Entity Guarantors
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
