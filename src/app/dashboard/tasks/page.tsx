import { PageHeader } from "@/components/common/PageHeader";

const Tasks = () => {
  return (
    <div>
      <PageHeader
        title="Task Manager"
        breadcrumbs={[
          {
            title: "Dashboard",
            key: "dashboard",
          },
          {
            title: "Tasks",
            key: "overview",
          },
        ]}
      />
      <div>
        <p className="text-center text-xl">Tasks Will Goes Here</p>
      </div>
    </div>
  );
};

export default Tasks;
