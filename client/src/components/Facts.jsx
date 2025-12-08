import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "antd";
import { StarOutlined, RedoOutlined } from "@ant-design/icons";
import factsData from "../assets/facts.json";

const { Text, Paragraph, Title } = Typography;

const containerStyle = {
  width: "100%",
  maxWidth: "1100px",
  margin: "0 auto",
};

const cardStyle = {
  borderRadius: 12,
  padding: "24px",
  color: "#fff",
  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0b1220 100%)",
  boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
  overflow: "hidden",
  position: "relative",
};

const accentStyle = {
  position: "absolute",
  right: -40,
  top: -40,
  width: 160,
  height: 160,
  background: "rgba(255,255,255,0.03)",
  transform: "rotate(25deg)",
};

const Facts = () => {
  const facts = factsData || [];
  const len = facts.length;
  const [fact, setFact] = useState(null);

  useEffect(() => {
    if (!len) return;

    // Rotate fact on each page reload: store last index in localStorage
    const key = "issFactIndex";
    const last = parseInt(localStorage.getItem(key) || "-1", 10);
    const next = (last + 1) % len;
    localStorage.setItem(key, String(next));
    setFact(facts[next]);
  }, [len]);

  const handleRotate = () => {
    if (!len) return;
    const key = "issFactIndex";
    const last = parseInt(localStorage.getItem(key) || "-1", 10);
    const next = (last + 1) % len;
    localStorage.setItem(key, String(next));
    setFact(facts[next]);
  };

  if (!fact) return null;

  return (
    <div style={containerStyle}>
      <Card style={cardStyle} bodyStyle={{ padding: 0 }}>
        <div style={accentStyle} />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "linear-gradient(135deg,#06b6d4,#7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 18px rgba(12,34,66,0.5)",
              flexShrink: 0,
            }}
          >
            <StarOutlined style={{ color: "#fff", fontSize: 28 }} />
          </div>

          <div style={{ flex: 1 }}>
            <Title level={4} style={{ color: "#fff", margin: 0 }}>
              ISS Fact
            </Title>
            <Paragraph style={{ color: "rgba(255,255,255,0.9)", marginTop: 8 }}>
              {fact.fact}
            </Paragraph>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "rgba(255,255,255,0.6)" }}>
                Source: {fact.source}
              </Text>
              <div>
                <Button
                  type="default"
                  shape="round"
                  icon={<RedoOutlined />}
                  onClick={handleRotate}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Facts;
