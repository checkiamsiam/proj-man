"use client";
import { DatePicker, DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  onChange?: (valOne: Dayjs | null, valTwo: string) => void;
  name: string;
  label?: string;
  value?: Dayjs;
  size?: "large" | "small";
};

const FormDatePicker = ({ name, label, onChange, size = "small" }: Props) => {
  const { control, setValue } = useFormContext();

  const handleOnChange: DatePickerProps["onChange"] = (date, dateString : any) => {
    onChange ? onChange(date, dateString ) : null;
    setValue(name, date);
  };

  return (
    <div>
      {label ? label : null}
      <br />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            defaultValue={dayjs(field.value) || Date.now()}
            size={size}
            onChange={handleOnChange}
            style={{ width: "100%", fontSize: "15px", backgroundColor: "#FAFAFA" }}
          />
        )}
      />
    </div>
  );
};

export default FormDatePicker;
