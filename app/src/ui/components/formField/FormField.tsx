import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type FormFieldProps<T extends FieldValues> = {
  label: string;
  id: string;
  type: "text" | "password" | "email" | "number";
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  transform?: (value: string) => string;
};

export default function FormField<T extends FieldValues>({
  control,
  id,
  type,
  label,
  name,
  placeholder,
  transform,
}: FormFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          <Input
            {...field}
            aria-invalid={fieldState.invalid}
            id={id}
            type={type}
            placeholder={placeholder}
            onChange={(e) => {
              const value = transform
                ? transform(e.target.value)
                : e.target.value;
              field.onChange(value);
            }}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
