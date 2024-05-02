"use client";
import { useRouter } from "@/lib/router-events";
import { signOut } from "@/service/auth/signOut";
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, FloatButton, Layout, MenuProps, Tooltip, message, theme } from "antd";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { CSSTransition, SwitchTransition, TransitionGroup } from "react-transition-group";
import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import SideNav from "./SideNav";

const { Content } = Layout;

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const {
    token: { borderRadius },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [collapsed, setCollapsed] = useState(true);
  const [navFill, setNavFill] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = usePathname();
  const nodeRef = useRef(null);
  const floatBtnRef = useRef(null);
  const navigate = useRouter();

  const items: MenuProps["items"] = [
    {
      key: "user-logout-link",
      label: "logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: async () => {
        message.open({
          type: "loading",
          content: "signing you out",
        });
        await signOut();
        navigate.push("/login");
      },
    },
  ];

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 5) {
        setNavFill(true);
      } else {
        setNavFill(false);
      }
    });
  }, []);

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        <SideNav
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            overflow: "auto",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            background: "none",
            border: "none",
            transition: "all .2s",
          }}
        />
        <Layout
          style={{
            background: "none",
          }}
        >
          <HeaderNav
            style={{
              marginLeft: collapsed ? 0 : "200px",
              padding: "0 2rem 0 0",
              background: navFill ? "rgba(255, 255, 255, .5)" : "none",
              backdropFilter: navFill ? "blur(8px)" : "none",
              boxShadow: navFill ? "0 0 8px 2px rgba(0, 0, 0, 0.05)" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "sticky",
              top: 0,
              zIndex: 1,
              gap: 8,
              transition: "all .25s",
            }}
          >
            <Flex align="center">
              <Tooltip title={`${collapsed ? "Expand" : "Collapse"} Sidebar`}>
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              </Tooltip>
            </Flex>
            <Flex align="center" gap="small">
              <Dropdown menu={{ items }} trigger={["click"]} className="cursor-pointer">
                <Flex>
                  <Image src="/imgs/me.jpg" alt="user profile photo" height={36} width={36} style={{ borderRadius, objectFit: "cover" }} />
                </Flex>
              </Dropdown>
            </Flex>
          </HeaderNav>
          <Content
            style={{
              margin: `0 0 0 ${collapsed ? 0 : "200px"}`,
              background: "#ebedf0",
              borderRadius: collapsed ? 0 : borderRadius,
              transition: "all .25s",
              padding: "24px 32px",
              minHeight: 360,
            }}
          >
            <TransitionGroup>
              <SwitchTransition>
                <CSSTransition
                  key={`css-transition-${location}`}
                  nodeRef={nodeRef}
                  onEnter={() => {
                    setIsLoading(true);
                  }}
                  onEntered={() => {
                    setIsLoading(false);
                  }}
                  timeout={300}
                  classNames="bottom-to-top"
                  unmountOnExit
                >
                  {() => (
                    <div ref={nodeRef} style={{ background: "none" }}>
                      {children}
                    </div>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </TransitionGroup>
            <div ref={floatBtnRef}>
              <FloatButton.BackTop />
            </div>
          </Content>
          <FooterNav
            style={{
              textAlign: "center",
              marginLeft: collapsed ? 0 : "200px",
              background: "none",
            }}
          />
        </Layout>
      </Layout>
    </>
  );
};
