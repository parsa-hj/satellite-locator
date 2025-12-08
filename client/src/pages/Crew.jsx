import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Alert,
  Spin,
  Button,
  Space,
  Avatar,
  Statistic,
} from "antd";
import {
  UserOutlined,
  ReloadOutlined,
  RocketOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { getISSCrew } from "../services/crewService";

const { Content } = Layout;
const { Title, Text } = Typography;

function Crew() {
  const [crew, setCrew] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCrewData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getISSCrew();
      setCrew(data.crew);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrewData();
  }, []);

  return (
    <Content
      style={{
        padding: "48px 24px",
        minHeight: "calc(100vh - 64px - 70px)",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <Title level={2} style={{ margin: 0, marginBottom: "8px" }}>
              <TeamOutlined style={{ marginRight: "12px", color: "#1890ff" }} />
              ISS Crew
            </Title>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              Current astronauts aboard the International Space Station
            </Text>
          </div>
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchCrewData}
            loading={loading}
            size="large"
            type="primary"
          >
            Refresh
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert
            message="Error Loading Crew Data"
            description={
              <div>
                <div>{error}</div>
                <div style={{ marginTop: "8px", fontSize: "12px" }}>
                  Make sure the backend server is running on port 5000.
                  <br />
                  Run: <code>cd server && npm start</code>
                </div>
              </div>
            }
            type="error"
            showIcon
            closable
            style={{ marginBottom: "24px" }}
          />
        )}

        {/* Loading Spinner */}
        {loading && !crew.length && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <Spin size="large" />
            <div style={{ marginTop: "16px", color: "#8c8c8c" }}>
              Loading crew data...
            </div>
          </div>
        )}

        {/* Crew Stats */}
        {!loading && crew.length > 0 && (
          <Card
            style={{
              marginBottom: "32px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <Statistic
              title="Total Crew Members on ISS"
              value={total}
              prefix={<RocketOutlined />}
              valueStyle={{ color: "#1890ff", fontSize: "48px" }}
            />
          </Card>
        )}

        {/* Crew Members Grid */}
        {!loading && crew.length > 0 && (
          <Row gutter={[24, 24]}>
            {crew.map((member, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Card
                  hoverable
                  style={{
                    height: "100%",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                  bodyStyle={{ padding: "32px 24px" }}
                >
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    <Avatar
                      size={80}
                      icon={<UserOutlined />}
                      style={{
                        backgroundColor: "#1890ff",
                        fontSize: "40px",
                      }}
                    />
                    <div>
                      <Title
                        level={4}
                        style={{ margin: 0, marginBottom: "8px" }}
                      >
                        {member.name}
                      </Title>
                      <Text type="secondary" style={{ fontSize: "14px" }}>
                        <RocketOutlined style={{ marginRight: "4px" }} />
                        {member.craft}
                      </Text>
                    </div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* No Data Message */}
        {!loading && !error && crew.length === 0 && (
          <Card style={{ textAlign: "center", padding: "60px 24px" }}>
            <TeamOutlined style={{ fontSize: "64px", color: "#d9d9d9" }} />
            <Title level={4} style={{ marginTop: "24px", color: "#8c8c8c" }}>
              No crew data available
            </Title>
          </Card>
        )}
      </div>
    </Content>
  );
}

export default Crew;
