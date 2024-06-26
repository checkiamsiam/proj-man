"use client";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

const FormYearPicker = ({ name, label, picker }: { name: string; label?: string; picker: "year" | "time" }) => {
  const { control } = useFormContext();
  return (
    <>
      {label ? label : null}
      <br />
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <DatePicker
              style={{ width: "100%",  fontSize: "15px", backgroundColor: "#FAFAFA" }}
              defaultValue={field.value}
              value={field.value ? dayjs().year(field.value) : null}
              picker={picker}
              size="large"
              onChange={(_, dateString) => {
                field.onChange(dateString);
              }}
            />
          );
        }}
      />
    </>
  );
};

export default FormYearPicker;
