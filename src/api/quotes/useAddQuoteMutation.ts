import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "api/query-keys";
import { API, graphqlOperation } from "aws-amplify";
import { createQuoteDataModel } from "graphql/mutations";
import { EagerQuoteDataModel } from "models";

export type AddQuoteDataType = Pick<
  EagerQuoteDataModel,
  "content" | "comment" | "quoteDataModelSourceId" | "quoteDataModelTagId"
>;

export const useAddQuoteMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: AddQuoteDataType) =>
      await API.graphql(
        graphqlOperation(createQuoteDataModel, {
          input: {
            ...data,
          },
        })
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.quoteList]);
    },
    onError: (error) => {
      console.log("Add quote error: ", error);
    },
  });

  return {
    addQuoteDataMutation: mutateAsync,
    isAddQuoteDataMutationLoading: isLoading,
  };
};
