"use client";
import { useRouter } from "@/lib/router-events";
import { getAllProjects } from "@/service/project/getProjects";
import { useQuery } from "@tanstack/react-query";
import { Button, Table, TableColumnProps } from "antd";

const ProjectList = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => await getAllProjects()
  });

  console.log(data?.data);

  const columns: TableColumnProps<any>[] = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },

    {
      title: "Action",
      dataIndex: "id",
      className: "text-center",
      render: function (data: string) {
        return (
          <div className="flex justify-center items-center gap-5">
            <Button size="small" onClick={() => router.push(`/dashboard/projects/details/${data}`)}>
              view
            </Button>
            <Button size="small" onClick={() => router.push(`/dashboard/projects/edit/${data}`)}>
              edit
            </Button>
            <Button size="small" onClick={() => {}}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table loading={isLoading} columns={columns} dataSource={data?.data} pagination={false} />
    </div>
  );
};

export default ProjectList;
