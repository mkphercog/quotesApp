import { useEffect } from "react";

import {
  ManageListCard,
  ManageListCardActions,
  ManageListWrapper,
} from "lib/components/manage";
import { useManageTag } from "../../hooks";
import { BaseForm, useBaseForm } from "lib/components/form";
import { defaultValues, validationSchema } from "../../validation";
import { SearchAndFilterPanel, useSearchAndFilterPanel } from "lib/components";
import { EditableTagContent } from "./editable-tag-content/editable-tag-content";
import { NotEditableTagContent } from "./not-editable-tag-content/not-editable-tag-content";

import styles from "./manage-tag-list-section.module.scss";

export const ManageTagListSection = () => {
  const {
    tagList,
    currentTagId,
    setCurrentTagId,
    isTagListLoading,
    handleUpdateTag,
    handleDeleteTag,
    isManageTagLoading,
    handleCancel,
  } = useManageTag();

  const { filteredList, formParams: searchFormParams } =
    useSearchAndFilterPanel({
      list: tagList.map((item) => ({
        ...item,
        textToSearch: item.name || "",
      })),
      isLoading: isTagListLoading,
    });
  const list = filteredList ? filteredList : tagList;

  const formParams = useBaseForm({
    defaultValues,
    validationSchema,
  });

  useEffect(() => {
    const currentTag = tagList.find((tag) => tag.id === currentTagId);

    formParams.reset({
      name: currentTag?.name || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTagId]);

  const isSubmitDisabled = !formParams.formState.isDirty || isManageTagLoading;

  return (
    <ManageListWrapper
      isEmptyList={!tagList.length}
      isLoading={isTagListLoading}
    >
      <SearchAndFilterPanel
        className={styles.searchPanel}
        formParams={searchFormParams}
        numberOfFoundItems={filteredList?.length}
      />
      <BaseForm
        id={currentTagId || ""}
        formParams={formParams}
        onSubmit={handleUpdateTag}
      >
        {list.map((tag) => {
          const isCurrentItemEdited = tag.id === currentTagId;

          return (
            <ManageListCard
              key={tag.id}
              className={styles.from}
              itemData={tag}
              currentId={currentTagId}
            >
              {isCurrentItemEdited && (
                <>
                  <EditableTagContent
                    isCurrentItemEdited={isCurrentItemEdited}
                    isLoading={isManageTagLoading}
                  />

                  <ManageListCardActions
                    onCancelClick={handleCancel}
                    deleteButton={{
                      onClick: handleDeleteTag,
                      isDisabled: isManageTagLoading,
                    }}
                    submitButton={{
                      isDisabled: isSubmitDisabled,
                    }}
                  />
                </>
              )}

              {!isCurrentItemEdited && (
                <NotEditableTagContent
                  name={tag.name}
                  onSettingsClick={() => setCurrentTagId(tag.id)}
                />
              )}
            </ManageListCard>
          );
        })}
      </BaseForm>
    </ManageListWrapper>
  );
};
