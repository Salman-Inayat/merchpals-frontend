import { Navigate, useRoutes } from "react-router-dom";
// layouts
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";

// Pages
import Login from "./pages/authentication/Login";
import OtpVerification from "./pages/authentication/OtpVerification";
import Register from "./pages/authentication/Register";
import Editor from "./pages/editor/Editor";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      // element: <LogoOnlyLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "otp-verification", element: <OtpVerification /> },
        { path: "editor", element: <Editor /> },

      ],
    },
    // { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
