import { PageHeader } from "@/components/common/PageHeader";
import ProjectList from "@/components/pages/Projects/ProjectList";

const Projects = () => {
  return (
    <div>
      <PageHeader
        title="Projects List"
        breadcrumbs={[
          {
            title: "Dashboard",
            key: "dashboard",
          },
          {
            title: "Projects",
            key: "overview",
          },
        ]}
      />
      <ProjectList />
    </div>
  );
};

export default Projects;
