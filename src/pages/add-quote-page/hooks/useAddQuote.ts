import { useAddQuoteMutation } from "api/quotes";
import { useGetSourceListQuery } from "api/sources";
import { useGetTagListQuery } from "api/tags";
import {
  quoteEmptyDefaultValues as defaultValues,
  QuoteValidationFormType,
  quoteValidationSchema as validationSchema,
} from "lib/components/quote";
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
