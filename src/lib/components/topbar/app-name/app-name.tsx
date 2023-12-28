import { Text } from "@aws-amplify/ui-react";
import { ROUTES } from "api/routes";
import { ChatQuoteFillIcon } from "lib/icons";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./app-name.module.scss";

export const AppName: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <Text
        className={styles.name}
        onClick={() => navigate({ pathname: ROUTES.home() })}
      >
        Quotes App
        <ChatQuoteFillIcon className={styles.icon} />
      </Text>
    </div>
  );
};
