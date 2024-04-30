"use client";
import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  required?: boolean;
};

const FormTextArea = ({ name, label, rows, value, placeholder, required }: TextAreaProps) => {
  const { control } = useFormContext();
  return (
    <div className={`flex flex-col  w-full`}>
      <span>
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
      </span>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input.TextArea
            rows={rows}
            placeholder={placeholder}
            required={required}
            {...field}
            defaultValue={value}
            style={{ fontSize: "15px", backgroundColor: "#FAFAFA" }}
          />
        )}
      />
    </div>
  );
};

export default FormTextArea;
