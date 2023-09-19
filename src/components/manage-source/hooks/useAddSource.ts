import { useAddSourceMutation } from "api/sources";
import { EagerSourceData } from "models";

import { useForm } from "react-hook-form";
type SourceBasicDataType = Pick<EagerSourceData, "title" | "author">;

export const useAddSource = () => {
  const { addSourceDataMutation, isAddSourceMutationLoading } =
    useAddSourceMutation();

  const { register, reset, handleSubmit, formState, watch, clearErrors } =
    useForm<SourceBasicDataType>({
      defaultValues: {
        title: "",
        author: "",
      },
      mode: "onChange",
    });

  const handleAddSource = (newSourceData: SourceBasicDataType) => {
    addSourceDataMutation({
      title: newSourceData.title?.trim(),
      author: newSourceData.author?.trim(),
    });
    reset();
  };

  return {
    register,
    reset,
    handleAddSource: handleSubmit(handleAddSource),
    isAddSourceMutationLoading,
    formState,
    watch,
    clearErrors,
  };
};
