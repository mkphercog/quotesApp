import { BaseForm, useBaseForm } from "lib/components/form";
import {
  ManageListCard,
  ManageListCardActions,
  ManageListWrapper,
} from "lib/components/manage";

import { defaultValues, validationSchema } from "../../validation";
import { useEffect } from "react";
import { useManageTag } from "../../hooks";

import styles from "./manage-tag-list-section.module.scss";
import { NotEditableTagContent } from "./not-editable-tag-content/not-editable-tag-content";
import { EditableTagContent } from "./editable-tag-content/editable-tag-content";

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
      <BaseForm
        id={currentTagId || ""}
        formParams={formParams}
        onSubmit={handleUpdateTag}
      >
        {tagList.map((tag) => {
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
