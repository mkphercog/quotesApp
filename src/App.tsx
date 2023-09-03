import { useState } from "react";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import {
  Authenticator,
  defaultDarkModeOverride,
  ThemeProvider,
  withAuthenticator,
  ColorMode,
  View,
} from "@aws-amplify/ui-react";

import { Content } from "./content";
import { Topbar } from "./components";

import "@aws-amplify/ui-react/styles.css";
import "./App.css";

Amplify.configure(awsconfig);

export const App = () => {
  const [colorMode, setColorMode] = useState<ColorMode>("light");
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
          <Topbar setColorMode={setColorMode} colorMode={colorMode} />
          <Content />
        </View>
      </ThemeProvider>
    </Authenticator>
  );
};

export default withAuthenticator(App);
