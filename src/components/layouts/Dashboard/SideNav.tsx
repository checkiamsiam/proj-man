"use client";
import { Link, useRouter } from "@/lib/router-events";
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
        style={{ border: "none" }}
        items={[
          {
            label: <Link href={`/dashboard`}>Overview</Link>,
            key: "/dashboard",
            icon: <InfoCircleOutlined />,
          },
          {
            label: <Link href={`/dashboard/projects`}>Projects</Link>,
            key: "/dashboard/projects",
            icon: <ProductOutlined />,
          },
          {
            label: <Link href={`/dashboard/tasks`}>Tasks</Link>,
            key: "/dashboard/tasks",
            icon: <BranchesOutlined />,
          },
        ]}
      />
    </Sider>
  );
};

export default SideNav;
