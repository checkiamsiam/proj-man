import { create } from "zustand";

interface TaskStore {
  activeSlug: string | null;
  setActiveSlug: (slug: string) => void;
  projectWiseInitialTasks: { slug: any; state: any }[];
  setProjectWiseInitialTasks: (projectWiseInitialTasks: any) => void;
  editProjectWiseInitialTasks: (slug: any, payload: any) => void;
  // addTaskToProject: (slug: number, data: any) => void;
  // EditTaskInProject: (slug: number, data: any) => void;
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
}));

export default useTaskStore;
