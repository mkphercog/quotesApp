import {
  useGetTagListQuery,
  useDeleteTagMutation,
  useUpdateTagMutation,
} from "api/tags";
import { EagerTagData } from "models";
import { useForm } from "react-hook-form";

type TagIdType = Pick<EagerTagData, "id">;
type TagBasicDataType = Pick<EagerTagData, "name">;

export const useManageTag = () => {
  const { tagList, isLoading } = useGetTagListQuery();
  const { updateTagDataMutation, isUpdateTagMutationLoading } =
    useUpdateTagMutation();
  const { deleteTagDataMutation, isDeleteTagMutationLoading } =
    useDeleteTagMutation();

  const { register, reset, handleSubmit, watch, formState } =
    useForm<TagBasicDataType>({ mode: "onChange" });

  const handleUpdateTag = (
    updateTagData: TagBasicDataType,
    { id }: TagIdType
  ) => {
    updateTagDataMutation({
      id,
      name: updateTagData.name?.trim(),
    });
  };

  const handleDeleteTag = ({ id }: TagIdType) => {
    deleteTagDataMutation({
      id,
    });
  };

  return {
    tagList,
    isTagListLoading: isLoading,
    register,
    handleSubmit,
    handleUpdateTag,
    isUpdateTagMutationLoading,
    handleDeleteTag,
    isDeleteTagMutationLoading,
    formState,
    reset,
    watch,
  };
};
