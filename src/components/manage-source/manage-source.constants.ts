import { FieldError } from "react-hook-form";

export const SOURCE_MAX_LENGTH = 100;

export type FieldErrorTypes = Extract<
  FieldError["type"],
  "required" | "maxLength"
>;

export const SOURCE_ERROR_MAPPER: Record<FieldErrorTypes, string> = {
  required: "Pole wymagane.",
  maxLength: `Maksymalna liczba znaków to: ${SOURCE_MAX_LENGTH}.`,
};
