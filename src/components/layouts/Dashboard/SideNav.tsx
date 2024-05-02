"use client"
import { Link } from "@/lib/router-events";
import { BranchesOutlined, InfoCircleOutlined, ProductOutlined } from "@ant-design/icons";
import { ConfigProvider, Layout, Menu, MenuProps, SiderProps, Typography } from "antd";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: "group"): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const items: MenuProps["items"] = [
  getItem(<Link href="/dashboard">Overview</Link>, "dashboard", <InfoCircleOutlined />),
  getItem(<Link href="/dashboard/projects">Projects</Link>, "projects", <ProductOutlined />),
  getItem(<Link href="/dashboard/tasks">Tasks</Link>, "tasks", <BranchesOutlined />),
];

type SideNavProps = SiderProps;

const SideNav = ({ ...others }: SideNavProps) => {
  const nodeRef = useRef(null);
  const pathname = usePathname();
  const [current, setCurrent] = useState("");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
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
      <ConfigProvider>
        <Menu mode="inline" items={items} onClick={onClick} selectedKeys={[current]} style={{ border: "none" }} />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
