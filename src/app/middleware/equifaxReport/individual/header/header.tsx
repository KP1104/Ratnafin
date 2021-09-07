import logo from "assets/images/logo.svg";
import equifax from "assets/images/equifax.png";

export const Header = ({ headerDetails }) => {
  return (
    <div className="header-top">
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="equifax-logo">
        <img src={equifax} />
      </div>
      <h1>PRESCREEN CREDIT SCORE</h1>
      <div className="top-sec">
        <ul>
          <li>
            <strong>CLIENT ID:</strong>
            {headerDetails?.clientID}
          </li>
          <li>
            <strong>REPORT ORDER NO.:</strong>
            {headerDetails?.reportOrderNo}
          </li>
          <li>
            <strong>REFERENCE NUMBER:</strong>
          </li>
        </ul>
        <ul>
          <li>
            <strong>DATE:</strong>
            {headerDetails?.reportDate}
          </li>
          <li>
            <strong>TIME:</strong>
            {headerDetails?.reportTime}
          </li>
        </ul>
      </div>
    </div>
  );
};
