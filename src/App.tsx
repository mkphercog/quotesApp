import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import {
  Authenticator,
  defaultDarkModeOverride,
  ThemeProvider,
  withAuthenticator,
  ColorMode,
  View,
} from "@aws-amplify/ui-react";

import {
  AddQuoteForm,
  ManageSource,
  ManageTag,
  Topbar,
  UpdateQuoteForm,
} from "./components";
import { AddPage, ListPage } from "./pages";

import awsconfig from "./aws-exports";
import { ROUTES } from "./api/routes";

import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { getColorModeFromLocalStorage } from "utils/localStorageColorModeManagement";

Amplify.configure(awsconfig);

export const App = () => {
  const localStorageColorMode = getColorModeFromLocalStorage();
  const [colorMode, setColorMode] = useState<ColorMode>(localStorageColorMode);

  const theme = {
    name: "my-theme",
    overrides: [defaultDarkModeOverride],
  };

  return (
    <Authenticator>
      <ThemeProvider theme={theme} colorMode={colorMode}>
        <View
          backgroundColor="background.primary"
          minHeight="100vh"
          padding="0"
        >
          <Routes>
            <Route
              path={ROUTES.home}
              element={
                <Topbar setColorMode={setColorMode} colorMode={colorMode} />
              }
            >
              <Route index element={<ListPage />} />
              <Route path={ROUTES.manage.root} element={<AddPage />}>
                <Route index element={<AddQuoteForm />} />
                <Route
                  path={ROUTES.manage.addQuote}
                  element={<AddQuoteForm />}
                />
                <Route path={ROUTES.manage.source} element={<ManageSource />} />
                <Route path={ROUTES.manage.tag} element={<ManageTag />} />
              </Route>
              <Route
                path={ROUTES.manage.editQuoteRoot}
                element={<UpdateQuoteForm />}
              />
              <Route path={ROUTES.other} element={<div>No Page</div>} />
            </Route>
          </Routes>
        </View>
      </ThemeProvider>
    </Authenticator>
  );
};

export default withAuthenticator(App);
