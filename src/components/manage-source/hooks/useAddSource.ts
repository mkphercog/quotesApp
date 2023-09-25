import { useAddSourceMutation } from "api/sources";
import { EagerSourceData } from "models";

import { useForm } from "react-hook-form";
type SourceBasicDataType = Pick<EagerSourceData, "title" | "author">;

export const useAddSource = () => {
  const { addSourceDataMutation, isAddSourceMutationLoading } =
    useAddSourceMutation();

  const formData = useForm<SourceBasicDataType>({
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
    formData.reset();
  };

  return {
    ...formData,
    handleAddSource: formData.handleSubmit(handleAddSource),
    isAddSourceMutationLoading,
  };
};
