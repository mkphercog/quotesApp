import { FieldError } from "react-hook-form";

export const TAG_NAME_MAX_LENGTH = 30;

export type FieldErrorTypes = Extract<
  FieldError["type"],
  "required" | "maxLength"
>;

export const ERROR_MAPPER: Record<FieldErrorTypes, string> = {
  required: "Pole wymagane.",
  maxLength: `Maksymalna liczba znaków to: ${TAG_NAME_MAX_LENGTH}.`,
};
