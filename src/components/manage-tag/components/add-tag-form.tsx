import { Flex, Text, TextField } from "@aws-amplify/ui-react";
import { AddForm } from "components/shared/add-form/add-form";
import { useAddTag } from "../hooks/useAddTag";
import {
  ERROR_MAPPER,
  FieldErrorTypes,
  TAG_NAME_MAX_LENGTH,
} from "../manage-tag.constants";

export const AddTagForm = () => {
  const {
    register,
    reset,
    handleAddTag,
    isAddTagMutationLoading,
    formState,
    watch,
  } = useAddTag();
  const tagNameCurrentLength = watch("name")?.length || 0;

  return (
    <AddForm
      heading="Nowa kategoria"
      onSubmit={handleAddTag}
      isError={!!formState.errors.name}
      isDirty={formState.isDirty}
      isLoading={isAddTagMutationLoading}
      reset={reset}
    >
      <TextField
        label={
          <Flex justifyContent="space-between" alignItems="flex-end">
            <Text>Nazwa*</Text>
            <Text fontSize="x-small">{`${tagNameCurrentLength}/${TAG_NAME_MAX_LENGTH}`}</Text>
          </Flex>
        }
        maxLength={TAG_NAME_MAX_LENGTH * 1.5}
        hasError={!!formState.errors.name}
        errorMessage={
          ERROR_MAPPER[formState.errors.name?.type as FieldErrorTypes]
        }
        {...register("name", {
          required: true,
          maxLength: TAG_NAME_MAX_LENGTH,
        })}
      />
      <Text marginTop="10px" fontSize="x-small">
        * pole wymagane
      </Text>
    </AddForm>
  );
};
