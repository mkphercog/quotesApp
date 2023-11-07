import {
  useGetTagListQuery,
  useDeleteTagMutation,
  useUpdateTagMutation,
} from "api/tags";
import { EagerTagData } from "models";
import { useState } from "react";

type TagBasicDataType = Pick<EagerTagData, "name">;

export const useManageTag = () => {
  const [currentTagId, setCurrentTagId] = useState<string | null>(null);
  const { tagList, isLoading } = useGetTagListQuery();
  const { updateTagDataMutation, isUpdateTagMutationLoading } =
    useUpdateTagMutation();
  const { deleteTagDataMutation, isDeleteTagMutationLoading } =
    useDeleteTagMutation();

  const handleUpdateTag = async (updateTagData: TagBasicDataType) => {
    await updateTagDataMutation({
      id: currentTagId as string,
      name: updateTagData.name?.trim(),
    });
    setCurrentTagId(null);
  };

  const handleDeleteTag = () => {
    deleteTagDataMutation({
      id: currentTagId as string,
    });
  };

  return {
    tagList,
    currentTagId,
    setCurrentTagId,
    isTagListLoading: isLoading,
    handleUpdateTag,
    handleDeleteTag,
    isManageTagLoading:
      isUpdateTagMutationLoading || isDeleteTagMutationLoading,
    handleCancel: () => setCurrentTagId(null),
  };
};
