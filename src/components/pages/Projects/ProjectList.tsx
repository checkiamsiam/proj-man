"use client";
import Form from "@/components/form/Form";
import FormInput from "@/components/form/FormInput";
import FormTextArea from "@/components/form/FormTextArea";
import { useRouter } from "@/lib/router-events";
import { getAllProjects } from "@/service/project/getProjects";
import useProjectStore from "@/stores/projectsStore";
import { ExclamationCircleFilled, InfoCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Dropdown, Modal, Table, TableColumnProps } from "antd";
import { useState } from "react";

const { confirm } = Modal;

const ProjectList = () => {
  const router = useRouter();
  const { projects, setProjects, deleteProject, editProject } = useProjectStore();
  const { isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await getAllProjects();
      setProjects(res.data);
      return res;
    },
  });

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editableData, setEditableData] = useState({});

  const showModal = (data: any) => {
    setEditableData(data);
    setOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleEdit = (data: any) => {
    setConfirmLoading(true);
    editProject(data.id, data);
    setOpen(false);
    setConfirmLoading(false);
  };

  const showDeleteConfirm = (data: number) => {
    confirm({
      title: "Are you sure delete this Project?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteProject(data);
      },
    });
  };

  console.log(projects);

  const columns: TableColumnProps<any>[] = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },

    {
      title: "Action",
      className: "text-center",
      render: function (data) {
        return (
          <div>
            <div className="flex justify-center items-center gap-5 max-sm:hidden">
              <Button size="small" onClick={() => router.push(`/dashboard/projects/${data.slug}`)}>
                view
              </Button>
              <Button size="small" onClick={() => showModal(data)}>
                edit
              </Button>
              <Button size="small" onClick={() => showDeleteConfirm(data.id)}>
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
                      onClick: () => router.push(`/dashboard/projects/${data.slug}`),
                    },
                    {
                      key: "edit",
                      label: "Edit",
                      onClick: showModal,
                    },
                    {
                      key: "delete",
                      label: "Delete",
                      danger: true,
                      onClick: () => showDeleteConfirm(data),
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
      <Table loading={isLoading} columns={columns}  dataSource={projects} pagination={false} className="overflow-auto w-full" />
      <Modal title="Edit Project" open={open} confirmLoading={confirmLoading} onCancel={handleCancel} footer={false}>
        <Form submitHandler={handleEdit} defaultValues={editableData}>
          <FormInput label="Name" name="name" size="large" />
          <FormTextArea label="Description" name="description" rows={5} />
          <Button type="primary" htmlType="submit" size="large" className="mt-5">
            Confirm
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectList;
