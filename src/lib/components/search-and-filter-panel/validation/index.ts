import * as yup from "yup";

export const validationSchema = yup.object({
  searchByText: yup.string(),
  filterByTag: yup.string(),
});

export type SearchByTextAndFilterValidationType = typeof validationSchema;

export type SearchByTextAndFilterValidationFormType =
  yup.InferType<SearchByTextAndFilterValidationType>;

export const defaultValues: SearchByTextAndFilterValidationFormType = {
  searchByText: "",
  filterByTag: "",
};
