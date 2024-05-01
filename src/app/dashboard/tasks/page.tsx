"use client";
import { PageHeader } from "@/components/common/PageHeader";
import Form from "@/components/form/Form";
import FormDatePicker from "@/components/form/FormDatePicker";
import FormInput from "@/components/form/FormInput";
import FormTextArea from "@/components/form/FormTextArea";
import FormUserSelect from "@/components/form/FormUserSelect";
import SelectProject from "@/components/form/SelectProject";
import TaskManager from "@/components/pages/Tasks/TaskManager";
import { getSingleProject } from "@/service/project/getProjectDetails";
import useTaskStore from "@/stores/taskManagerStore";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import users from "../../../../public/data/users.json";

const Tasks = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { setActiveSlug, activeSlug, addTaskToProject, projectWiseInitialTasks } = useTaskStore();
  const state = projectWiseInitialTasks.find((item) => item.slug === activeSlug)?.state;

  const { data } = useQuery({
    queryKey: ["project", activeSlug],
    queryFn: async () => {
      const res = await getSingleProject(activeSlug as string);
      return res;
    },
  });

  const team = data?.team;

  console.log(data?.team);

  const handleChange = (value: string) => {
    setActiveSlug(value);
  };
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleAdd = (data: any) => {
    setConfirmLoading(true);
    const payload = {
      ...data,
      id: data?.data?.length + 1,
      dueDate: data?.dueDate?.format("YYYY-MM-DD"),
      status: "to-do",
      assignee: users.find((user) => user.id === data.assigneeId),
    };

    addTaskToProject(activeSlug, payload);

    setOpen(false);
    setConfirmLoading(false);
  };
  return (
    <div>
      <PageHeader
        title="Task Manager"
        breadcrumbs={[
          {
            title: "Dashboard",
            key: "dashboard",
          },
          {
            title: "Tasks",
            key: "overview",
          },
        ]}
      />
      <div>
        <Row justify="end">
          <Col xs={24} md={8}>
            <SelectProject size="large" handleChange={handleChange} />
          </Col>
        </Row>
        {activeSlug && (
          <div className="sm:flex justify-between items-center mt-5">
            <Button type="primary" onClick={showModal}>
              Add Task
            </Button>
            <div>
              <p>
                Filter:{" "}
                {team?.map((member: any , i:number) => {
                  return <span key={i} className="hover:text-blue-600 cursor-pointer">{member.name} | </span>;
                })}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-5">{activeSlug && <TaskManager />}</div>
      <Modal title="Add Task" open={open} confirmLoading={confirmLoading} onCancel={handleCancel} footer={false}>
        <Form submitHandler={handleAdd}>
          <FormInput label="Title" name="title" size="large" />
          <FormUserSelect label="Assignee" name="assigneeId" />
          <FormDatePicker label="Deadline" name="dueDate" size="large" />
          <FormTextArea label="Description" name="description" rows={5} />
          <Button type="primary" htmlType="submit" size="large" className="mt-5">
            Confirm
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Tasks;
