import { createContext } from "react";

import type { Dispatch, State } from "./color-mode.types";

export interface ColorModeContextType {
  state: State;
  dispatch: Dispatch;
}

export const ColorModeContext = createContext<ColorModeContextType | undefined>(
  undefined
);
