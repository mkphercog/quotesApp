import { Button, Loader, Text } from "@aws-amplify/ui-react";
import { BaseForm, FormTextInput, RequiredHint } from "lib/components/form";
import { SOURCE_VALUE_MAX_LENGTH } from "pages/source-manage-page/validation";
import { useAddSource } from "../../hooks";
import { useSession } from "lib/providers/session/session.hooks";

import styles from "./add-source-section.module.scss";

export const AddSourceSection = () => {
  const { formParams, isAddSourceMutationLoading, handleAddSource, clearForm } =
    useAddSource();
  const {
    decreaseGuestActions,
    isGuestLogged,
    canGuestDoAction,
    isRegularUserLogged,
  } = useSession();

  const isErrorInTitle = !!formParams.formState.errors.title;
  const isErrorInAuthor = !!formParams.formState.errors.author;
  const isError = isErrorInTitle || isErrorInAuthor;

  return (
    <BaseForm
      className={styles.wrapper}
      formParams={formParams}
      onSubmit={(data) => {
        decreaseGuestActions();

        if (isRegularUserLogged || (isGuestLogged && canGuestDoAction)) {
          handleAddSource(data);
        }
      }}
    >
      <Text className={styles.heading}>
        Nowe źródło {isAddSourceMutationLoading && <Loader />}
      </Text>

      <FormTextInput
        className={styles.titleInput}
        name="title"
        labelText="Tytuł"
        onChange={() => formParams.clearErrors()}
        maxLength={SOURCE_VALUE_MAX_LENGTH}
        isRequired
      />

      <FormTextInput
        className={styles.authorInput}
        name="author"
        labelText="Autor"
        onChange={() => formParams.clearErrors()}
        maxLength={SOURCE_VALUE_MAX_LENGTH}
        isRequired
      />

      <RequiredHint message="przynajmniej jedno pole jest wymagane" />

      <div className={styles.actionsWrapper}>
        <Button
          className={styles.submitButton}
          type="submit"
          disabled={
            !formParams.formState.isDirty ||
            isAddSourceMutationLoading ||
            isError ||
            (isGuestLogged && !canGuestDoAction)
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
