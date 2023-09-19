import {
  Button,
  Card,
  Flex,
  Loader,
  Text,
  TextField,
} from "@aws-amplify/ui-react";
import { ListWrapper } from "components/shared/list-wrapper/list-wrapper";
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

  const isCurrentSourceEdited =
    editMode.isOn && editMode.currentSourceId === source.id;
  const isError = !!Object.entries(formState.errors).length;
  const watchTitle = watch("title")?.trim();
  const watchAuthor = watch("author")?.trim();

  const handleEditSource = (sourceData: Pick<EagerSourceData, "id">) => {
    setEditMode((prevState) => ({
      isOn: editMode.currentSourceId !== sourceData.id ? true : !prevState.isOn,
      currentSourceId: sourceData.id,
    }));
  };

  if (!isCurrentSourceEdited) {
    return (
      <Card width="100%" backgroundColor="orange.20">
        <Flex direction="column" gap="0">
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

          <Button
            width="fit-content"
            marginTop="20px"
            onClick={() => {
              setEditMode({
                currentSourceId: source.id,
                isOn: true,
              });
              reset();
            }}
            disabled={isDeleteSourceMutationLoading}
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
        onSubmit={handleSubmit((updateSourceData) => {
          handleUpdateSource(updateSourceData, source);
          setEditMode({
            currentSourceId: "",
            isOn: false,
          });
        })}
      >
        <Flex direction="column" gap="0">
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

          <Flex marginTop="20px" width="100%">
            <Button onClick={() => handleEditSource(source)}>Anuluj</Button>

            <Button
              onClick={() => {
                handleDeleteSource(source);
                setEditMode({
                  currentSourceId: "",
                  isOn: false,
                });
              }}
            >
              Usuń
            </Button>

            <Button
              type="submit"
              disabled={
                (watchTitle === source.title &&
                  watchAuthor === source.author) ||
                isError
              }
            >
              Uaktualnij
            </Button>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
};
