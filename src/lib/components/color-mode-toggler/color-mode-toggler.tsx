import { Button, ColorMode } from "@aws-amplify/ui-react";
import { MoonFillIcon, SunFillIcon } from "lib/icons";
import { Dispatch, FC, SetStateAction } from "react";
import { setColorModeToLocalStorage } from "lib/utils";
import styles from "./color-mode-toggler.module.scss";

interface ColorModeTogglerProps {
  colorMode: ColorMode;
  setColorMode: Dispatch<SetStateAction<ColorMode>>;
}

export const ColorModeToggler: FC<ColorModeTogglerProps> = ({
  colorMode,
  setColorMode,
}) => {
  const handleToggleColorMode = () => {
    setColorMode((currentMode) => {
      const toggledColorMode = currentMode === "dark" ? "light" : "dark";
      setColorModeToLocalStorage(toggledColorMode);
      return toggledColorMode;
    });
  };

  return (
    <Button
      className={styles.colorModeToggleButton}
      variation="link"
      onClick={handleToggleColorMode}
    >
      {colorMode === "dark" ? (
        <MoonFillIcon className={styles.moonIcon} />
      ) : (
        <SunFillIcon className={styles.sunIcon} />
      )}
    </Button>
  );
};
