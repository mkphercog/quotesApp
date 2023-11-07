import { Button } from "@aws-amplify/ui-react";
import { FormTextInput } from "lib/components/form";
import { EagerTagData } from "models";
import { FC } from "react";

import styles from "./not-editable-tag-content.module.scss";

type NotEditableTagContentProps = Pick<EagerTagData, "name"> & {
  onSettingsClick: () => void;
};

export const NotEditableTagContent: FC<NotEditableTagContentProps> = ({
  name,
  onSettingsClick,
}) => {
  return (
    <>
      <FormTextInput
        className={styles.disabledInput}
        labelText="Tytuł"
        name=""
        value={name || ""}
        disabled
      />

      <Button className={styles.settingsButton} onClick={onSettingsClick}>
        Ustawienia
      </Button>
    </>
  );
};
