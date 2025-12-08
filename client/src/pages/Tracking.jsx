import React from "react";
import { Layout, Space, Alert, Spin, Button, Typography } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import ISSMap from "../components/ISSMap";
import ISSStats from "../components/ISSStats";
import { useISSTracking } from "../hooks/useISSTracking";

const { Content } = Layout;
const { Title } = Typography;

function Tracking() {
  const { data, loading, error, refetch } = useISSTracking(0); // Manual refresh only

  return (
    <Content
      style={{ padding: "24px", minHeight: "calc(100vh - 64px - 70px)" }}
    >
      <Space
        orientation="vertical"
        size="large"
        style={{ width: "100%", maxWidth: "1400px", margin: "0 auto" }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Title level={2} style={{ margin: 0 }}>
            ISS Tracker
          </Title>
          <Button
            icon={<ReloadOutlined />}
            onClick={refetch}
            loading={loading}
            type="primary"
            style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
          >
            Refresh
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert
            title="Error Loading ISS Data"
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
          />
        )}

        {/* Loading Spinner */}
        {loading && !data && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <Spin size="large" />
            <div style={{ marginTop: "16px", color: "#8c8c8c" }}>
              Loading ISS data...
            </div>
          </div>
        )}

        {/* Main Content */}
        {data && (
          <>
            {/* Map */}
            <div>
              <ISSMap position={data.position} trajectory={data.trajectory} />
            </div>

            {/* Stats */}
            <div>
              <ISSStats data={data} />
            </div>
          </>
        )}
      </Space>
    </Content>
  );
}

export default Tracking;
