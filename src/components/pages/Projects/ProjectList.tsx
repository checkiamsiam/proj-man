"use client";
import { useRouter } from "@/lib/router-events";
import { getAllProjects } from "@/service/project/getProjects";
import useProjectStore from "@/stores/projectsStore";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Dropdown, Table, TableColumnProps } from "antd";

const ProjectList = () => {
  const router = useRouter();
  const { projects, setProjects , deleteProject } = useProjectStore();
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await getAllProjects();
      setProjects(res.data);
      return res;
    },
  });



  const columns: TableColumnProps<any>[] = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },

    {
      title: "Action",
      dataIndex: "id",
      className: "text-center",
      render: function (data) {
        return (
          <div>
            <div className="flex justify-center items-center gap-5 max-sm:hidden">
              <Button size="small" onClick={() => router.push(`/dashboard/projects/details/${data}`)}>
                view
              </Button>
              <Button size="small" onClick={() => router.push(`/dashboard/projects/edit/${data}`)}>
                edit
              </Button>
              <Button size="small" onClick={() => deleteProject(data)}>
                Delete
              </Button>
            </div>
            <div className="sm:hidden">
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "view",
                      label: "View",
                      onClick: () => router.push(`/dashboard/projects/details/${data}`),
                    },
                    {
                      key: "edit",
                      label: "Edit",
                      onClick: () => router.push(`/dashboard/projects/edit/${data}`),
                    },
                    {
                      key: "delete",
                      label: "Delete",
                      danger: true,
                      onClick: () => deleteProject(data),
                    },
                  ],
                }}
                trigger={["click"]}
                className="cursor-pointer"
              >
                <InfoCircleOutlined />
              </Dropdown>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table loading={isLoading} columns={columns} dataSource={projects} pagination={false} className="overflow-auto w-full" />
    </div>
  );
};

export default ProjectList;
