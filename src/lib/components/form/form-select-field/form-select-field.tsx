import { Loader, SelectField, Text } from "@aws-amplify/ui-react";
import { ChangeEventHandler, FC } from "react";
import { useController } from "react-hook-form";

import styles from "./form-select-field.module.scss";

interface FormSelectFieldProps {
  labelText: string;
  name: string;
  options: { id: string; name: string }[];
  className?: string;
  isRequired?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

export const FormSelectField: FC<FormSelectFieldProps> = ({
  labelText,
  name,
  options,
  className,
  isRequired,
  disabled,
  isLoading,
  onChange,
}) => {
  const { field, fieldState } = useController({ name });

  return (
    <SelectField
      className={className}
      label={
        <div className={styles.labelWrapper}>
          <Text>
            {labelText} {isRequired && " *"} {isLoading && <Loader />}
          </Text>
        </div>
      }
      hasError={!!fieldState.error}
      errorMessage={fieldState.error?.message}
      {...field}
      onChange={(event) => {
        field.onChange(event);
        onChange?.(event);
      }}
      disabled={disabled}
    >
      <option value="" label="-" />

      {options.map((option) => (
        <option key={option.id} value={option.id} label={option.name} />
      ))}
    </SelectField>
  );
};
