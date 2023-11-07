import { BaseForm, useBaseForm } from "lib/components/form";
import {
  ManageListCard,
  ManageListCardActions,
  ManageListWrapper,
} from "lib/components/manage";
import { defaultValues, validationSchema } from "../../validation";
import { useEffect } from "react";
import { useManageSource } from "../../hooks";
import { NotEditableSourceContent } from "./not-editable-source-content/not-editable-source-content";
import { EditableSourceContent } from "./editable-source-content/editable-source-content";

import styles from "./manage-source-list-section.module.scss";

export const ManageSourceListSection = () => {
  const {
    sourceList,
    currentSourceId,
    setCurrentSourceId,
    isSourceListLoading,
    handleUpdateSource,
    handleDeleteSource,
    isManageSourceLoading,
    handleCancel,
  } = useManageSource();

  const formParams = useBaseForm({
    defaultValues,
    validationSchema,
  });

  const authorValue = formParams.watch("author");
  const titleValue = formParams.watch("title");

  useEffect(() => {
    if (
      formParams.formState.errors.title?.type === "oneRequired" ||
      formParams.formState.errors.author?.type === "oneRequired"
    ) {
      formParams.clearErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorValue, titleValue]);

  useEffect(() => {
    const currentSource = sourceList.find(
      (source) => source.id === currentSourceId
    );

    formParams.reset({
      author: currentSource?.author || "",
      title: currentSource?.title || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSourceId]);

  const isSubmitDisabled =
    !formParams.formState.isDirty || isManageSourceLoading;

  return (
    <ManageListWrapper
      isEmptyList={!sourceList.length}
      isLoading={isSourceListLoading}
    >
      <BaseForm
        id={currentSourceId || ""}
        formParams={formParams}
        onSubmit={handleUpdateSource}
      >
        {sourceList.map((source) => {
          const isCurrentItemEdited = source.id === currentSourceId;

          return (
            <ManageListCard
              key={source.id}
              className={styles.from}
              itemData={source}
              currentId={currentSourceId}
            >
              {isCurrentItemEdited && (
                <>
                  <EditableSourceContent
                    isCurrentItemEdited={isCurrentItemEdited}
                    isLoading={isManageSourceLoading}
                  />

                  <ManageListCardActions
                    onCancelClick={handleCancel}
                    deleteButton={{
                      onClick: handleDeleteSource,
                      isDisabled: isManageSourceLoading,
                    }}
                    submitButton={{
                      isDisabled: isSubmitDisabled,
                    }}
                  />
                </>
              )}

              {!isCurrentItemEdited && (
                <NotEditableSourceContent
                  title={source.title}
                  author={source.author}
                  onSettingsClick={() => setCurrentSourceId(source.id)}
                />
              )}
            </ManageListCard>
          );
        })}
      </BaseForm>
    </ManageListWrapper>
  );
};
