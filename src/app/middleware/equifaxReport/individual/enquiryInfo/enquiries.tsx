export const Enquiries = ({ enquiriesDetails }) => {
  return (
    <div className="enquiry-sec">
      <h2>Enquiries:</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Institution</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Purpose</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {enquiriesDetails?.map((enquiries) => {
            return (
              <tr>
                <td>{enquiries?.institution}</td>
                <td>{enquiries?.date}</td>
                <td>{enquiries?.time}</td>
                <td>{enquiries?.requestPurpose}</td>
                <td>Rs.{enquiries?.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
