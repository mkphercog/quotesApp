import { ManagePageRwdWrapper } from "lib/components/manage";
import { FC } from "react";
import { AddTagSection, ManageTagListSection } from "./components";

export const TagManagePage: FC = () => {
  return (
    <ManagePageRwdWrapper
      addingSection={<AddTagSection />}
      listSection={<ManageTagListSection />}
    />
  );
};
