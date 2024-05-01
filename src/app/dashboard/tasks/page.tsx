"use client";
import { PageHeader } from "@/components/common/PageHeader";
import SelectProject from "@/components/form/SelectProject";
import TaskManager from "@/components/pages/Tasks/TaskManager";
import useTaskStore from "@/stores/taskManagerStore";
import { Col, Row } from "antd";

const Tasks = () => {
  const { setActiveSlug , activeSlug } = useTaskStore();
  const handleChange = (value: string) => {
    setActiveSlug(value);
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
      </div>
      <div className="mt-5">{activeSlug && <TaskManager />}</div>
    </div>
  );
};

export default Tasks;
