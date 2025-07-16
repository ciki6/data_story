import React from "react";
import { Layout, theme } from "antd";

import DataDashboard from "../components/DataDashboard";

const { Header, Content, Footer } = Layout;

// 修改外层Layout样式
const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header style={{ 
        display: "flex", 
        alignItems: "center",
        flexShrink: 0  // 防止header被压缩
      }}>
        <div className="demo-logo" />
        <h1 style={{ color: "#fff" }}>Data Story</h1>
      </Header>
      <Content style={{ 
        flex: 1,
        padding: "0 48px",
        overflow: 'hidden'  // 添加overflow约束
      }}>
        <div
          style={{
            background: colorBgContainer,
            height: '100%',  // 修改minHeight为height
            padding: 24,
            borderRadius: borderRadiusLG,
            display: 'flex',  // 添加flex布局
            flexDirection: 'column'
          }}
        >
          <DataDashboard />
        </div>
      </Content>
      <Footer style={{ 
        textAlign: "center",
        flexShrink: 0  // 防止footer被压缩
      }}>
        Data Story ©{new Date().getFullYear()} Created by BitStudio
      </Footer>
    </Layout>
  );
};

export default App;
