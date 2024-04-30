import { create } from "zustand";

interface ProjectStore {
  projects: any[];
  setProjects: (projects: any) => void;
  deleteProject: (id: number) => void;
}

const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  setProjects: (projects: any) => set({ projects }),
  deleteProject: (id: number) => set((state) => ({ projects: state.projects.filter((project) => project.id !== id) })),
}));

export default useProjectStore;
