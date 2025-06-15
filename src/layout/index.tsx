/**
 * TODO: 布局
 */
import React from "react";
import { Flex, Layout } from "antd";
import { Outlet } from "react-router-dom";
import PageHeader from "../components/header/index"
import "./index.css";

const { Header, Content, Footer } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#000000",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  color: "#000",
  backgroundColor: "#f4f4f4",
};

const layoutStyle = {
  overflow: "hidden",
  minWidth: "calc(50% - 8px)",
};

const footerStyle: React.CSSProperties = {
}

const LayoutPage: React.FC = () => {
  return (
    <Flex gap="middle" wrap className={"layoutPage"}>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <PageHeader />
        </Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Flex>
  );
};

export default LayoutPage;
