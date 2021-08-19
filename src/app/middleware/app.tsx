import { lazy } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Routes, Route } from "react-router";
import { QueryClientProvider } from "react-query";
import { queryClient } from "cache";
import { MiddlewareSDK } from "registry/fns/middleware";

const CAMMiddlewareWrapper = lazy(() =>
  import("./camWrapper").then((module) => ({
    default: module.CAMMiddlewareWrapper,
  }))
);

const Mandate = lazy(() =>
  import("./mandate/").then((module) => ({
    default: module.Mandate,
  }))
);

const Credit = lazy(() => import("./creditReport"));

MiddlewareSDK.inititateAPI(
  `${new URL("./middleware/", process.env.REACT_APP_API_URL).href}` ?? ""
);
MiddlewareSDK.setToken("r6ENdp/FRIDHaJ1rE7doilf/SJ1sCQE0VcVa+nuN+QI=");

const themeObj = createMuiTheme();

export const App = () => {
  return (
    <ThemeProvider theme={themeObj}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/lead/:refID" element={<CAMMiddlewareWrapper />} />
          <Route path="/mandate" element={<Mandate />} />
          <Route path="/credit" element={<Credit />} />
        </Routes>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
