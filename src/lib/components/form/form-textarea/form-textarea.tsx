import { Loader, Text, TextAreaField } from "@aws-amplify/ui-react";
import { ChangeEventHandler, FC } from "react";
import { useController } from "react-hook-form";

import styles from "./form-textarea.module.scss";

type FormTextareaProps = {
  labelText: string;
  name: string;
  className?: string;
  maxLength?: number;
  isRequired?: boolean;
  showCounter?: boolean;
  disabled?: boolean;
  value?: string | number | readonly string[] | undefined;
  isLoading?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

export const FormTextarea: FC<FormTextareaProps> = ({
  labelText,
  name,
  className,
  maxLength,
  isRequired = false,
  showCounter = true,
  disabled,
  value,
  isLoading = false,
  onChange,
}) => {
  const { field, fieldState } = useController({ name });

  return (
    <TextAreaField
      className={className}
      label={
        <div className={styles.labelWrapper}>
          <Text>
            {labelText} {isRequired && " *"} {isLoading && <Loader />}
          </Text>
          {showCounter && maxLength && (
            <Text fontSize="x-small">{`${
              field?.value?.length ?? 0
            }/${maxLength}`}</Text>
          )}
        </div>
      }
      hasError={!!fieldState.error}
      errorMessage={fieldState.error?.message}
      {...field}
      onChange={(event) => {
        field.onChange(event);
        onChange?.(event);
      }}
      maxLength={maxLength ? maxLength + 10 : undefined}
      disabled={disabled}
      value={value || field.value}
    />
  );
};
