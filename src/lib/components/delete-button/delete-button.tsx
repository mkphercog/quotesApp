import { FC } from "react";
import { Button } from "@aws-amplify/ui-react";

import { DeleteBinFillIcon } from "lib/icons";

import styles from "./delete-button.module.scss";

type DeleteButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export const DeleteButton: FC<DeleteButtonProps> = ({ onClick, disabled }) => {
  return (
    <Button
      className={styles.deleteButton}
      onClick={onClick}
      disabled={disabled}
    >
      <DeleteBinFillIcon />
    </Button>
  );
};
