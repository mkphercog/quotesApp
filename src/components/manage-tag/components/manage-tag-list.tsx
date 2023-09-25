import { Flex, Loader, Text, TextField } from "@aws-amplify/ui-react";
import { ListWrapper } from "components/shared/list-wrapper/list-wrapper";
import { ManageListItem } from "components/shared/manage-list-item/manage-list-item";
import { EagerTagData } from "models";
import { FC, useState } from "react";

import { useManageTag } from "../hooks/useManageTag";
import {
  ERROR_MAPPER,
  FieldErrorTypes,
  TAG_NAME_MAX_LENGTH,
} from "../manage-tag.constants";

export const ManageTagList = () => {
  const { tagList, isTagListLoading } = useManageTag();
  const [editMode, setEditMode] = useState({
    isOn: false,
    currentTagId: "",
  });

  return (
    <ListWrapper isEmptyList={!tagList?.length} isLoading={isTagListLoading}>
      {tagList?.map((tag) => {
        return (
          <ManageTagItem
            key={tag.id}
            tag={tag}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        );
      })}
    </ListWrapper>
  );
};

interface ManageTagItemProps {
  tag: EagerTagData;
  editMode: {
    isOn: boolean;
    currentTagId: string;
  };
  setEditMode: React.Dispatch<
    React.SetStateAction<{
      isOn: boolean;
      currentTagId: string;
    }>
  >;
}

const ManageTagItem: FC<ManageTagItemProps> = ({
  tag,
  editMode,
  setEditMode,
}) => {
  const {
    register,
    formState,
    handleSubmit,
    reset,
    handleUpdateTag,
    isUpdateTagMutationLoading,
    handleDeleteTag,
    isDeleteTagMutationLoading,
    watch,
  } = useManageTag();

  const watchName = watch("name");
  const isError = !!Object.entries(formState.errors).length;
  const isSubmitButtonDisabled =
    !watchName || watchName === tag.name || isError;

  const isCurrentTagEdited = editMode.isOn && editMode.currentTagId === tag.id;

  const handleEditTag = (tagData: Pick<EagerTagData, "id">) => {
    setEditMode((prevState) => ({
      isOn: editMode.currentTagId !== tagData.id ? true : !prevState.isOn,
      currentTagId: tagData.id,
    }));
  };

  return (
    <ManageListItem
      editFields={
        <TextField
          gap="0"
          label={
            <Flex justifyContent="space-between" alignItems="flex-end">
              <Text></Text>
              <Text fontSize="x-small">{`${
                watchName?.length || 0
              }/${TAG_NAME_MAX_LENGTH}`}</Text>
            </Flex>
          }
          hasError={!!formState.errors.name?.type}
          errorMessage={
            ERROR_MAPPER[formState.errors.name?.type as FieldErrorTypes]
          }
          defaultValue={tag.name || ""}
          {...register("name", {
            required: true,
            value: tag.name,
            maxLength: TAG_NAME_MAX_LENGTH,
          })}
        />
      }
      noEditFields={
        <>
          <Text
            marginTop="15px"
            padding="8px 16px"
            border="1px solid"
            borderColor="border.primary"
            borderRadius="small"
          >
            {isUpdateTagMutationLoading ? <Loader /> : tag.name}
          </Text>
        </>
      }
      isCurrentItemEdited={isCurrentTagEdited}
      isDeleteMutationLoading={isDeleteTagMutationLoading}
      isSubmitButtonDisabled={isSubmitButtonDisabled}
      onClickCancel={() => handleEditTag(tag)}
      onClickDelete={() => {
        handleDeleteTag(tag);
        setEditMode({
          currentTagId: "",
          isOn: false,
        });
      }}
      onClickSettings={() => {
        setEditMode({
          currentTagId: tag.id,
          isOn: true,
        });
        reset();
      }}
      onSubmit={handleSubmit((updateTagData) => {
        handleUpdateTag(updateTagData, tag);
        setEditMode({
          currentTagId: "",
          isOn: false,
        });
      })}
    />
  );
};
