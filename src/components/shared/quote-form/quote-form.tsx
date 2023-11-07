import { FC } from "react";
import {
  Button,
  Flex,
  SelectField,
  Text,
  TextAreaField,
} from "@aws-amplify/ui-react";
import {
  FieldError,
  FormState,
  UseFormRegister,
  UseFormReset,
  UseFormWatch,
} from "react-hook-form";
import { EagerQuoteDataModel, EagerSourceData, EagerTagData } from "models";
import { RequiredHint } from "lib/components/form";

type FieldErrorTypes = Extract<FieldError["type"], "required" | "maxLength">;

export type BasicQuoteDataType = Pick<
  EagerQuoteDataModel,
  "content" | "comment" | "quoteDataModelSourceId" | "quoteDataModelTagId"
>;

interface QuoteFormProps {
  sourceList: EagerSourceData[];
  tagList: EagerTagData[];
  onSubmit: () => void;
  submitButtonText: string;
  register: UseFormRegister<BasicQuoteDataType>;
  reset: UseFormReset<BasicQuoteDataType>;
  formState: FormState<BasicQuoteDataType>;
  watch: UseFormWatch<BasicQuoteDataType>;
  isError: boolean;
  isLoading: boolean;
}

const QUOTE_CONTENT_MAX_LENGTH = 512;

export const ERROR_MAPPER: Record<FieldErrorTypes, string> = {
  required: "Pole wymagane.",
  maxLength: `Maksymalna liczba znaków to: ${QUOTE_CONTENT_MAX_LENGTH}.`,
};

export const QuoteForm: FC<QuoteFormProps> = ({
  sourceList,
  tagList,
  onSubmit,
  submitButtonText,
  register,
  reset,
  watch,
  formState,
  isError,
  isLoading,
}) => {
  const contentCurrentLength = watch("content")?.length || 0;
  const commentCurrentLength = watch("comment")?.length || 0;

  return (
    <Flex
      padding="40px"
      boxShadow="medium"
      width="60%"
      margin="0 auto"
      backgroundColor="yellow.10"
    >
      <form
        style={{
          width: "100%",
        }}
        onSubmit={onSubmit}
      >
        <TextAreaField
          label={
            <Flex justifyContent="space-between" alignItems="flex-end">
              <Text>Treść cytatu*</Text>
              <Text fontSize="x-small">{`${contentCurrentLength}/${QUOTE_CONTENT_MAX_LENGTH}`}</Text>
            </Flex>
          }
          hasError={isError}
          maxLength={QUOTE_CONTENT_MAX_LENGTH + 10}
          errorMessage={
            ERROR_MAPPER[formState.errors.content?.type as FieldErrorTypes]
          }
          {...register("content", {
            required: true,
            maxLength: QUOTE_CONTENT_MAX_LENGTH,
          })}
        />

        <TextAreaField
          marginTop="20px"
          maxLength={QUOTE_CONTENT_MAX_LENGTH + 10}
          hasError={!!formState.errors.comment?.type}
          errorMessage={
            ERROR_MAPPER[formState.errors.comment?.type as FieldErrorTypes]
          }
          label={
            <Flex justifyContent="space-between" alignItems="flex-end">
              <Text>Komentarz</Text>
              <Text fontSize="x-small">{`${commentCurrentLength}/${QUOTE_CONTENT_MAX_LENGTH}`}</Text>
            </Flex>
          }
          {...register("comment", { maxLength: QUOTE_CONTENT_MAX_LENGTH })}
        />

        <Flex marginTop="20px">
          <SelectField
            width="50%"
            grow="1"
            label="Źródło"
            {...register("quoteDataModelSourceId")}
          >
            <option value="" label="-" />
            {sourceList?.map((source) => {
              const separator = !source.title ? "" : !source.author ? "" : "-";
              return (
                <option
                  key={source.id}
                  value={source.id}
                  label={`${source.title} ${separator} ${source.author}`}
                />
              );
            })}
          </SelectField>

          <SelectField
            width="50%"
            grow="1"
            label="Kategoria"
            {...register("quoteDataModelTagId")}
          >
            <option value="" label="-" />
            {tagList?.map((tag) => (
              <option
                key={tag.id}
                value={tag.id}
                label={tag.name ? tag.name : ""}
              />
            ))}
          </SelectField>
        </Flex>
        <RequiredHint />

        <Button
          marginTop="20px"
          type="submit"
          disabled={isError || isLoading || !formState.isDirty}
        >
          {submitButtonText}
        </Button>

        {(formState.isDirty || isError) && (
          <Button marginLeft="20px" onClick={() => reset()}>
            Wyczyść
          </Button>
        )}
      </form>
    </Flex>
  );
};
