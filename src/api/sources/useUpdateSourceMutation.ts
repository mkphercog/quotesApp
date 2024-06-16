import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "api/query-keys";
import { API, graphqlOperation } from "aws-amplify";
import { updateSourceData } from "graphql/mutations";
import { EagerSourceData } from "models";

type UpdateSourceDataType = Pick<EagerSourceData, "id" | "title" | "author">;

export const useUpdateSourceMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: UpdateSourceDataType) =>
      await API.graphql(
        graphqlOperation(updateSourceData, {
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
      console.error("Update source error: ", error);
    },
  });

  return {
    updateSourceDataMutation: mutateAsync,
    isUpdateSourceMutationLoading: isLoading,
  };
};
