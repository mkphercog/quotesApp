import * as yup from "yup";

export const SOURCE_VALUE_MAX_LENGTH = 100;

export const validationSchema = yup.object({
  title: yup
    .string()
    .test("oneRequired", "Przynajmniej jedno pole wymagane", function () {
      return this.parent.author || this.parent.title;
    })
    .max(
      SOURCE_VALUE_MAX_LENGTH,
      `Maksymalna liczba znaków to: ${SOURCE_VALUE_MAX_LENGTH}.`
    ),
  author: yup
    .string()
    .test("oneRequired", "Przynajmniej jedno pole wymagane", function () {
      return this.parent.author || this.parent.title;
    })
    .max(
      SOURCE_VALUE_MAX_LENGTH,
      `Maksymalna liczba znaków to: ${SOURCE_VALUE_MAX_LENGTH}.`
    ),
});

export type SourceValidationFormType = yup.InferType<typeof validationSchema>;

export const defaultValues: SourceValidationFormType = {
  author: "",
  title: "",
};
