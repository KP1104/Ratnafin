import logo from "assets/images/logo.svg";

export const Header = () => {
  return (
    <div className="header-top">
      <div className="logo">
        <img src={logo} />
      </div>
      <h1>PRESCREEN CREDIT SCORE</h1>
      <div className="top-sec">
        <ul>
          <li>
            <b>COMMERCIAL REPORT</b>
          </li>
        </ul>
        <ul>
          <li>
            <strong>Member Name (Client ID):</strong>999AA00007
          </li>
          <li>
            <strong>Report Order No:</strong>332750859
          </li>
          <li>
            <strong>Reference Number:</strong>
          </li>
        </ul>
        <ul>
          <li>
            <strong>DATE:</strong>18-07-2017
          </li>
          <li>
            <strong>TIME:</strong>13:44:41
          </li>
          <li>
            <strong>Tran ID:</strong>271211
          </li>
        </ul>
      </div>
    </div>
  );
};
