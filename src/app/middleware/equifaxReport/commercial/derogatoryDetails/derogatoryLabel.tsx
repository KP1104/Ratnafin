export const DerogatoryLabel = () => {
  return (
    <tr>
      <th scope="col">
        <span className="heading-color">Derogatory Status-&gt;</span>
      </th>
      <th scope="col" style={{ textAlign: "center" }}>
        <span className="heading-color">Sanctioned Amount</span>
      </th>
      <th scope="col">
        <span className="heading-color">Willful Defaults</span>
      </th>
      <th scope="col">
        <span className="heading-color">Suit Filed</span>
      </th>
      <th scope="col">
        <span className="heading-color">Write-offs + Settled</span>
      </th>
      <th scope="col">
        <span className="heading-color">Invoked/Devolved</span>
      </th>
      <th scope="col">
        <span className="heading-color">Dishonored Cheque</span>
      </th>
    </tr>
  );
};

export const DerogatoryDetails = ({ derogatoryDetails }) => {
  return (
    <>
      {derogatoryDetails?.map((data) => (
        <tr>
          <td>{data?.source}</td>
          <td>{data?.Sanctioned_Amt}</td>
          <td>{data?.WilfulDefaults_Instance}</td>
          <td>{data?.Suitfiled_Instance}</td>
          <td>{data?.WriteOffs_Settled_Instance}</td>
          <td>{data?.Invoked_Devolved_Instance}</td>
          <td>{data?.DishonoredCheque_Instance}</td>
        </tr>
      ))}
    </>
  );
};
