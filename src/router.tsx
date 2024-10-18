import routes from "@constants/routes";
import SignInPage from "@pages/SignIn";
import SignUpPage from "@pages/SignUp";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import FindPasswordPage from "@pages/FindPassword";
import DashboardPage from "@pages/Dashboard";

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
    ],
  },
]);

export default router;
