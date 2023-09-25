import { useGetQuoteDetails, useUpdateQuoteMutation } from "api/quotes";
import { useGetSourceListQuery } from "api/sources";
import { useGetTagListQuery } from "api/tags";
import { EagerQuoteDataModel } from "models";
import { useForm } from "react-hook-form";

type QuoteIdType = Pick<EagerQuoteDataModel, "id">;
type BasicQuoteDataType = Pick<
  EagerQuoteDataModel,
  "content" | "comment" | "quoteDataModelSourceId" | "quoteDataModelTagId"
>;

export const useUpdateQuote = (currentQuoteId: string) => {
  const { quoteDetails } = useGetQuoteDetails(currentQuoteId);
  const { sourceList } = useGetSourceListQuery();
  const { tagList } = useGetTagListQuery();
  const { updateQuoteDataMutation, isUpdateQuoteMutationLoading } =
    useUpdateQuoteMutation();

  const formData = useForm<BasicQuoteDataType>({
    defaultValues: {
      ...quoteDetails,
    },
    mode: "onChange",
  });

  const handleUpdateQuote = (
    newQueryData: BasicQuoteDataType,
    { id }: QuoteIdType
  ) => {
    updateQuoteDataMutation({
      id,
      content: newQueryData.content.trim(),
      comment: newQueryData.comment?.trim(),
      quoteDataModelSourceId: newQueryData.quoteDataModelSourceId,
      quoteDataModelTagId: newQueryData.quoteDataModelTagId,
    });
    formData.reset();
  };

  return {
    ...formData,
    quoteDetails,
    sourceList,
    tagList,
    handleUpdateQuote,
    isUpdateQuoteMutationLoading,
  };
};
