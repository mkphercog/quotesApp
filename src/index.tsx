import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReadingModeProvider } from "lib/providers/reading-mode";
import { ColorModeProvider } from "lib/providers/color-mode";
import { ONE_HOUR_IN_MILLISECONDS } from "lib/constants";
import App from "./App";

import "assets/styles/index.scss";

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
  <StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <ColorModeProvider>
          <ReadingModeProvider>
            <App />
          </ReadingModeProvider>
        </ColorModeProvider>
      </QueryClientProvider>
    </HashRouter>
  </StrictMode>
);
