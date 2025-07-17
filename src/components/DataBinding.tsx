import { Button, Space, Dropdown, message } from "antd";
import type { MenuProps } from "antd";
import { UploadOutlined, DownOutlined } from "@ant-design/icons";
import { useDataStore } from "../store/dataStore";
import type { FC } from "react";

const DataBinding: FC = () => {
  const tableData = useDataStore((state) => state.tableData);
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };
  const items: MenuProps["items"] = [
    {
      label: "Upload data file",
      key: "1",
    },
    {
      label: "Upload data and merge",
      key: "2",
    },
    {
      label: "Connect to live URL",
      key: "3",
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div
      style={{
        width: "30%",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <Space
        direction="vertical"
        style={{ width: "100%" }}
      >
        <div>
          <Button
            icon={<UploadOutlined />}
            onClick={() => handleButtonClick}
            style={{ borderRadius: "6px 0 0 6px" }}
          >
            上传Excel
          </Button>
          <Dropdown
            menu={menuProps}
            placement="bottom"
          >
            <Button
              style={{ borderRadius: "0 6px 6px 0" }}
              icon={<DownOutlined />}
            ></Button>
          </Dropdown>
        </div>

        {tableData[0]?.map((_, index) => (
          <div
            key={index}
            style={{
              padding: 12,
              border: "1px solid #f0f0f0",
              borderRadius: 6,
            }}
          >
            字段 {String.fromCharCode(65 + index)} 配置
          </div>
        ))}
      </Space>

      <div
        style={{
          flex: 1,
          border: "1px solid #f0f0f0",
          borderRadius: 8,
          padding: 16,
          minHeight: 200,
        }}
      >
        图表预览区域
      </div>
    </div>
  );
};

export default DataBinding;
