import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ONE_HOUR_IN_MILLISECONDS } from "lib/constants";

import App from "./App";

import "./assets/styles/index.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_HOUR_IN_MILLISECONDS,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);
