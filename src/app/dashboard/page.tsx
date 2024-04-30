import { PageHeader } from "@/components/common/PageHeader";

const Dashboard = () => {
  return (
    <div>
      <PageHeader
        title="Overview"
        breadcrumbs={[
          {
            title: "Dashboard",
            key: "dashboard",
          },
          {
            title: "Overview",
            path: "/",
            key: "overview",
          },
        ]}
      />
    </div>
  );
};

export default Dashboard;
