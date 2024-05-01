"use client";
import { getSingleProject } from "@/service/project/getProjectDetails";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { useParams } from "next/navigation";

const ProjectDetails = () => {
  const params = useParams();
  const {data} = useQuery({
    queryKey: ["project", params.projectSlug],
    queryFn: async () => {
      const res = await getSingleProject(params.projectSlug as string);
      return res;
    },
  });

  console.log(data);
  return <div>
    <div>
      <Button type="primary">Add Task</Button>
    </div>
  </div>;
};

export default ProjectDetails;
