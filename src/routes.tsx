import { lazy } from "react";
import GlobalLayout from "./_layout";

const MainPage = lazy(() => import("./pages/Main/index"));
const SingInPage = lazy(() => import("./pages/SignIn/index"));
const SignUpPage = lazy(() => import("./pages/SignUp/index"));

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/sign-in", element: <SingInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
    ],
  },
];

export const pages = [
  { route: "/" },
  { route: "/sign-in" },
  { route: "/sign-up" },
];
