import { Button, Loader, Text } from "@aws-amplify/ui-react";
import { BaseForm, FormTextInput, RequiredHint } from "lib/components/form";
import { TAG_VALUE_MAX_LENGTH } from "pages/tag-manage-page/validation";
import { useAddTag } from "../../hooks";

import styles from "./add-tag-section.module.scss";

export const AddTagSection = () => {
  const { formParams, isAddTagMutationLoading, handleAddTag, clearForm } =
    useAddTag();

  const isError = !!formParams.formState.errors.name;

  return (
    <BaseForm
      className={styles.wrapper}
      formParams={formParams}
      onSubmit={handleAddTag}
    >
      <Text className={styles.heading}>
        Nowa kategoria {isAddTagMutationLoading && <Loader />}
      </Text>

      <FormTextInput
        className={styles.nameInput}
        name="name"
        labelText="Nazwa"
        onChange={() => formParams.clearErrors()}
        maxLength={TAG_VALUE_MAX_LENGTH}
        isRequired
      />
      <RequiredHint />

      <div className={styles.actionsWrapper}>
        <Button
          className={styles.submitButton}
          type="submit"
          disabled={
            !formParams.formState.isDirty || isAddTagMutationLoading || isError
          }
        >
          Dodaj
        </Button>

        {(isError || formParams.formState.isDirty) && (
          <Button onClick={clearForm}>Wyczyść</Button>
        )}
      </div>
    </BaseForm>
  );
};
