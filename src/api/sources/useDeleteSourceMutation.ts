import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "api/query-keys";
import { API, graphqlOperation } from "aws-amplify";
import { deleteSourceData } from "graphql/mutations";
import { EagerSourceData } from "models";

type DeleteSourceDataType = Pick<EagerSourceData, "id">;

export const useDeleteSourceMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: DeleteSourceDataType) =>
      await API.graphql(
        graphqlOperation(deleteSourceData, {
          input: {
            ...data,
          },
        })
      ),
    onSuccess: async () => {
      const sourceListPromise = queryClient.invalidateQueries([
        QueryKeys.sourceList,
      ]);
      const quoteListPromise = queryClient.invalidateQueries([
        QueryKeys.quoteList,
      ]);

      await Promise.all([sourceListPromise, quoteListPromise]);
    },
    onError: (error) => {
      console.log("Delete source error: ", error);
    },
  });

  return {
    deleteSourceDataMutation: mutateAsync,
    isDeleteSourceMutationLoading: isLoading,
  };
};
