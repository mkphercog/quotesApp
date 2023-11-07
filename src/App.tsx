import { defaultDarkModeOverride, ThemeProvider } from "@aws-amplify/ui-react";
import { ROUTES } from "api/routes";
import { AddQuoteForm, ManageTag, Topbar, UpdateQuoteForm } from "components";
import { useColorMode } from "lib/providers/color-mode";

import { Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import { AddPage, QuotesListPage, RandomQuotePage } from "pages";
import awsconfig from "./aws-exports";

import "@aws-amplify/ui-react/styles.css";
import styles from "./App.module.scss";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { SourceManagePage } from "pages/source-manage-page/source-manage-page";

Amplify.configure(awsconfig);

export const App = () => {
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
        <div className={styles.wrapper}>
          <Routes>
            <Route path={ROUTES.home} element={<Topbar />}>
              <Route index element={<QuotesListPage />} />
              <Route path={ROUTES.manage.root} element={<AddPage />}>
                <Route index element={<AddQuoteForm />} />
                <Route
                  path={ROUTES.manage.addQuote}
                  element={<AddQuoteForm />}
                />
                <Route
                  path={ROUTES.manage.source}
                  element={<SourceManagePage />}
                />
                <Route path={ROUTES.manage.tag} element={<ManageTag />} />
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
