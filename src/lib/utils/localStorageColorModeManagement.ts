import { ColorMode } from "@aws-amplify/ui-react";

export const getColorModeFromLocalStorage = () =>
  (localStorage.getItem("colorMode") as ColorMode) || "light";

export const setColorModeToLocalStorage = (colorMode: ColorMode) =>
  localStorage.setItem("colorMode", colorMode);
