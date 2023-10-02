import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ONE_HOUR_IN_MILLISECONDS } from "lib/constants";
import { ColorModeProvider } from "lib/providers/color-mode";

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
        <ColorModeProvider>
          <App />
        </ColorModeProvider>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);
