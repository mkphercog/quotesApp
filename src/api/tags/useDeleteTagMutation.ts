import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "api/query-keys";
import { API, graphqlOperation } from "aws-amplify";
import { deleteTagData } from "graphql/mutations";
import { EagerTagData } from "models";

type DeleteTagDataType = Pick<EagerTagData, "id">;

export const useDeleteTagMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: DeleteTagDataType) =>
      await API.graphql(
        graphqlOperation(deleteTagData, {
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
      console.log("Delete tag error: ", error);
    },
  });

  return {
    deleteTagDataMutation: mutateAsync,
    isDeleteTagMutationLoading: isLoading,
  };
};
