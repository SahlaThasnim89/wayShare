import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Router from "./route/router.tsx";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId={clientId}>
      <StrictMode>
        <Provider store={store}>
          <RouterProvider router={Router} />
        </Provider>
      </StrictMode>
    </GoogleOAuthProvider>
  );
