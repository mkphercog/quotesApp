import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "api/query-keys";
import { API, graphqlOperation } from "aws-amplify";
import { createSourceData } from "graphql/mutations";
import { EagerSourceData } from "models";

type AddSourceDataType = Pick<EagerSourceData, "title" | "author">;

export const useAddSourceMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: AddSourceDataType) =>
      await API.graphql(
        graphqlOperation(createSourceData, {
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
      console.error("Add source error: ", error);
    },
  });

  return {
    addSourceDataMutation: mutateAsync,
    isAddSourceMutationLoading: isLoading,
  };
};
