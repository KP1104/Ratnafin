import "regenerator-runtime";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Routes, Route, HashRouter } from "react-router-dom";
import "typeface-roboto";
import "registry"; //register functions to be used across application
import Middleware from "app/middleware";

const App = () => (
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/middleware/*" element={<Middleware />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);

ReactDOM.render(<App />, document.getElementById("root"));
