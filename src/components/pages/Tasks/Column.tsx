"use client";
import { Card, Col, Row, Typography } from "antd";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Column = ({ column, tasks }: any) => {
  return (
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
          <Card className="flex flex-col bg-gray-50 ml-3 rounded-md min-h-[700px]" ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
            {tasks.map((task: any, index: number) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <Card
                    className="my-2 bg-white min-h-[200px] rounded-[3px] outline-[2px] outline-[card-border] shadow-[0 5px 10px rgba(0, 0, 0, 0.6)]"
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <Typography.Paragraph style={{
                      fontWeight: 700
                    }}>{task?.title}</Typography.Paragraph>
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
  );
};

export default Column;
