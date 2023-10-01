import {
  defaultDarkModeOverride,
  ThemeProvider,
  View,
} from "@aws-amplify/ui-react";
import { ROUTES } from "api/routes";
import {
  AddQuoteForm,
  ManageSource,
  ManageTag,
  Topbar,
  UpdateQuoteForm,
} from "components";
import { useColorMode } from "lib/providers/color-mode";
import { AddPage } from "pages/add-page/add-page";
import { ListPage } from "pages/list-page";
import { RandomQuotePage } from "pages/random-quote-page/random-quote-page";
import { Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  const { colorMode } = useColorMode();

  const theme = {
    name: "my-theme",
    overrides: [defaultDarkModeOverride],
  };

  return (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      <View backgroundColor="background.primary" minHeight="100vh" padding="0">
        <Routes>
          <Route path={ROUTES.home} element={<Topbar />}>
            <Route index element={<ListPage />} />
            <Route path={ROUTES.manage.root} element={<AddPage />}>
              <Route index element={<AddQuoteForm />} />
              <Route path={ROUTES.manage.addQuote} element={<AddQuoteForm />} />
              <Route path={ROUTES.manage.source} element={<ManageSource />} />
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
      </View>
    </ThemeProvider>
  );
};
