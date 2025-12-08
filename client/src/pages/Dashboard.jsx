import React from "react";
import { Layout, Typography, Card, Row, Col, Button, Space } from "antd";
import {
  RocketOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import Facts from "../components/Facts";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

function Dashboard() {
  const navigate = useNavigate();

  const features = [
    {
      icon: (
        <EnvironmentOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
      ),
      title: "Real-Time Tracking",
      description:
        "Track the ISS position in real-time with live updates every 5 seconds.",
    },
    {
      icon: <GlobalOutlined style={{ fontSize: "32px", color: "#52c41a" }} />,
      title: "Interactive Map",
      description:
        "View the ISS location on an interactive world map powered by Leaflet.",
    },
    {
      icon: <RocketOutlined style={{ fontSize: "32px", color: "#fa8c16" }} />,
      title: "Orbital Data",
      description:
        "See speed, altitude, direction, and predicted trajectory of the ISS.",
    },
  ];

  return (
    <Content
      style={{
        padding: "48px 24px",
        minHeight: "calc(100vh - 64px - 70px)",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <RocketOutlined
            style={{ fontSize: "80px", color: "#1890ff", marginBottom: "24px" }}
          />
          <Title level={1} style={{ fontSize: "48px", marginBottom: "16px" }}>
            ISS Locator
          </Title>
          <Paragraph
            style={{
              fontSize: "20px",
              color: "#595959",
              maxWidth: "700px",
              margin: "0 auto 32px",
            }}
          >
            Track the International Space Station in real-time as it orbits
            Earth at over 27,000 km/h. Watch its live position, speed, and
            trajectory on an interactive map.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            icon={<EnvironmentOutlined />}
            onClick={() => navigate("/tracking")}
            style={{
              height: "48px",
              fontSize: "18px",
              padding: "0 32px",
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
            }}
          >
            Start Tracking
            <ArrowRightOutlined />
          </Button>
        </div>

        {/* Features Section */}
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} md={8} key={index}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  textAlign: "center",
                  borderRadius: "8px",
                  border: "1px solid #d9d9d9",
                }}
              >
                <Space direction="vertical" size="large">
                  <div>{feature.icon}</div>
                  <Title level={4}>{feature.title}</Title>
                  <Paragraph style={{ color: "#595959" }}>
                    {feature.description}
                  </Paragraph>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Facts Widget (rotating on refresh) */}
        <div style={{ marginTop: 40, marginBottom: 40 }}>
          <Facts />
        </div>

        {/* Info Section */}
        <Card
          style={{
            marginTop: "48px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            border: "1px solid #d9d9d9",
          }}
        >
          <Title level={3} style={{ marginBottom: "16px" }}>
            About the International Space Station
          </Title>
          <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
            The International Space Station (ISS) is a modular space station in
            low Earth orbit. It is a multinational collaborative project
            involving NASA, Roscosmos, JAXA, ESA, and CSA. The ISS serves as a
            microgravity and space environment research laboratory where
            scientific research is conducted in astrobiology, astronomy,
            meteorology, physics, and other fields.
          </Paragraph>
          <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
            <Col xs={12} sm={6}>
              <Text strong style={{ display: "block" }}>
                Altitude
              </Text>
              <Text style={{ fontSize: "18px", color: "#1890ff" }}>
                ~408 km
              </Text>
            </Col>
            <Col xs={12} sm={6}>
              <Text strong style={{ display: "block" }}>
                Speed
              </Text>
              <Text style={{ fontSize: "18px", color: "#1890ff" }}>
                ~27,600 km/h
              </Text>
            </Col>
            <Col xs={12} sm={6}>
              <Text strong style={{ display: "block" }}>
                Orbit Period
              </Text>
              <Text style={{ fontSize: "18px", color: "#1890ff" }}>
                ~92 minutes
              </Text>
            </Col>
            <Col xs={12} sm={6}>
              <Text strong style={{ display: "block" }}>
                Crew
              </Text>
              <Text style={{ fontSize: "18px", color: "#1890ff" }}>
                6-7 people
              </Text>
            </Col>
          </Row>
        </Card>
      </div>
    </Content>
  );
}

export default Dashboard;
