import { FC } from "react";
import { Text } from "@aws-amplify/ui-react";
import { FormTextInput } from "lib/components/form";
import { SOURCE_VALUE_MAX_LENGTH } from "pages/source-manage-page/validation";

import styles from "./editable-source-content.module.scss";

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

      <Text className={styles.requiredHint}>
        * przynajmniej jedno pole jest wymagane
      </Text>
    </>
  );
};
