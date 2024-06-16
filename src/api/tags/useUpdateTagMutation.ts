import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "api/query-keys";
import { API, graphqlOperation } from "aws-amplify";
import { updateTagData } from "graphql/mutations";
import { EagerTagData } from "models";

type UpdateTagDataType = Pick<EagerTagData, "name" | "id">;

export const useUpdateTagMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: UpdateTagDataType) =>
      await API.graphql(
        graphqlOperation(updateTagData, {
          input: {
            ...data,
          },
        })
      ),
    onSuccess: async () => {
      const tagListPromise = queryClient.invalidateQueries([QueryKeys.tagList]);
      const quoteListPromise = queryClient.invalidateQueries([
        QueryKeys.quoteList,
      ]);

      await Promise.all([tagListPromise, quoteListPromise]);
    },
    onError: (error) => {
      console.error("Update tag error: ", error);
    },
  });

  return {
    updateTagDataMutation: mutateAsync,
    isUpdateTagMutationLoading: isLoading,
  };
};
