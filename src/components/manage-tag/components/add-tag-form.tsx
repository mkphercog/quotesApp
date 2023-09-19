import { TextField } from "@aws-amplify/ui-react";
import { AddForm } from "components/shared/add-form/add-form";
import { useAddTag } from "../hooks/useAddTag";
import {
  ERROR_MAPPER,
  FieldErrorTypes,
  TAG_NAME_MAX_LENGTH,
} from "../manage-tag.constants";

export const AddTagForm = () => {
  const { register, reset, handleAddTag, isAddTagMutationLoading, formState } =
    useAddTag();

  return (
    <AddForm
      heading="Nazwa nowej kategorii"
      onSubmit={handleAddTag}
      isError={!!formState.errors.name}
      errorMessage={
        ERROR_MAPPER[formState.errors.name?.type as FieldErrorTypes]
      }
      isDirty={formState.isDirty}
      isLoading={isAddTagMutationLoading}
      reset={reset}
    >
      <TextField
        label={undefined}
        {...register("name", {
          required: true,
          maxLength: TAG_NAME_MAX_LENGTH,
        })}
      />
    </AddForm>
  );
};
