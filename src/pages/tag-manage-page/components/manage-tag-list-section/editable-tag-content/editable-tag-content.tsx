import { FC } from "react";
import { FormTextInput, RequiredHint } from "lib/components/form";
import { TAG_VALUE_MAX_LENGTH } from "pages/tag-manage-page/validation";

interface EditableTagContentProps {
  isCurrentItemEdited: boolean;
  isLoading: boolean;
}

export const EditableTagContent: FC<EditableTagContentProps> = ({
  isCurrentItemEdited,
  isLoading,
}) => {
  return (
    <>
      <FormTextInput
        labelText="Nazwa"
        name="name"
        maxLength={TAG_VALUE_MAX_LENGTH}
        isLoading={isCurrentItemEdited && isLoading}
        isRequired
      />
      <RequiredHint />
    </>
  );
};
