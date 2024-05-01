import { create } from "zustand";

interface TaskStore {
  activeSlug: string | null;
  setActiveSlug: (slug: string) => void;
  projectWiseInitialTasks: { slug: any; state: any }[];
  setProjectWiseInitialTasks: (projectWiseInitialTasks: any) => void;
  editProjectWiseInitialTasks: (slug: any, payload: any) => void;
  addTaskToProject: (slug: any, data: any) => void;
  EditTaskInProject: (slug: any, id: any, payload: any) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  activeSlug: null,
  setActiveSlug: (slug: string) => set({ activeSlug: slug }),
  projectWiseInitialTasks: [],
  setProjectWiseInitialTasks: (project: any) =>
    set((state) => {
      const todos = project.tasks.filter((task: any) => task.status === "to-do").map((task: any) => task.id);

      const inProgress = project.tasks.filter((task: any) => task.status === "in-progress").map((task: any) => task.id);

      const completed = project.tasks.filter((task: any) => task.status === "completed").map((task: any) => task.id);

      const tasks: any = {};
      project.tasks.forEach((item: any) => {
        tasks[item.id] = item;
      });

      const initialLocal = {
        tasks,
        columnOrder: ["to-do", "in-progress", "completed"],
        columns: {
          "to-do": {
            id: "to-do",
            title: "TO-DO",
            taskIds: todos,
          },
          "in-progress": {
            id: "in-progress",
            title: "IN-PROGRESS",
            taskIds: inProgress,
          },
          completed: {
            id: "completed",
            title: "UNDER REVIEW",
            taskIds: completed,
          },
        },
      };

      const initialState = {
        slug: project.slug,
        state: initialLocal,
      };

      const isAlready = state.projectWiseInitialTasks.find((item) => item.slug === project.slug);

      if (isAlready) {
        return { projectWiseInitialTasks: [...state.projectWiseInitialTasks] };
      } else {
        return { projectWiseInitialTasks: [...state.projectWiseInitialTasks, initialState] };
      }
    }),
  editProjectWiseInitialTasks: (slug: any, payload: any) => {
    set((state) => {
      const updatedData = { slug: slug, state: payload };

      const updatedProjects = state.projectWiseInitialTasks.map((project) => (project.slug === slug ? updatedData : project));

      return { projectWiseInitialTasks: updatedProjects };
    });
  },
  addTaskToProject: (slug: any, data: any) => {
    set((state) => {
      const project = state.projectWiseInitialTasks.find((item) => item.slug === slug);
      const updated = {
        slug: slug,
        state: {
          columnOrder: ["to-do", "in-progress", "completed"],
          tasks: {
            ...project?.state?.tasks,
            [data.id]: data,
          },
          columns: {
            ...project?.state.columns,
            "to-do": {
              ...project?.state.columns["to-do"],
              taskIds: [...project?.state?.columns["to-do"]?.taskIds, data.id],
            },
          },
        },
      };

      const updatedProjects = state.projectWiseInitialTasks.map((project) => (project.slug === slug ? updated : project));

      return { projectWiseInitialTasks: updatedProjects };
    });
  },
  EditTaskInProject: (slug: any, id: any, payload: any) => {
    set((state) => {
      const updatedProjects = state.projectWiseInitialTasks.map((project) => {
        if (project.slug === slug) {
          // Find the task to edit
          const updatedTask = { ...project.state.tasks[id], ...payload };
          // Update the tasks object with the edited task
          const updatedTasks = { ...project.state.tasks, [id]: updatedTask };

          return {
            slug: slug,
            state: {
              ...project.state,
              tasks: updatedTasks,
            },
          };
        } else {
          return project;
        }
      });

      return { projectWiseInitialTasks: updatedProjects };
    });
  },
}));

export default useTaskStore;
