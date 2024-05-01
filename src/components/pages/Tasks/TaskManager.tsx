"use client";
import { getSingleProject } from "@/service/project/getProjectDetails";
import useTaskStore from "@/stores/taskManagerStore";
import { useQuery } from "@tanstack/react-query";
import { Col, Row } from "antd";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const reorderColumnList = (sourceCol: any, startIndex: any, endIndex: any) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

export default function TaskManager() {
  const { activeSlug, projectWiseInitialTasks, setProjectWiseInitialTasks, editProjectWiseInitialTasks } = useTaskStore();
  const state = projectWiseInitialTasks.find((item) => item.slug === activeSlug)?.state;

  useQuery({
    queryKey: [`project-${activeSlug}`],
    queryFn: async () => {
      const res = await getSingleProject(activeSlug as string);
      setProjectWiseInitialTasks(res);
      return res;
    },
  });

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // If the user drops within the same column but in a different positoin
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol?.id === destinationCol?.id) {
      const newColumn = reorderColumnList(sourceCol, source?.index, destination?.index);

      const newState = {
        ...state,
        columns: {
          ...state?.columns,
          [newColumn?.id]: newColumn,
        },
      };
      editProjectWiseInitialTasks(activeSlug, newState);
      return;
    }

    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol?.taskIds);
    const [removed] = startTaskIds.splice(source?.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol?.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    editProjectWiseInitialTasks(activeSlug, newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col  min-h-screen">
        <Row>
          {state?.columnOrder?.map((columnId: any) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId: any) => state.tasks[taskId]);

            return (
              <Col xs={24} md={8}>
                <Column key={column.id} column={column} tasks={tasks} />{" "}
              </Col>
            );
          })}
        </Row>
      </div>
    </DragDropContext>
  );
}
const initialData = {
  tasks: {
    1: { id: 1, content: "Configure Next.js application" },
    2: { id: 2, content: "Configure Next.js , tailwind , Chakra-UI" },
    3: { id: 3, content: "Create sidebar navigation menu and header" },
    4: { id: 4, content: "Create page Main Body" },
    5: { id: 5, content: "Create Todo Func" },
  },
  columns: {
    "to-do": {
      id: "to-do",
      title: "TO-DO",
      taskIds: [1, 2, 3, 4, 5],
    },
    "in-progress": {
      id: "in-progress",
      title: "IN-PROGRESS",
      taskIds: [],
    },
    completed: {
      id: "completed",
      title: "UNDER REVIEW",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["to-do", "in-progress", "completed"],
};
