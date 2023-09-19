import { Text, TextField } from "@aws-amplify/ui-react";
import { AddForm } from "components/shared/add-form/add-form";

import { useAddSource } from "../hooks/useAddSource";

import {
  FieldErrorTypes,
  SOURCE_ERROR_MAPPER,
  SOURCE_MAX_LENGTH,
} from "../manage-source.constants";

export const AddSourceForm = () => {
  const {
    register,
    reset,
    handleAddSource,
    isAddSourceMutationLoading,
    formState,
    watch,
    clearErrors,
  } = useAddSource();

  const isError = !!Object.entries(formState.errors).length;
  const titleValue = watch("title");
  const authorValue = watch("author");

  return (
    <AddForm
      heading="Nowe źródło"
      onSubmit={handleAddSource}
      isError={isError}
      isDirty={formState.isDirty}
      isLoading={isAddSourceMutationLoading}
      reset={reset}
    >
      <TextField
        label="Tytuł"
        {...register("title", {
          required: !authorValue,
          maxLength: SOURCE_MAX_LENGTH,
          onChange: () => {
            if (!authorValue && formState.errors.author?.type === "required") {
              clearErrors();
            }
          },
        })}
      />
      {isError && (
        <Text color="font.error">
          {SOURCE_ERROR_MAPPER[formState.errors.title?.type as FieldErrorTypes]}
        </Text>
      )}

      <TextField
        label="Autor"
        {...register("author", {
          required: !titleValue,
          maxLength: SOURCE_MAX_LENGTH,
          onChange: () => {
            if (!titleValue && formState.errors.title?.type === "required") {
              clearErrors();
            }
          },
        })}
      />
      {isError && (
        <Text color="font.error">
          {
            SOURCE_ERROR_MAPPER[
              formState.errors.author?.type as FieldErrorTypes
            ]
          }
        </Text>
      )}
    </AddForm>
  );
};
