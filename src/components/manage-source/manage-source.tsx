import { ManageWrapper } from "components/shared/manage-wrapper/manage-wrapper";
import { FC } from "react";
import { AddSourceForm } from "./components/add-source-form";
import { ManageSourceList } from "./components/manage-source-list";

export const ManageSource: FC = () => {
  return (
    <ManageWrapper>
      <ManageSourceList />
      <AddSourceForm />
    </ManageWrapper>
  );
};
