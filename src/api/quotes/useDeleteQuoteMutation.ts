import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "api/query-keys";
import { API, graphqlOperation } from "aws-amplify";
import { deleteQuoteDataModel } from "graphql/mutations";
import { EagerQuoteDataModel } from "models";

type DeleteQuoteDataType = Pick<EagerQuoteDataModel, "id">;

export const useDeleteQuoteMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (data: DeleteQuoteDataType) =>
      await API.graphql(
        graphqlOperation(deleteQuoteDataModel, {
          input: {
            ...data,
          },
        })
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.quoteList]);
    },
    onError: (error) => {
      console.error("Add quote error: ", error);
    },
  });

  return { deleteQuoteDataMutation: mutateAsync };
};
