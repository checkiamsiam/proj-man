"use client";
import { useRouter } from "@/lib/router-events";
import { BranchesOutlined, InfoCircleOutlined, ProductOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps, SiderProps, Typography } from "antd";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const { Sider } = Layout;

type SideNavProps = SiderProps;

const SideNav = ({ ...others }: SideNavProps) => {
  const nodeRef = useRef(null);
  const pathname = usePathname();
  const [current, setCurrent] = useState("");
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    router.push(e.key);
  };

  useEffect(() => {
    const pathNames = pathname.split("/");
    // last value of the pathnames
    const path = pathNames[pathNames.length - 1];

    setCurrent(path);
  }, [pathname]);

  return (
    <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...others}>
      <Typography
        style={{
          fontSize: "1.5rem",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        ProzMan
      </Typography>
      <Menu
        mode="inline"
        onClick={onClick}
        style={{ border: "none" }}
        items={[
          {
            label: "Overview",
            key: "/dashboard",
            icon: <InfoCircleOutlined />,
          },
          {
            label: "Projects",
            key: "/dashboard/projects",
            icon: <ProductOutlined />,
          },
          {
            label: "Tasks",
            key: "/dashboard/tasks",
            icon: <BranchesOutlined />,
          },
        ]}
      />
    </Sider>
  );
};

export default SideNav;
