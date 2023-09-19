import { ManageWrapper } from "components/shared/manage-wrapper/manage-wrapper";
import { FC } from "react";
import { AddTagForm } from "./components/add-tag-form";
import { ManageTagList } from "./components/manage-tag-list";

export const ManageTag: FC = () => {
  return (
    <ManageWrapper>
      <ManageTagList />
      <AddTagForm />
    </ManageWrapper>
  );
};
