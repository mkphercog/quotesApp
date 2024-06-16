import { Authenticator, Button, Text } from "@aws-amplify/ui-react";
import { FC, PropsWithChildren } from "react";

import styles from "./auth-provider.module.scss";
import { ChatQuoteFillIcon } from "lib/icons";
import { GUEST_EMAIL, GUEST_PASSWORD } from "lib/constants";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const autoLogAsGuest = () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.autocomplete === "username") {
        input.autocomplete = "one-time-code";
        input.readOnly = true;
        input.value = GUEST_EMAIL;
        input.type = "password";
      }

      if (input.autocomplete === "current-password") {
        input.autocomplete = "one-time-code";
        input.readOnly = true;
        input.value = GUEST_PASSWORD;
      }
    });

    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      if (button.role === "switch") {
        button.remove();
      }

      if (button.type === "submit") {
        button.click();
      }
    });
  };

  return (
    <Authenticator
      className={styles.auth}
      hideSignUp
      components={{
        Header() {
          return (
            <div className={styles.appNameWrapper}>
              <Text className={styles.appName}>
                Quotes App
                <ChatQuoteFillIcon className={styles.icon} />
              </Text>
              <Text className={styles.name}>by Marcin Hercog</Text>
            </div>
          );
        },
        SignIn: {
          Footer() {
            return (
              <div className={styles.authFooter}>
                <Button onClick={autoLogAsGuest}>Wypróbuj jako gość!</Button>
              </div>
            );
          },
        },
      }}
    >
      {children}
    </Authenticator>
  );
};
