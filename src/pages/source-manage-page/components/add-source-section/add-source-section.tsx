import { Button, Loader, Text } from "@aws-amplify/ui-react";
import { BaseForm, FormTextInput } from "lib/components/form";
import { useAddSource } from "../../hooks";

import styles from "./add-source-section.module.scss";

export const AddSourceSection = () => {
  const { formParams, isAddSourceMutationLoading, handleAddSource } =
    useAddSource();

  const isErrorInTitle = !!formParams.formState.errors.title;
  const isErrorInAuthor = !!formParams.formState.errors.author;
  const isError = isErrorInTitle || isErrorInAuthor;

  return (
    <BaseForm
      className={styles.wrapper}
      formParams={formParams}
      onSubmit={handleAddSource}
    >
      <Text className={styles.heading}>
        Nowe źródło {isAddSourceMutationLoading && <Loader />}
      </Text>

      <FormTextInput
        className={styles.titleInput}
        name="title"
        labelText="Tytuł"
        onChange={() => formParams.clearErrors()}
        maxLength={100}
        isRequired
      />

      <FormTextInput
        className={styles.authorInput}
        name="author"
        labelText="Autor"
        onChange={() => formParams.clearErrors()}
        maxLength={100}
        isRequired
      />

      <Text className={styles.requiredHint}>
        * przynajmniej jedno pole jest wymagane
      </Text>

      <div className={styles.actionsWrapper}>
        <Button
          className={styles.submitButton}
          type="submit"
          disabled={
            !formParams.formState.isDirty ||
            isAddSourceMutationLoading ||
            isError
          }
        >
          Dodaj
        </Button>

        {(isError || formParams.formState.isDirty) && (
          <Button onClick={() => formParams.reset()}>Wyczyść</Button>
        )}
      </div>
    </BaseForm>
  );
};
