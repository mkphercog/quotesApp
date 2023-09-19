import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "api/query-keys";
import { API, graphqlOperation } from "aws-amplify";
import { createTagData } from "graphql/mutations";
import { EagerTagData } from "models";

type AddTagDataType = Pick<EagerTagData, "name">;

export const useAddTagMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: AddTagDataType) =>
      await API.graphql(
        graphqlOperation(createTagData, {
          input: {
            ...data,
          },
        })
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.tagList]);
    },
    onError: (error) => {
      console.log("Add tag error: ", error);
    },
  });

  return {
    addTagDataMutation: mutateAsync,
    isAddTagMutationLoading: isLoading,
  };
};
