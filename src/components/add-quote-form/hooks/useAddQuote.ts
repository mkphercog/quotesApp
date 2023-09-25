import { useAddQuoteMutation } from "api/quotes";
import { useGetSourceListQuery } from "api/sources";
import { useGetTagListQuery } from "api/tags";
import { EagerQuoteDataModel } from "models";
import { useForm } from "react-hook-form";

type BasicQuoteDataType = Pick<
  EagerQuoteDataModel,
  "content" | "comment" | "quoteDataModelSourceId" | "quoteDataModelTagId"
>;

export const useAddQuote = () => {
  const { sourceList } = useGetSourceListQuery();
  const { tagList } = useGetTagListQuery();
  const { addQuoteDataMutation, isAddQuoteDataMutationLoading } =
    useAddQuoteMutation();

  const formData = useForm<BasicQuoteDataType>({
    defaultValues: {
      content: "",
      comment: "",
      quoteDataModelSourceId: "",
      quoteDataModelTagId: "",
    },
    mode: "onChange",
  });

  const handleAddQuote = (newQueryData: BasicQuoteDataType) => {
    addQuoteDataMutation({
      ...newQueryData,
      content: newQueryData.content.trim(),
      comment: newQueryData.comment?.trim(),
    });
    formData.reset();
  };

  return {
    ...formData,
    sourceList,
    tagList,
    handleAddQuote: formData.handleSubmit(handleAddQuote),
    isAddQuoteDataMutationLoading,
  };
};
