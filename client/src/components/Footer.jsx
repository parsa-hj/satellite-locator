import React from "react";
import { Layout, Typography } from "antd";
import { GithubOutlined, HeartFilled } from "@ant-design/icons";

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter
      style={{
        textAlign: "center",
        backgroundColor: "#1a1a2e",
        color: "#fff",
        padding: "24px 50px",
        marginTop: "auto",
      }}
    >
      <div style={{ marginBottom: "12px" }}>
        <Text style={{ color: "#fff" }}>
          Made with{" "}
          <HeartFilled style={{ color: "#ff4d4f", margin: "0 4px" }} /> for ISS
          tracking
        </Text>
      </div>
      <div>
        <Text style={{ color: "#8c8c8c" }}>
          © {currentYear} ISS Locator. Data provided by{" "}
          <Link
            href="http://open-notify.org/"
            target="_blank"
            style={{ color: "#1890ff" }}
          >
            Open Notify API
          </Link>
        </Text>
      </div>
    </AntFooter>
  );
};

export default Footer;
