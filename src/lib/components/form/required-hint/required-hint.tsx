import { FC } from "react";
import { Text } from "@aws-amplify/ui-react";

import styles from "./required-hint.module.scss";

interface RequiredHintProps {
  message?: string;
}

const defaultMessage = "pola wymagane";

export const RequiredHint: FC<RequiredHintProps> = ({
  message = defaultMessage,
}) => {
  return <Text className={styles.requiredHint}>* {message}</Text>;
};
