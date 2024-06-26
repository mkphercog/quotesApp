import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useColorMode } from "lib/providers/color-mode";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { defaultDarkModeOverride, ThemeProvider } from "@aws-amplify/ui-react";

import {
  AddQuotePage,
  EditQuotePage,
  ManageDataPage,
  QuotesListPage,
  RandomQuotePage,
  SourceManagePage,
  TagManagePage,
} from "pages";
import { ROUTES } from "api/routes";
import { Topbar } from "lib/components";
import { SessionProvider } from "lib/providers/session/session-provider";
import { AuthProvider } from "lib/providers/auth/auth-provider";

import cn from "classnames";
//order of this styles is important
import "@aws-amplify/ui-react/styles.css";
import styles from "./App.module.scss";

export const App = () => {
  const { pathname } = useLocation();
  const isManagePage = pathname.includes("manage");

  const { colorMode } = useColorMode();
  const queryClient = useQueryClient();

  const theme = {
    name: "my-theme",
    overrides: [defaultDarkModeOverride],
  };

  useEffect(() => {
    (async () => {
      await queryClient.invalidateQueries();
    })();
  }, [queryClient]);

  return (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      <AuthProvider>
        <SessionProvider>
          <div
            className={cn(styles.wrapper, {
              [styles.manageWrapper]: isManagePage,
            })}
          >
            <Routes>
              <Route path={ROUTES.home.root()} element={<Topbar />}>
                <Route index element={<QuotesListPage />} />
                <Route path={ROUTES.manage.root()} element={<ManageDataPage />}>
                  <Route
                    index
                    element={<Navigate to={ROUTES.manage.addQuote()} />}
                  />
                  <Route
                    path={ROUTES.manage.addQuote()}
                    element={<AddQuotePage />}
                  />
                  <Route
                    path={ROUTES.manage.source()}
                    element={<SourceManagePage />}
                  />
                  <Route
                    path={ROUTES.manage.tag()}
                    element={<TagManagePage />}
                  />
                </Route>
                <Route
                  path={ROUTES.manage.editQuoteRoot()}
                  element={<EditQuotePage />}
                />
                <Route
                  path={ROUTES.randomQuote()}
                  element={<RandomQuotePage />}
                />
                <Route path={ROUTES.other} element={<div>No Page</div>} />
              </Route>
            </Routes>
          </div>
        </SessionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
