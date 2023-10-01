import { setColorModeToLocalStorage } from "lib/utils";
import { useContext } from "react";
import { ColorModeContext } from "./color-mode.context";

export const useColorMode = () => {
  const context = useContext(ColorModeContext);

  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }

  const { state, dispatch } = context;

  const actions = {
    setCurrentColorMode: () => {
      const toggledColorMode = state.colorMode === "dark" ? "light" : "dark";

      dispatch({
        type: "SET_COLOR_MODE",
        payload: {
          colorMode: toggledColorMode,
        },
      });

      setColorModeToLocalStorage(toggledColorMode);
    },
  };

  return {
    ...state,
    ...actions,
  };
};
