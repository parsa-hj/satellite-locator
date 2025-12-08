import React from "react";
import { Layout, Typography, Card, Space, Divider } from "antd";
import { GithubOutlined, ApiOutlined, GlobalOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph, Link } = Typography;

function About() {
  return (
    <Content
      style={{
        padding: "48px 24px",
        minHeight: "calc(100vh - 64px - 70px)",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Card style={{ borderRadius: "8px", border: "1px solid #d9d9d9" }}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <Title level={2}>About ISS Locator</Title>
              <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                ISS Locator is a real-time tracking application for the
                International Space Station. This project demonstrates modern
                web development practices using React, Ant Design, Leaflet, and
                a custom-built Node.js API.
              </Paragraph>
            </div>

            <Divider />

            <div>
              <Title level={3}>
                <ApiOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
                Technology Stack
              </Title>
              <Paragraph>
                <strong>Frontend:</strong> React, Ant Design, Leaflet, React
                Router
                <br />
                <strong>Backend:</strong> Node.js, Express, Axios
                <br />
                <strong>Data Source:</strong> Open Notify API
              </Paragraph>
            </div>

            <Divider />

            <div>
              <Title level={3}>
                <GlobalOutlined
                  style={{ marginRight: "8px", color: "#52c41a" }}
                />
                Features
              </Title>
              <ul style={{ fontSize: "16px", lineHeight: "1.8" }}>
                <li>Real-time ISS position tracking with auto-refresh</li>
                <li>Interactive world map with ISS marker and trajectory</li>
                <li>Live orbital data: speed, altitude, direction</li>
                <li>Predicted trajectory visualization</li>
                <li>Responsive design for mobile and desktop</li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={3}>Data Attribution</Title>
              <Paragraph>
                ISS position data is provided by the{" "}
                <Link href="http://open-notify.org/" target="_blank">
                  Open Notify API
                </Link>
                , a free service that provides real-time information about the
                International Space Station.
              </Paragraph>
            </div>

            <Divider />

            <div style={{ textAlign: "center" }}>
              <Paragraph type="secondary">
                Built with ❤️ for space enthusiasts and developers
              </Paragraph>
            </div>
          </Space>
        </Card>
      </div>
    </Content>
  );
}

export default About;
