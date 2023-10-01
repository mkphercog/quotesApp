import { ColorMode } from "@aws-amplify/ui-react";

export type Action = { type: "SET_COLOR_MODE"; payload: State };

export interface State {
  colorMode: ColorMode;
}

export type Dispatch = (action: Action) => void;
