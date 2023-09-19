import { Loader, Text, TextField } from "@aws-amplify/ui-react";
import { ListWrapper } from "components/shared/list-wrapper/list-wrapper";
import { ManageListItem } from "components/shared/manage-list-item/manage-list-item";
import { EagerSourceData } from "models";
import { FC, useState } from "react";
import { useManageSource } from "../hooks/useManageSource";
import {
  FieldErrorTypes,
  SOURCE_ERROR_MAPPER,
  SOURCE_MAX_LENGTH,
} from "../manage-source.constants";

export const ManageSourceList = () => {
  const { sourceList, isSourceListLoading } = useManageSource();
  const [editMode, setEditMode] = useState({
    isOn: false,
    currentSourceId: "",
  });

  return (
    <ListWrapper
      isEmptyList={!sourceList?.length}
      isLoading={isSourceListLoading}
    >
      {sourceList?.map((source) => {
        return (
          <ManageSourceItem
            key={source.id}
            source={source}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        );
      })}
    </ListWrapper>
  );
};

interface ManageSourceItemProps {
  source: EagerSourceData;
  editMode: {
    isOn: boolean;
    currentSourceId: string;
  };
  setEditMode: React.Dispatch<
    React.SetStateAction<{
      isOn: boolean;
      currentSourceId: string;
    }>
  >;
}

const ManageSourceItem: FC<ManageSourceItemProps> = ({
  source,
  editMode,
  setEditMode,
}) => {
  const {
    register,
    formState,
    handleSubmit,
    reset,
    handleUpdateSource,
    isUpdateSourceMutationLoading,
    handleDeleteSource,
    isDeleteSourceMutationLoading,
    watch,
    clearErrors,
  } = useManageSource();

  const watchTitle = watch("title");
  const watchAuthor = watch("author");
  const isError = !!Object.entries(formState.errors).length;
  const isSubmitButtonDisabled =
    ((!watchTitle || watchTitle === source.title) &&
      (!watchAuthor || watchAuthor === source.author)) ||
    isError;

  const isCurrentSourceEdited =
    editMode.isOn && editMode.currentSourceId === source.id;

  const handleEditSource = (sourceData: Pick<EagerSourceData, "id">) => {
    setEditMode((prevState) => ({
      isOn: editMode.currentSourceId !== sourceData.id ? true : !prevState.isOn,
      currentSourceId: sourceData.id,
    }));
  };

  return (
    <ManageListItem
      editFields={
        <>
          <TextField
            gap="0"
            label="Tytuł"
            defaultValue={source.title || ""}
            {...register("title", {
              required: !watchAuthor,
              value: source.title,
              maxLength: SOURCE_MAX_LENGTH,
              onChange: () => {
                if (
                  !watchAuthor &&
                  formState.errors.author?.type === "required"
                ) {
                  clearErrors();
                }
              },
            })}
          />
          {isError && (
            <Text color="font.error">
              {
                SOURCE_ERROR_MAPPER[
                  formState.errors.title?.type as FieldErrorTypes
                ]
              }
            </Text>
          )}
          <TextField
            gap="0"
            label="Autor"
            defaultValue={source.author || ""}
            {...register("author", {
              required: !watchTitle,
              value: source.author,
              maxLength: SOURCE_MAX_LENGTH,
              onChange: () => {
                if (
                  !watchTitle &&
                  formState.errors.title?.type === "required"
                ) {
                  clearErrors();
                }
              },
            })}
          />

          {isError && (
            <Text color="font.error">
              {
                SOURCE_ERROR_MAPPER[
                  formState.errors.author?.type as FieldErrorTypes
                ]
              }
            </Text>
          )}
        </>
      }
      noEditFields={
        <>
          <Text>Tytuł</Text>
          <Text
            padding="8px 16px"
            border="1px solid"
            borderColor="border.primary"
            borderRadius="small"
            minHeight="42px"
          >
            {isUpdateSourceMutationLoading ? <Loader /> : source.title}
          </Text>

          <Text>Autor</Text>
          <Text
            padding="8px 16px"
            border="1px solid"
            borderColor="border.primary"
            borderRadius="small"
            minHeight="42px"
          >
            {isUpdateSourceMutationLoading ? <Loader /> : source.author}
          </Text>
        </>
      }
      isCurrentItemEdited={isCurrentSourceEdited}
      isDeleteMutationLoading={isDeleteSourceMutationLoading}
      isSubmitButtonDisabled={isSubmitButtonDisabled}
      onClickCancel={() => handleEditSource(source)}
      onClickDelete={() => {
        handleDeleteSource(source);
        setEditMode({
          currentSourceId: "",
          isOn: false,
        });
      }}
      onClickSettings={() => {
        setEditMode({
          currentSourceId: source.id,
          isOn: true,
        });
        reset();
      }}
      onSubmit={handleSubmit((updateSourceData) => {
        handleUpdateSource(updateSourceData, source);
        setEditMode({
          currentSourceId: "",
          isOn: false,
        });
      })}
    />
  );
};
