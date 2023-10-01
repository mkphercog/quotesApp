import { Button } from "@aws-amplify/ui-react";
import { MoonFillIcon, SunFillIcon } from "lib/icons";
import { useColorMode } from "lib/providers/color-mode";
import { FC } from "react";
import styles from "./color-mode-toggler.module.scss";

export const ColorModeToggler: FC = () => {
  const { colorMode, setCurrentColorMode } = useColorMode();

  return (
    <Button
      className={styles.colorModeToggleButton}
      variation="link"
      onClick={setCurrentColorMode}
    >
      {colorMode === "dark" ? (
        <MoonFillIcon className={styles.moonIcon} />
      ) : (
        <SunFillIcon className={styles.sunIcon} />
      )}
    </Button>
  );
};
