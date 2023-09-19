import {
  Button,
  Card,
  Flex,
  Loader,
  Text,
  TextField,
} from "@aws-amplify/ui-react";
import { ListWrapper } from "components/shared/list-wrapper/list-wrapper";
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

  const isCurrentTagEdited = editMode.isOn && editMode.currentTagId === tag.id;
  const watchName = watch("name")?.trim();

  const handleEditTag = (tagData: Pick<EagerTagData, "id">) => {
    setEditMode((prevState) => ({
      isOn: editMode.currentTagId !== tagData.id ? true : !prevState.isOn,
      currentTagId: tagData.id,
    }));
  };

  if (!isCurrentTagEdited) {
    return (
      <Card width="100%" backgroundColor="orange.20">
        <Flex direction="column" gap="0">
          <Text
            padding="8px 16px"
            border="1px solid"
            borderColor="border.primary"
            borderRadius="small"
          >
            {isUpdateTagMutationLoading ? <Loader /> : tag.name}
          </Text>

          <Button
            width="fit-content"
            marginTop="20px"
            onClick={() => {
              setEditMode({
                currentTagId: tag.id,
                isOn: true,
              });
              reset();
            }}
            disabled={isDeleteTagMutationLoading}
          >
            Ustawienia
          </Button>
        </Flex>
      </Card>
    );
  }

  return (
    <Card width="100%" backgroundColor="orange.40">
      <form
        onSubmit={handleSubmit((updateTagData) => {
          handleUpdateTag(updateTagData, tag);
          setEditMode({
            currentTagId: "",
            isOn: false,
          });
        })}
      >
        <Flex direction="column" gap="0">
          <TextField
            gap="0"
            label={undefined}
            defaultValue={tag.name || ""}
            {...register("name", {
              required: true,
              value: tag.name,
              maxLength: TAG_NAME_MAX_LENGTH,
            })}
          />

          {formState.errors.name?.type && (
            <Text color="font.error">
              {ERROR_MAPPER[formState.errors.name?.type as FieldErrorTypes]}
            </Text>
          )}

          <Flex marginTop="20px" width="100%">
            <Button onClick={() => handleEditTag(tag)}>Anuluj</Button>

            <Button
              onClick={() => {
                handleDeleteTag(tag);
                setEditMode({
                  currentTagId: "",
                  isOn: false,
                });
              }}
            >
              Usuń
            </Button>

            <Button
              type="submit"
              disabled={watchName === tag.name || !!formState.errors.name?.type}
            >
              Uaktualnij
            </Button>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
};
