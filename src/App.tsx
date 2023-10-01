import { Amplify } from "aws-amplify";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";

import awsconfig from "./aws-exports";

import "@aws-amplify/ui-react/styles.css";

import { ColorModeProvider } from "lib/providers/color-mode";
import { AppRoutes } from "pages/app-routes/app-routes";

Amplify.configure(awsconfig);

export const App = () => {
  return (
    <Authenticator>
      <ColorModeProvider>
        <AppRoutes />
      </ColorModeProvider>
    </Authenticator>
  );
};

export default withAuthenticator(App);
