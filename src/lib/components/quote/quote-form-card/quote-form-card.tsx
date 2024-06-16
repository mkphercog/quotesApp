import { FC } from "react";
import { Button } from "@aws-amplify/ui-react";
import { EagerSourceData, EagerTagData } from "models";

import {
  BaseForm,
  FormSelectField,
  FormTextarea,
  RequiredHint,
  UseBaseFormReturnedParams,
} from "../../form";
import {
  QuoteValidationFormType,
  QuoteValidationSchemaType,
  QUOTE_COMMENT_MAX_LENGTH,
  QUOTE_CONTENT_MAX_LENGTH,
} from "./validation";
import { useSession } from "lib/providers/session/session.hooks";

import styles from "./quote-form-card.module.scss";

interface QuoteFormCardProps {
  sourceList: EagerSourceData[];
  tagList: EagerTagData[];
  formParams: UseBaseFormReturnedParams<QuoteValidationSchemaType>;
  isLoading: boolean;
  submitButtonText: string;
  onSubmit: (data: QuoteValidationFormType) => void;
  clearForm: () => void;
}

export const QuoteFormCard: FC<QuoteFormCardProps> = ({
  sourceList,
  tagList,
  formParams,
  isLoading,
  submitButtonText,
  onSubmit,
  clearForm,
}) => {
  const isError = !!Object.entries(formParams.formState.errors).length;
  const {
    decreaseGuestActions,
    isGuestLogged,
    canGuestDoAction,
    isRegularUserLogged,
  } = useSession();

  return (
    <BaseForm
      className={styles.wrapper}
      formParams={formParams}
      onSubmit={(data) => {
        decreaseGuestActions();

        if (isRegularUserLogged || (isGuestLogged && canGuestDoAction)) {
          onSubmit(data);
        }
      }}
    >
      <FormTextarea
        labelText="Treść cytatu"
        name="content"
        maxLength={QUOTE_CONTENT_MAX_LENGTH}
        isRequired
      />

      <FormTextarea
        labelText="Komentarz"
        name="comment"
        className={styles.comment}
        maxLength={QUOTE_COMMENT_MAX_LENGTH}
      />

      <div className={styles.selectsWrapper}>
        <FormSelectField
          labelText="Źródło"
          name="quoteDataModelSourceId"
          options={sourceList.map((source) => {
            const separator = !source.title ? "" : !source.author ? "" : "-";

            return {
              id: source.id,
              name: `${source.title} ${separator} ${source.author}`,
            };
          })}
        />

        <FormSelectField
          labelText="Kategoria"
          name="quoteDataModelTagId"
          options={tagList.map((tag) => ({
            id: tag.id,
            name: tag.name ? tag.name : "",
          }))}
        />
      </div>

      <RequiredHint />

      <Button
        className={styles.submitButton}
        type="submit"
        disabled={
          isError ||
          !formParams.formState.isDirty ||
          isLoading ||
          (isGuestLogged && !canGuestDoAction)
        }
      >
        {submitButtonText}
      </Button>

      {(formParams.formState.isDirty || isError) && (
        <Button onClick={clearForm}>Wyczyść</Button>
      )}
    </BaseForm>
  );
};
