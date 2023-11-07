import { useAddSourceMutation } from "api/sources";
import { useBaseForm } from "lib/components/form/base-form/useBaseForm";
import {
  defaultValues,
  validationSchema,
  SourceValidationFormType,
} from "../validation";

export const useAddSource = () => {
  const { addSourceDataMutation, isAddSourceMutationLoading } =
    useAddSourceMutation();

  const formParams = useBaseForm({
    defaultValues,
    validationSchema,
  });

  const handleAddSource = (newSourceData: SourceValidationFormType) => {
    addSourceDataMutation({
      title: newSourceData.title?.trim(),
      author: newSourceData.author?.trim(),
    });
    formParams.reset();
  };

  return {
    formParams,
    handleAddSource,
    isAddSourceMutationLoading,
  };
};
