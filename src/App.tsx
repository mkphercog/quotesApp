import { useQueryClient } from "@tanstack/react-query";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { defaultDarkModeOverride, ThemeProvider } from "@aws-amplify/ui-react";
import { ROUTES } from "api/routes";
import { AddQuoteForm, UpdateQuoteForm } from "components";
import { Topbar } from "lib/components";
import { useColorMode } from "lib/providers/color-mode";
import { Amplify } from "aws-amplify";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import {
  ManageDataPage,
  QuotesListPage,
  RandomQuotePage,
  SourceManagePage,
  TagManagePage,
} from "pages";
import awsconfig from "./aws-exports";

import cn from "classnames";

import "@aws-amplify/ui-react/styles.css";
import styles from "./App.module.scss";

Amplify.configure(awsconfig);

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
    <Authenticator>
      <ThemeProvider theme={theme} colorMode={colorMode}>
        <div
          className={cn(styles.wrapper, {
            [styles.manageWrapper]: isManagePage,
          })}
        >
          <Routes>
            <Route path={ROUTES.home} element={<Topbar />}>
              <Route index element={<QuotesListPage />} />
              <Route path={ROUTES.manage.root} element={<ManageDataPage />}>
                <Route index element={<AddQuoteForm />} />
                <Route
                  path={ROUTES.manage.addQuote}
                  element={<AddQuoteForm />}
                />
                <Route
                  path={ROUTES.manage.source}
                  element={<SourceManagePage />}
                />
                <Route path={ROUTES.manage.tag} element={<TagManagePage />} />
              </Route>
              <Route
                path={ROUTES.manage.editQuoteRoot}
                element={<UpdateQuoteForm />}
              />
              <Route path={ROUTES.randomQuote} element={<RandomQuotePage />} />
              <Route path={ROUTES.other} element={<div>No Page</div>} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </Authenticator>
  );
};

export default withAuthenticator(App);
