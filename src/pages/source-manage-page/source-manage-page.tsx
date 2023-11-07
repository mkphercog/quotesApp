import { ManagePageRwdWrapper } from "lib/components/manage";
import { FC } from "react";
import { AddSourceSection, ManageSourceListSection } from "./components";

export const SourceManagePage: FC = () => {
  return (
    <ManagePageRwdWrapper
      addingSection={<AddSourceSection />}
      listSection={<ManageSourceListSection />}
    />
  );
};
