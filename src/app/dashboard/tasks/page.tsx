"use client";
import { PageHeader } from "@/components/common/PageHeader";
import Form from "@/components/form/Form";
import FormDatePicker from "@/components/form/FormDatePicker";
import FormInput from "@/components/form/FormInput";
import FormTextArea from "@/components/form/FormTextArea";
import FormUserSelect from "@/components/form/FormUserSelect";
import SelectProject from "@/components/form/SelectProject";
import TaskManager from "@/components/pages/Tasks/TaskManager";
import { getAllTasks } from "@/service/tasks/getAllTask";
import useTaskStore from "@/stores/taskManagerStore";
import { useQuery } from "@tanstack/react-query";
import users from "../../../../public/data/users.json";
import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";

const Tasks = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { setActiveSlug, activeSlug, addTaskToProject } = useTaskStore();

  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await getAllTasks();
      return res;
    },
  });

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
      dueDate : data?.dueDate?.format("YYYY-MM-DD"),
      status: "to-do",
      assignee : users.find((user) => user.id === data.assigneeId)
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
          <div>
            <Button type="primary" onClick={showModal}>
              Add Task
            </Button>
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
