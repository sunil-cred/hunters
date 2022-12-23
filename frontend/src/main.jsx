// External dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";

// Local dependencies
import Root from "./root";
import ErrorPage from "./error";
import Login, { action as loginAction } from "./routes/login";
import OTP, { loader as otpLoader, action as otpAction } from "./routes/otp";
import Documents, {
  loader as documentsLoader,
  action as documentsAction,
} from "./routes/documents";
import ReasonPage, { loader as reasonLoader, action as reasonAction } from "./routes/reason";
import Thanks, { loader as thanksLoader } from "./routes/thanks";
import Welcome from "./routes/welcome";
import Home, { loader as homeLoader } from "./routes/home";
import Account, { loader as accountLoader } from "./routes/account";
import Settle, { loader as settleLoader, action as settleAction } from "./routes/settle";
import SettleSuccess from "./routes/settleSuccess";
import SettleError from "./routes/settleError";
import Enroll, { loader as enrollLoader, action as enrollAction } from "./routes/enroll";
import EnrollSuccess from "./routes/enrollSuccess";
import EnrollMethod from "./routes/enrollMethod";
import Mandate, { action as mandateAction } from "./routes/mandate";
import Carousel from "./routes/carousel";
import Risk from "./routes/risk";
import QR from "./routes/qr";

// Helpers
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/otp/:mobile",
    element: <OTP />,
    loader: otpLoader,
    action: otpAction,
  },
  {
    path: "/documents/:userId",
    element: <Documents />,
    loader: documentsLoader,
    action: documentsAction,
  },
  {
    path: "/reason/:userId",
    element: <ReasonPage />,
    loader: reasonLoader,
    action: reasonAction,
  },
  {
    path: "/thanks/:skip",
    element: <Thanks />,
    loader: thanksLoader,
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/home",
    element: <Home />,
    loader: homeLoader,
  },
  {
    path: "/account/:accountId",
    element: <Account />,
    loader: accountLoader,
  },
  {
    path: "/settle/:accountId",
    element: <Settle />,
    loader: settleLoader,
    action: settleAction,
  },
  {
    path: "/settle/:accountId/success",
    element: <SettleSuccess />,
  },
  {
    path: "/settle/:accountId/error",
    element: <SettleError />,
  },
  {
    path: "/enroll/:accountId/:payType",
    element: <Enroll />,
    loader: enrollLoader,
    action: enrollAction,
  },
  {
    path: "/enroll/success",
    element: <EnrollSuccess />,
  },
  {
    path: "/enroll/method",
    element: <EnrollMethod />,
  },
  {
    path: "/enroll/mandate",
    element: <Mandate />,
    action: mandateAction,
  },
  {
    path: "/carousel",
    element: <Carousel />,
  },
  {
    path: "/risk",
    element: <Risk />,
  },
  {
    path: "/qr",
    element: <QR />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <main
      style={{
        maxWidth: "425px",
        margin: "0 auto",
        fontFamily: "DM Sans",
        backgroundColor: "white",
      }}
    >
      <RouterProvider router={router} />
    </main>
  </React.StrictMode>
);
