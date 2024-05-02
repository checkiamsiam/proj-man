"use client"
import { Layout } from "antd";

const { Footer } = Layout;

type FooterNavProps = React.HTMLAttributes<HTMLDivElement>;

const FooterNav = ({ ...others }: FooterNavProps) => {
  return <Footer {...others}>ProzMan © 2024 Created by Siam</Footer>;
};

export default FooterNav;
