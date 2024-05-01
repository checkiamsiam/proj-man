"use client";
import { getAllProjects } from "@/service/project/getProjects";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  loading?: boolean;
  handleChange?: (el: string) => void;
};

const SelectProject = ({
  size = "small",
  value,
  placeholder = "select",

  loading,
  label,
  defaultValue,
  style,
  handleChange,
}: SelectFieldProps & { style?: Record<string, any> }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await getAllProjects();
      return res;
    },
  });

  const projects = data?.data;
  const options: SelectOptions[] = !projects
    ? []
    : projects?.map((item: any) => {
        return {
          label: item?.name,
          value: item?.slug,
        };
      });

  return (
    <Select
      onChange={handleChange}
      size={size}
      loading={isLoading}
      options={options}
      value={value as any}
      style={{
        width: "100%",
        fontSize: "15px",
        backgroundColor: "#FAFAFA",
        ...style,
      }}
      placeholder={placeholder}
    />
  );
};

export default SelectProject;
