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
            key: "overview",
          },
        ]}
      />
      <div>
        <p className="text-center text-xl">Overview Will Goes Here</p>
      </div>
    </div>
  );
};

export default Dashboard;
