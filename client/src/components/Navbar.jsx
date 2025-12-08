import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  RocketOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: "/tracking",
      icon: <EnvironmentOutlined />,
      label: <Link to="/tracking">ISS Tracker</Link>,
    },
    {
      key: "/about",
      icon: <InfoCircleOutlined />,
      label: <Link to="/about">About</Link>,
    },
  ];

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#1a1a2e",
        padding: "0 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "40px",
          color: "#fff",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        <RocketOutlined
          style={{ fontSize: "24px", marginRight: "8px", color: "#1890ff" }}
        />
        ISS Locator
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{
          flex: 1,
          minWidth: 0,
          backgroundColor: "transparent",
          borderBottom: "none",
        }}
        theme="dark"
      />
    </Header>
  );
};

export default Navbar;
