import { useAddTagMutation } from "api/tags";
import { EagerTagData } from "models";

import { useForm } from "react-hook-form";

type TagBasicDataType = Pick<EagerTagData, "name">;

export const useAddTag = () => {
  const { addTagDataMutation, isAddTagMutationLoading } = useAddTagMutation();

  const { register, reset, handleSubmit, formState } =
    useForm<TagBasicDataType>({
      defaultValues: {
        name: "",
      },
      mode: "onChange",
    });

  const handleAddTag = (newTagData: TagBasicDataType) => {
    addTagDataMutation({
      name: newTagData.name?.trim(),
    });
    reset();
  };

  return {
    register,
    reset,
    handleAddTag: handleSubmit(handleAddTag),
    isAddTagMutationLoading,
    formState,
  };
};
