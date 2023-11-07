import { FC } from "react";
import { FormTextInput, RequiredHint } from "lib/components/form";
import { SOURCE_VALUE_MAX_LENGTH } from "pages/source-manage-page/validation";

interface EditableSourceContentProps {
  isCurrentItemEdited: boolean;
  isLoading: boolean;
}

export const EditableSourceContent: FC<EditableSourceContentProps> = ({
  isCurrentItemEdited,
  isLoading,
}) => {
  return (
    <>
      <FormTextInput
        labelText="Tytuł"
        name="title"
        maxLength={SOURCE_VALUE_MAX_LENGTH}
        isLoading={isCurrentItemEdited && isLoading}
        isRequired
      />

      <FormTextInput
        labelText="Autor"
        name="author"
        maxLength={SOURCE_VALUE_MAX_LENGTH}
        isLoading={isCurrentItemEdited && isLoading}
        isRequired
      />

      <RequiredHint message="przynajmniej jedno pole jest wymagane" />
    </>
  );
};
