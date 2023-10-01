import { getColorModeFromLocalStorage } from "lib/utils";
import { State } from "./color-mode.types";

export const INITIAL_STATE: State = {
  colorMode: getColorModeFromLocalStorage(),
};
