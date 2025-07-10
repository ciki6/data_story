import React from "react";
import { Layout, theme } from "antd";

import DataDashboard from "../components/DataDashboard";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <h1 style={{ color: "#fff" }}>Data Story</h1>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <DataDashboard />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Data Story ©{new Date().getFullYear()} Created by BitStudio</Footer>
    </Layout>
  );
};

export default App;
