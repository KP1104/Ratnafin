import logo from "assets/images/logo.svg";
import equifaxLogo from "assets/images/equifaxLogo.png";

export const Header = ({ header }) => {
  return (
    <div className="header-top">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="equifax-logo">
        <img src={equifaxLogo} alt="" />
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
            <strong>Member Name (Client ID):</strong>
            {header?.clientID}
          </li>
          <li>
            <strong>Report Order No:</strong>
            {header?.reportOrderNo}
          </li>
          <li>
            <strong>Reference Number:</strong>
            {header?.referenceNumber}
          </li>
        </ul>
        <ul>
          <li>
            <strong>DATE:</strong>
            {header?.reportDate}
          </li>
          <li>
            <strong>TIME:</strong>
            {header?.reportTime}
          </li>
          <li>
            <strong>Tran ID:</strong>
            {header?.tranID}
          </li>
        </ul>
      </div>
    </div>
  );
};
