import React from "react";
import { Card, Row, Col, Statistic, Typography, Space, Tag } from "antd";
import {
  EnvironmentOutlined,
  RocketOutlined,
  DashboardOutlined,
  ClockCircleOutlined,
  CompassOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

/**
 * ISS Stats Component
 * Displays key metrics about the ISS (position, velocity, altitude, etc.)
 */
const ISSStats = ({ data }) => {
  if (!data) {
    return null;
  }

  const { position, velocity, altitude, timestamp, datetime } = data;

  // Add safety checks for nested objects
  if (!position || !velocity) {
    return null;
  }

  return (
    <Space orientation="vertical" size="large" style={{ width: "100%" }}>
      {/* Header */}
      <div>
        <Title level={3} style={{ marginBottom: "8px" }}>
          <RocketOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
          Live ISS Data
        </Title>
        <Text type="secondary">
          Real-time tracking of the International Space Station
        </Text>
      </div>

      {/* Stats Grid */}
      <Row gutter={[16, 16]}>
        {/* Position Card */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
            }}
          >
            <Statistic
              title={
                <span>
                  <EnvironmentOutlined style={{ marginRight: "4px" }} />
                  Position
                </span>
              }
              value={`${position.latitude.toFixed(
                4
              )}°, ${position.longitude.toFixed(4)}°`}
              styles={{ value: { fontSize: "18px", color: "#1890ff" } }}
            />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Latitude, Longitude
            </Text>
          </Card>
        </Col>

        {/* Speed Card */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
            }}
          >
            <Statistic
              title={
                <span>
                  <DashboardOutlined style={{ marginRight: "4px" }} />
                  Speed
                </span>
              }
              value={velocity.speedKmh?.toLocaleString() || "N/A"}
              suffix="km/h"
              styles={{ value: { fontSize: "18px", color: "#52c41a" } }}
            />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {velocity.speed?.toFixed(2) || "N/A"} km/s
            </Text>
          </Card>
        </Col>

        {/* Altitude Card */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
            }}
          >
            <Statistic
              title={
                <span>
                  <RocketOutlined style={{ marginRight: "4px" }} />
                  Altitude
                </span>
              }
              value={altitude}
              suffix="km"
              styles={{ value: { fontSize: "18px", color: "#fa8c16" } }}
            />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Above Earth's surface
            </Text>
          </Card>
        </Col>

        {/* Direction Card */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
            }}
          >
            <Statistic
              title={
                <span>
                  <CompassOutlined style={{ marginRight: "4px" }} />
                  Direction
                </span>
              }
              value={
                velocity.direction !== null
                  ? velocity.direction.toFixed(1)
                  : "Calculating..."
              }
              suffix={velocity.direction !== null ? "°" : ""}
              styles={{ value: { fontSize: "18px", color: "#722ed1" } }}
            />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {velocity.direction !== null
                ? "Bearing (0° = North)"
                : "Collecting data..."}
            </Text>
          </Card>
        </Col>

        {/* Timestamp Card */}
        <Col xs={24} sm={12} lg={16}>
          <Card
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
            }}
          >
            <Space orientation="vertical" size="small">
              <div>
                <ClockCircleOutlined
                  style={{ marginRight: "8px", color: "#8c8c8c" }}
                />
                <Text strong>Last Updated</Text>
              </div>
              <Text style={{ fontSize: "16px" }}>
                {new Date(datetime).toLocaleString()}
              </Text>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                Unix timestamp: {timestamp}
              </Text>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Status Tag */}
      <div style={{ textAlign: "center" }}>
        <Tag color="green" style={{ fontSize: "14px", padding: "4px 12px" }}>
          Live Tracking Active
        </Tag>
      </div>
    </Space>
  );
};

export default ISSStats;
