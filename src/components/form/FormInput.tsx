"use client";
import { generateErrorMessage } from "@/utils/Form/schemaValidator";
import { Input, InputProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";
interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
}

const FormInput = ({ name, type, size = "small", value, id, placeholder, validation, label, required , style , disabled }: IInput & InputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = generateErrorMessage(errors, name);

  return (
    <>
      {label ? label : null}
      {required ? (
        <span
          style={{
            color: "red",
          }}
        >
          *
        </span>
      ) : null}
      <Controller
        control={control}
        name={name}
        disabled={disabled}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              type={type}
              size={size}
              required={required}
              placeholder={placeholder}
              style={{  fontSize: "15px", backgroundColor: "#FAFAFA" , ...style }}
              {...field}
              value={value ? value : field.value}
            />
          ) : (
            <Input
              required={required}
              type={type}
              size={size}
              placeholder={placeholder}
              style={{  fontSize: "15px", backgroundColor: "#FAFAFA" ,  ...style }}
              {...field}
              value={value ? value : field.value}
            />
          )
        }
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormInput;
