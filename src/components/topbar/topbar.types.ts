import { ColorMode } from "@aws-amplify/ui-react";
import { Dispatch, SetStateAction } from "react";

export interface NavLinkClassNameProps {
  isActive: boolean;
  isPending: boolean;
}

export interface TopbarProps {
  colorMode: ColorMode;
  setColorMode: Dispatch<SetStateAction<ColorMode>>;
}
