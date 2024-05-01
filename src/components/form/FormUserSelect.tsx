"use client";
import { getAllUsers } from "@/service/user/getUsers";
import { useQuery } from "@tanstack/react-query";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type Props = {
  name: string;
  label?: string;
  size?: "small" | "large" | undefined;
};

const FormUserSelect = ({ name, label, size = "large" }: Props) => {
  const { isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await getAllUsers();
      return res;
    },
  });

  const users = data?.data;
  const options: SelectOptions[] = !users
    ? []
    : users?.map((item: any) => {
        return {
          label: item?.name,
          value: item?.id,
        };
      });

  return <FormSelectField loading={isLoading} name={name} label={label} size={size} options={options} />;
};

export default FormUserSelect;
