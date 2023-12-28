import { useAddQuoteMutation } from "api/quotes";
import { useGetSourceListQuery } from "api/sources";
import { useGetTagListQuery } from "api/tags";
import {
  defaultValues,
  QuoteValidationFormType,
  validationSchema,
} from "lib/components";
import { useBaseForm } from "lib/components/form";

export const useAddQuote = () => {
  const { sourceList } = useGetSourceListQuery();
  const { tagList } = useGetTagListQuery();
  const { addQuoteDataMutation, isAddQuoteDataMutationLoading } =
    useAddQuoteMutation();

  const formParams = useBaseForm({
    defaultValues,
    validationSchema,
  });

  const clearForm = () => formParams.reset(defaultValues);

  const handleAddQuote = (newQueryData: QuoteValidationFormType) => {
    addQuoteDataMutation({
      ...newQueryData,
      content: newQueryData.content.trim(),
      comment: newQueryData.comment?.trim(),
    });
    clearForm();
  };

  return {
    sourceList,
    tagList,
    isAddQuoteDataMutationLoading,
    formParams,
    handleAddQuote,
    clearForm,
  };
};
