import { Flex, Text, TextField } from "@aws-amplify/ui-react";
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

  const isErrorInTitle = !!formState.errors.title;
  const isErrorInAuthor = !!formState.errors.author;
  const isError = isErrorInTitle || isErrorInAuthor;
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
        label={
          <Flex justifyContent="space-between" alignItems="flex-end">
            <Text>Tytuł*</Text>
            <Text fontSize="x-small">{`${
              titleValue?.length || 0
            }/${SOURCE_MAX_LENGTH}`}</Text>
          </Flex>
        }
        hasError={isErrorInTitle}
        maxLength={SOURCE_MAX_LENGTH + 10}
        errorMessage={
          SOURCE_ERROR_MAPPER[formState.errors.title?.type as FieldErrorTypes]
        }
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

      <TextField
        label={
          <Flex justifyContent="space-between" alignItems="flex-end">
            <Text>Autor*</Text>
            <Text fontSize="x-small">{`${
              authorValue?.length || 0
            }/${SOURCE_MAX_LENGTH}`}</Text>
          </Flex>
        }
        marginTop="10px"
        maxLength={SOURCE_MAX_LENGTH + 10}
        hasError={isErrorInAuthor}
        errorMessage={
          SOURCE_ERROR_MAPPER[formState.errors.author?.type as FieldErrorTypes]
        }
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
      <Text marginTop="10px" fontSize="x-small">
        * przynajmniej jedno pole jest wymagane
      </Text>
    </AddForm>
  );
};
