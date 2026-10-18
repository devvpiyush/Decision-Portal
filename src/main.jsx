import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Local Modules
import Unlock from "./pages/Unlock";
import RequireUnlock from "./components/RequireUnlock";
import DecisionPage from "./pages/Decision";
import YesConfirmPage from "./pages/YesConfirmPage";
import YesThanksPage from "./pages/YesThanksPage";
import YesContactPage from "./pages/YesContactPage";
import NoStepPage from "./pages/NoStepPage";
import NoGoodbyePage from "./pages/NoGoodbyePage";

/**
 * Screen map
 *
 *  /               secret code
 *  /decision       "Will you be mine?"  → Yes: /yes   |  No: /no/1
 *
 *  YES path
 *  /yes            "Really?"            → Yes, really: /yes/thanks  |  change: /decision
 *  /yes/thanks     Thank you          → "One last thing": /yes/contact
 *  /yes/contact    My number + Instagram QR codes (final)
 *
 *  NO path
 *  /no/1           "Really???"          → Yes: /no/2  |  change: /decision
 *  /no/2           "Pakka na?"          → Yes: /no/3  |  change: /decision
 *  /no/3           "Pleaseeee..."       → Yes: /no/goodbye  |  change: /decision
 *  /no/goodbye     Thank you + goodbye (final)
 */
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <Unlock />,
      },

      // everything inside needs the secret code first
      {
        element: <RequireUnlock />,
        children: [
          { path: "/decision", element: <DecisionPage /> },
          { path: "/yes", element: <YesConfirmPage /> },
          { path: "/yes/thanks", element: <YesThanksPage /> },
          { path: "/yes/contact", element: <YesContactPage /> },
          { path: "/no/goodbye", element: <NoGoodbyePage /> },
          { path: "/no/:step", element: <NoStepPage /> },
        ],
      },

      { path: "*", element: <Unlock /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
