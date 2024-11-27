import routes from "@constants/routes";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignInPage from "@pages/SignIn";
import SignUpPage from "@pages/SignUp";
import FindPasswordPage from "@pages/FindPassword";
import DashboardPage from "@pages/Dashboard";
import MonitoringPage from "@pages/Monitoring";
import ReportPage from "@pages/Report";
import NotFound from "@pages/NotFound";
import ReportNewPage from "@pages/ReportNew";
import ReportEditPage from "@pages/ReportEdit";
import SettingKeywordPage from "@pages/SettingKeyword";
import SettingEmailPage from "@pages/SettingEmail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: routes.signIn,
        element: <SignInPage />,
      },
      {
        path: routes.signUp,
        element: <SignUpPage />,
      },
      {
        path: routes.password,
        element: <FindPasswordPage />,
      },
      {
        path: routes.dashboard,
        element: <DashboardPage />,
      },
      {
        path: routes.monitoring,
        element: <MonitoringPage />,
      },
      {
        path: routes.report,
        element: <ReportPage />,
      },
      {
        path: routes.reportNew,
        element: <ReportNewPage />,
      },
      {
        path: `${routes.reportEdit}/:reportId`,
        element: <ReportEditPage />,
      },

      {
        path: routes.settingKeyword,
        element: <SettingKeywordPage />,
      },
      {
        path: routes.settingEmail,
        element: <SettingEmailPage />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
