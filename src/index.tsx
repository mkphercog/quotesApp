import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

import "./index.css";

const ONE_HOUR_IN_MILLISECONDS = 3_600_000;

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
    <BrowserRouter basename="/quotesApp">
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
