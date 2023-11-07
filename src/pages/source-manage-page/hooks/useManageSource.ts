import {
  useGetSourceListQuery,
  useDeleteSourceMutation,
  useUpdateSourceMutation,
} from "api/sources";
import { EagerSourceData } from "models";
import { useState } from "react";

type SourceBasicDataType = Pick<EagerSourceData, "title" | "author">;

export const useManageSource = () => {
  const [currentSourceId, setCurrentSourceId] = useState<string | null>(null);
  const { sourceList, isLoading } = useGetSourceListQuery();
  const { updateSourceDataMutation, isUpdateSourceMutationLoading } =
    useUpdateSourceMutation();
  const { deleteSourceDataMutation, isDeleteSourceMutationLoading } =
    useDeleteSourceMutation();

  const handleUpdateSource = async (updateSourceData: SourceBasicDataType) => {
    await updateSourceDataMutation({
      id: currentSourceId as string,
      title: updateSourceData.title?.trim(),
      author: updateSourceData.author?.trim(),
    });
    setCurrentSourceId(null);
  };

  const handleDeleteSource = () => {
    deleteSourceDataMutation({
      id: currentSourceId as string,
    });
  };

  return {
    sourceList,
    currentSourceId,
    setCurrentSourceId,
    isSourceListLoading: isLoading,
    handleUpdateSource,
    handleDeleteSource,
    isManageSourceLoading:
      isUpdateSourceMutationLoading || isDeleteSourceMutationLoading,
    handleCancel: () => setCurrentSourceId(null),
  };
};
