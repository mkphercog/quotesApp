import { Button } from "@aws-amplify/ui-react";
import { DeleteButton } from "lib/components/delete-button/delete-button";
import { ArrowLeftCircleFillIcon } from "lib/icons";
import { FC } from "react";
import styles from "./manage-list-card-actions.module.scss";

interface ManageListCardActionsProps {
  onCancelClick: () => void;
  deleteButton: {
    onClick: () => void;
    isDisabled: boolean;
  };
  submitButton: {
    formId?: string;
    isDisabled: boolean;
  };
}

export const ManageListCardActions: FC<ManageListCardActionsProps> = ({
  onCancelClick,
  deleteButton,
  submitButton,
}) => {
  return (
    <div className={styles.actionsWrapper}>
      <Button className={styles.goBackButton} onClick={onCancelClick}>
        <ArrowLeftCircleFillIcon />
      </Button>

      <Button
        className={styles.submitButton}
        type="submit"
        form={submitButton.formId}
        disabled={submitButton.isDisabled}
      >
        Uaktualnij
      </Button>

      <DeleteButton
        onClick={deleteButton.onClick}
        disabled={deleteButton.isDisabled}
      />
    </div>
  );
};
