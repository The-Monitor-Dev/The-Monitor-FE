import routes from "@constants/routes";
import SignInPage from "@pages/SignIn";
import SignUpPage from "@pages/SignUp";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

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
    ],
  },
]);

export default router;
