import * as yup from "yup";

export const TAG_VALUE_MAX_LENGTH = 30;

export const validationSchema = yup.object({
  name: yup
    .string()
    .max(
      TAG_VALUE_MAX_LENGTH,
      `Maksymalna liczba znaków to: ${TAG_VALUE_MAX_LENGTH}`
    )
    .required("Pole wymagane."),
});

export type TagValidationFormType = yup.InferType<typeof validationSchema>;

export const defaultValues: TagValidationFormType = {
  name: "",
};
