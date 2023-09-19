import { FC } from "react";
import {
  Button,
  Flex,
  SelectField,
  Text,
  TextAreaField,
} from "@aws-amplify/ui-react";
import { FormState, UseFormRegister, UseFormReset } from "react-hook-form";
import { EagerQuoteDataModel, EagerSourceData, EagerTagData } from "models";

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
  isError: boolean;
  isLoading: boolean;
}

export const QuoteForm: FC<QuoteFormProps> = ({
  sourceList,
  tagList,
  onSubmit,
  submitButtonText,
  register,
  reset,
  formState,
  isError,
  isLoading,
}) => {
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
          label="Treść cytatu"
          {...register("content", { required: true, maxLength: 256 })}
        />
        {formState.errors.content && (
          <Text color="font.error">Pole wymagane</Text>
        )}
        <TextAreaField
          marginTop="20px"
          label="Komentarz"
          {...register("comment", { maxLength: 256 })}
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

        <Button
          marginTop="20px"
          type="submit"
          disabled={isError || isLoading || !formState.isDirty}
        >
          {submitButtonText}
        </Button>

        {formState.isDirty && (
          <Button marginLeft="20px" onClick={() => reset()}>
            Wyczyść
          </Button>
        )}
      </form>
    </Flex>
  );
};
