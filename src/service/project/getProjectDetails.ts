import { axiosInstance } from "@/helpers/axios/axiosInstance";

export const getSingleProject = async (slug: string) => {
  try {
    const res = await axiosInstance.get(`/data/projects.json`);
    const project = res.data.find((project: any) => project.slug === slug);
    const tasksRes = await axiosInstance.get(`/data/tasks.json`);
    const tasks = tasksRes.data.filter((task: any) => task.projectId === project.id);
    const users = await axiosInstance.get(`/data/users.json`);

    for (const task of tasks) {
      task.assignee = users.data.find((user: any) => user.id === task.assigneeId);
    }

    const totalAssigneies = tasks.map((task: any) => task.assigneeId);

    // remove duplicate assignee
    const uniqueAssigneeIds = Array.from(new Set(totalAssigneies));

    const assignees = users.data.filter((user: any) => uniqueAssigneeIds.includes(user.id));

    project.tasks = tasks;

    project.team = assignees;

    return project;
  } catch (error: any) {
    return null
  }
};
