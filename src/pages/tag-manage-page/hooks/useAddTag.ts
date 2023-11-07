import { useAddTagMutation } from "api/tags";
import { useBaseForm } from "lib/components/form/base-form/useBaseForm";
import {
  defaultValues,
  validationSchema,
  TagValidationFormType,
} from "../validation";

export const useAddTag = () => {
  const { addTagDataMutation, isAddTagMutationLoading } = useAddTagMutation();

  const formParams = useBaseForm({
    defaultValues,
    validationSchema,
  });

  const clearForm = () => formParams.reset(defaultValues);

  const handleAddTag = (newTagData: TagValidationFormType) => {
    addTagDataMutation({
      name: newTagData.name.trim(),
    });
    clearForm();
  };

  return {
    formParams,
    handleAddTag,
    isAddTagMutationLoading,
    clearForm,
  };
};
