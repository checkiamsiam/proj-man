import { create } from "zustand";

interface ProjectStore {
  projects: any[];
  setProjects: (projects: any) => void;
  editProject: (id: number, data: any) => void;
  deleteProject: (id: number) => void;
}

const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  setProjects: (projects: any) => set({ projects }),
  editProject: (id: number, payload: any) =>
    set((state) => {
      const data = state.projects.find((project) => project.id === id);

      // update data by payload
      const updatedData = { ...data, ...payload };

      // update the project
      const updatedProjects = state.projects.map((project) => (project.id === id ? updatedData : project));

      return { projects: updatedProjects };
    }),
  deleteProject: (id: number) => set((state) => ({ projects: state.projects.filter((project) => project.id !== id) })),
}));

export default useProjectStore;
