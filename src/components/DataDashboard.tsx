import { Tabs } from "antd";
import { UploadOutlined, BarChartOutlined } from "@ant-design/icons";
// import { useDataStore } from "../store/dataStore";
import DataUpload from "./DataUpload";
import ChartDisplay from "./ChartDisplay";
import type { TabsProps } from "antd";
import React from "react";

const DataDashboard: React.FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "upload",
      label: (
        <span>
          <UploadOutlined />
          数据上传
        </span>
      ),
      children: <DataUpload />,
    },
    {
      key: "chart",
      label: (
        <span>
          <BarChartOutlined />
          图表展示
        </span>
      ),
      children: <ChartDisplay />,
    },
  ];

  return (
    <Tabs
      defaultActiveKey="upload"
      centered
      items={items}
    />
  );
};

export default DataDashboard;
