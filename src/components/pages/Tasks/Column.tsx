"use client";
import Form from "@/components/form/Form";
import FormDatePicker from "@/components/form/FormDatePicker";
import FormInput from "@/components/form/FormInput";
import FormTextArea from "@/components/form/FormTextArea";
import FormUserSelect from "@/components/form/FormUserSelect";
import useTaskStore from "@/stores/taskManagerStore";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Dropdown, Modal, Row, Typography } from "antd";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import users from "../../../../public/data/users.json";

const Column = ({ column, tasks }: any) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editableData, setEditableData] = useState<any>({});
  const { setActiveSlug, activeSlug, EditTaskInProject } = useTaskStore();

  const handleChange = (value: string) => {
    setActiveSlug(value);
  };
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
    console.log("payload");
    const changedData: any = {};
    for (const key in data) {
      if (editableData[key] !== data[key]) {
        if (key === "dueDate") changedData[key] = data[key].format("YYYY-MM-DD");
        else if (key === "assigneeId") changedData["assignee"] = users.find((user) => user.id === data[key]);
        else changedData[key] = data[key];
      }
    }

  

    EditTaskInProject(activeSlug, editableData?.id, changedData);

    setOpen(false);
    setConfirmLoading(false);
  };
  return (
    <>
      <Card style={{ minHeight: 700, borderRadius: "3px" }}>
        <Row justify="space-between" align="middle" style={{ padding: "1rem", marginBottom: "1rem" }}>
          <Col>
            <span
              style={{
                fontSize: "17px",
                fontWeight: 600,
                backgroundColor: column.id === "to-do" ? "#C5D7BD" : column.id === "in-progress" ? "#F5D6C6" : "#CDDC39",
                padding: "2px 10px",
                borderRadius: "5px",
              }}
            >
              {column.title}
            </span>
          </Col>
          <Col>
            <span
              style={{
                fontSize: "17px",
                fontWeight: 600,
                backgroundColor: column.id === "to-do" ? "#C5D7BD" : column.id === "in-progress" ? "#F5D6C6" : "#CDDC39",
                padding: "2px 10px",
                marginLeft: "5px",
                borderRadius: "5px",
              }}
            >
              {tasks.length}
            </span>
          </Col>
        </Row>
        <hr style={{ marginBottom: "5px" }} />

        <Droppable droppableId={column.id}>
          {(droppableProvided, droppableSnapshot) => (
            <Card
              className="flex flex-col bg-gray-50 ml-3 rounded-md min-h-[700px]"
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {tasks.map((task: any, index: number) => (
                <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                  {(draggableProvided, draggableSnapshot) => (
                    <Card
                      className="my-2 bg-white min-h-[200px] rounded-[3px] outline-[2px] outline-[card-border] shadow-[0 5px 10px rgba(0, 0, 0, 0.6)]"
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <div className="flex justify-end">
                        <Dropdown
                          menu={{
                            items: [
                              {
                                key: "edit",
                                label: "Edit",
                                onClick: () => showModal(task),
                              },
                            ],
                          }}
                          trigger={["click"]}
                          className="cursor-pointer"
                        >
                          <InfoCircleOutlined />
                        </Dropdown>
                      </div>
                      <Typography.Paragraph
                        style={{
                          fontWeight: 700,
                        }}
                      >
                        {task?.title}
                      </Typography.Paragraph>
                      <p>{task?.description}</p>
                      <p>Deadline: {task?.dueDate}</p>
                      <p>Assignee: {task?.assignee?.name}</p>
                    </Card>
                  )}
                </Draggable>
              ))}
            </Card>
          )}
        </Droppable>
      </Card>
      <Modal title="Edit Task" open={open} confirmLoading={confirmLoading} onCancel={handleCancel} footer={false}>
        <Form submitHandler={handleEdit} defaultValues={editableData}>
          <FormInput label="Title" name="title" size="large" />
          <FormUserSelect label="Assignee" name="assigneeId" />
          <FormDatePicker label="Deadline" name="dueDate" size="large" />
          <FormTextArea label="Description" name="description" rows={5} />
          <Button type="primary" htmlType="submit" size="large" className="mt-5">
            Confirm
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default Column;
