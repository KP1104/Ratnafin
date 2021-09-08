import equifaxLogo from "assets/images/equifaxLogo.png";

export const Header = ({ header }) => {
  return (
    <div className="header-top">
      <div className="logo">
        <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAyMDguMTQgMTM2LjciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIwOC4xNCAxMzYuNzsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxMjAiIGhlaWdodD0iNzciPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6IzEwQjE1ODt9DQoJLnN0MXtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiMwNDZFQjY7fQ0KCS5zdDJ7ZmlsbDpub25lO3N0cm9rZTojMDQ2RUI2O3N0cm9rZS13aWR0aDoxLjI1NTk7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQ0KCS5zdDN7ZmlsbDojMDQ2RUI2O30NCgkuc3Q0e2ZpbGw6IzI2QjI1ODt9DQoJLnN0NXtmb250LWZhbWlseTonTW9udHNlcnJhdC1Cb2xkJzt9DQoJLnN0Nntmb250LXNpemU6OC4xNjg5cHg7fQ0KPC9zdHlsZT4NCjxnPg0KCTxnPg0KCQk8Zz4NCgkJCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iOTUuOTIsMjQuODggMTI4LjYyLDI0Ljg4IDEyOC42MiwxMy44MSA5NS45MiwxMy44MSA5NS45MiwyNC44OCAJCQkiLz4NCgkJCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMTA3LjQsNDQuMjMgMTI4LjYyLDQ0LjIzIDEyOC42MiwzMy4xMiAxMDcuNCwzMy4xMiAxMDcuNCw0NC4yMyAJCQkiLz4NCgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMTguNyw2My43OWwtMTAuNTgtMTguMTJjMy41OS0zLjM0LDUuOTItOC4xMyw1LjkyLTEzLjQ2YzAtMTAuMTMtOC4yNS0xOC4zOS0xOC4zNy0xOC4zOUg3OC42NHYxMS4wNw0KCQkJCWM3LjIyLDAsMTAuMTUsMCwxNy4yMywwYzMuOTksMCw3LjE5LDMuMTksNy4xOSw3LjE5YzAsNC0zLjIsNy4xMy03LjE5LDcuMTNoLTYuMTl2MTEuMzJoNi4xOWw3LjcyLDEzLjI3SDExOC43TDExOC43LDYzLjc5eiIvPg0KCQk8L2c+DQoJCTxyZWN0IHg9IjcwLjc1IiB5PSI1LjkyIiBjbGFzcz0ic3QyIiB3aWR0aD0iNjUuNzYiIGhlaWdodD0iNjUuNzYiLz4NCgk8L2c+DQoJPGc+DQoJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yMS44MywxMTAuMjVsLTQuMjgtNi4xOEgxNy4zaC00LjQ3djYuMThINy43Vjg4LjA4aDkuNmMxLjk2LDAsMy42NywwLjMzLDUuMTIsMC45OA0KCQkJYzEuNDUsMC42NSwyLjU2LDEuNTgsMy4zNCwyLjc5YzAuNzgsMS4yLDEuMTcsMi42MywxLjE3LDQuMjhjMCwxLjY1LTAuNCwzLjA3LTEuMTksNC4yNmMtMC43OSwxLjE5LTEuOTIsMi4xMS0zLjM3LDIuNzQNCgkJCWw0Ljk3LDcuMTNIMjEuODN6IE0yMC41Myw5My4yNmMtMC44LTAuNjctMS45OC0xLTMuNTItMWgtNC4xOHY3LjczaDQuMThjMS41NCwwLDIuNzEtMC4zNCwzLjUyLTEuMDFjMC44LTAuNjcsMS4yLTEuNjMsMS4yLTIuODUNCgkJCUMyMS43NCw5NC44OCwyMS4zNCw5My45MiwyMC41Myw5My4yNnoiLz4NCgkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTQ1LjU5LDEwNS41SDM1LjNsLTEuOTYsNC43NWgtNS4yNmw5Ljg4LTIyLjE3aDUuMDdsOS45MiwyMi4xN2gtNS4zOUw0NS41OSwxMDUuNXogTTQzLjk4LDEwMS42bC0zLjUyLTguNDkNCgkJCWwtMy41Miw4LjQ5SDQzLjk4eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNNTguNzQsOTIuMjZoLTcuMXYtNC4xOGgxOS4zMnY0LjE4aC03LjF2MTcuOTloLTUuMTNWOTIuMjZ6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik05NC4wNiw4OC4wOHYyMi4xN2gtNC4yMUw3OC43OSw5Ni43OXYxMy40NmgtNS4wN1Y4OC4wOGg0LjI1bDExLjAyLDEzLjQ2Vjg4LjA4SDk0LjA2eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMTEzLjkyLDEwNS41aC0xMC4zbC0xLjk2LDQuNzVIOTYuNGw5Ljg4LTIyLjE3aDUuMDdsOS45MiwyMi4xN2gtNS4zOUwxMTMuOTIsMTA1LjV6IE0xMTIuMzEsMTAxLjYNCgkJCWwtMy41Mi04LjQ5bC0zLjUyLDguNDlIMTEyLjMxeiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMTM4LjkyLDEwNS41aC0xMC4zbC0xLjk2LDQuNzVoLTUuMjZsOS44OC0yMi4xN2g1LjA3bDkuOTIsMjIuMTdoLTUuMzlMMTM4LjkyLDEwNS41eiBNMTM3LjMsMTAxLjYNCgkJCWwtMy41Mi04LjQ5bC0zLjUyLDguNDlIMTM3LjN6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xNTMuNzEsOTIuMnY1Ljg2aDEwLjI2djQuMTJoLTEwLjI2djguMDhoLTUuMTNWODguMDhoMTYuNzZ2NC4xMkgxNTMuNzF6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xNjguODIsODguMDhoNS4xM3YyMi4xN2gtNS4xM1Y4OC4wOHoiLz4NCgkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTE5OS41NSw4OC4wOHYyMi4xN2gtNC4yMWwtMTEuMDYtMTMuNDZ2MTMuNDZoLTUuMDdWODguMDhoNC4yNWwxMS4wMiwxMy40NlY4OC4wOEgxOTkuNTV6Ii8+DQoJPC9nPg0KCTxnPg0KCQk8dGV4dCB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDYuNTg2IDEyOC45NDQzKSIgY2xhc3M9InN0NCBzdDUgc3Q2Ij5BZHZpc2luZzwvdGV4dD4NCgkJPHRleHQgdHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgMSA1Ny44NjQzIDEyOC45NjE0KSIgY2xhc3M9InN0NCBzdDUgc3Q2Ij5JbnN1cmFuY2UgQnJva2luZzwvdGV4dD4NCgkJPHRleHQgdHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgMSAxNjEuMzk3NSAxMjguOTQzOCkiIGNsYXNzPSJzdDQgc3Q1IHN0NiI+TGVuZGluZzwvdGV4dD4NCgkJPGNpcmNsZSBjbGFzcz0ic3Q0IiBjeD0iNTMuMTciIGN5PSIxMjYuMzMiIHI9IjEuMDkiLz4NCgkJPGNpcmNsZSBjbGFzcz0ic3Q0IiBjeD0iMTU3LjA3IiBjeT0iMTI2LjMzIiByPSIxLjA5Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=" />
      </div>
      <div className="equifax-logo">
        <img src={equifaxLogo} />
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
          </li>
        </ul>
      </div>
    </div>
  );
};
