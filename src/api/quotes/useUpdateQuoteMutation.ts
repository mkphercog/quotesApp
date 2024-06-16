import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "api/query-keys";
import { API, graphqlOperation } from "aws-amplify";
import { updateQuoteDataModel } from "graphql/mutations";
import { EagerQuoteDataModel } from "models";

type UpdateQuoteDataType = Pick<
  EagerQuoteDataModel,
  | "id"
  | "content"
  | "comment"
  | "quoteDataModelSourceId"
  | "quoteDataModelTagId"
>;

export const useUpdateQuoteMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: UpdateQuoteDataType) =>
      await API.graphql(
        graphqlOperation(updateQuoteDataModel, {
          input: {
            ...data,
          },
        })
      ),
    onSuccess: async () => {
      const quoteDetailsListPromise = queryClient.invalidateQueries([
        QueryKeys.quoteDetails,
      ]);
      const quoteListPromise = queryClient.invalidateQueries([
        QueryKeys.quoteList,
      ]);

      await Promise.all([quoteDetailsListPromise, quoteListPromise]);
    },
    onError: (error) => {
      console.error("Update quote error: ", error);
    },
  });

  return {
    updateQuoteDataMutation: mutateAsync,
    isUpdateQuoteMutationLoading: isLoading,
  };
};
