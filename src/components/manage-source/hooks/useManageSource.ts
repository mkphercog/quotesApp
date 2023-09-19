import {
  useGetSourceListQuery,
  useDeleteSourceMutation,
  useUpdateSourceMutation,
} from "api/sources";
import { EagerSourceData } from "models";
import { useForm } from "react-hook-form";

type SourceIdType = Pick<EagerSourceData, "id">;
type SourceBasicDataType = Pick<EagerSourceData, "title" | "author">;

export const useManageSource = () => {
  const { sourceList, isLoading } = useGetSourceListQuery();
  const { updateSourceDataMutation, isUpdateSourceMutationLoading } =
    useUpdateSourceMutation();
  const { deleteSourceDataMutation, isDeleteSourceMutationLoading } =
    useDeleteSourceMutation();

  const { register, reset, handleSubmit, watch, formState, clearErrors } =
    useForm<SourceBasicDataType>({ mode: "onChange" });

  const handleUpdateSource = (
    updateSourceData: SourceBasicDataType,
    { id }: SourceIdType
  ) => {
    updateSourceDataMutation({
      id,
      title: updateSourceData.title?.trim(),
      author: updateSourceData.author?.trim(),
    });
  };

  const handleDeleteSource = ({ id }: SourceIdType) => {
    deleteSourceDataMutation({
      id,
    });
  };

  return {
    sourceList,
    isSourceListLoading: isLoading,
    register,
    handleSubmit,
    handleUpdateSource,
    isUpdateSourceMutationLoading,
    handleDeleteSource,
    isDeleteSourceMutationLoading,
    formState,
    reset,
    watch,
    clearErrors,
  };
};
