import { Button, Card, Flex } from "@aws-amplify/ui-react";
import { FC, ReactNode } from "react";

interface ManageListItemProps {
  isCurrentItemEdited: boolean;
  isDeleteMutationLoading: boolean;
  noEditFields: ReactNode;
  editFields: ReactNode;
  onSubmit: () => void;
  onClickSettings: () => void;
  onClickCancel: () => void;
  onClickDelete: () => void;
  isSubmitButtonDisabled: boolean;
}

export const ManageListItem: FC<ManageListItemProps> = ({
  isCurrentItemEdited,
  isDeleteMutationLoading,
  noEditFields,
  editFields,
  onSubmit,
  onClickSettings,
  onClickCancel,
  onClickDelete,
  isSubmitButtonDisabled,
}) => {
  if (!isCurrentItemEdited) {
    return (
      <Card width="100%" backgroundColor="orange.20">
        <Flex direction="column" gap="0">
          {noEditFields}
          <Button
            width="fit-content"
            marginTop="20px"
            onClick={onClickSettings}
            disabled={isDeleteMutationLoading}
          >
            Ustawienia
          </Button>
        </Flex>
      </Card>
    );
  }

  return (
    <Card width="100%" backgroundColor="orange.40">
      <form onSubmit={onSubmit}>
        <Flex direction="column" gap="0">
          {editFields}

          <Flex marginTop="20px" width="100%">
            <Button onClick={onClickCancel}>Anuluj</Button>

            <Button onClick={onClickDelete}>Usuń</Button>

            <Button type="submit" disabled={isSubmitButtonDisabled}>
              Uaktualnij
            </Button>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
};
