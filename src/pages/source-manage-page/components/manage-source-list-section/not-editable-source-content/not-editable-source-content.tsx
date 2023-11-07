import { Button } from "@aws-amplify/ui-react";
import { FormTextInput } from "lib/components/form";
import { EagerSourceData } from "models";
import { FC } from "react";

import styles from "./not-editable-source-content.module.scss";

type NotEditableSourceContentProps = Pick<
  EagerSourceData,
  "author" | "title"
> & {
  onSettingsClick: () => void;
};

export const NotEditableSourceContent: FC<NotEditableSourceContentProps> = ({
  title,
  author,
  onSettingsClick,
}) => {
  return (
    <>
      <FormTextInput
        className={styles.disabledInput}
        labelText="Tytuł"
        name=""
        value={title ? title : "-"}
        disabled
      />

      <FormTextInput
        className={styles.disabledInput}
        labelText="Autor"
        name=""
        value={author ? author : "-"}
        disabled
      />

      <Button className={styles.settingsButton} onClick={onSettingsClick}>
        Ustawienia
      </Button>
    </>
  );
};
