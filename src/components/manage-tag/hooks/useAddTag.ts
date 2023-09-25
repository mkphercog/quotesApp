import { useAddTagMutation } from "api/tags";
import { EagerTagData } from "models";

import { useForm } from "react-hook-form";

type TagBasicDataType = Pick<EagerTagData, "name">;

export const useAddTag = () => {
  const { addTagDataMutation, isAddTagMutationLoading } = useAddTagMutation();

  const formData = useForm<TagBasicDataType>({
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const handleAddTag = (newTagData: TagBasicDataType) => {
    addTagDataMutation({
      name: newTagData.name?.trim(),
    });
    formData.reset();
  };

  return {
    ...formData,
    handleAddTag: formData.handleSubmit(handleAddTag),
    isAddTagMutationLoading,
  };
};
