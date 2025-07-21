import { Button, Space, Dropdown, message, Upload } from "antd";
import type { MenuProps, UploadProps } from "antd";
import { read, utils } from "xlsx";
import { UploadOutlined, DownOutlined } from "@ant-design/icons";
import { useDataStore } from "../store/dataStore";
import type { FC } from "react";

const DataBinding: FC = () => {
  const tableData = useDataStore((state) => state.tableData);
  const setTableData = useDataStore((state) => state.setTableData);
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
  const uploadProps: UploadProps = {
    accept: ".xlsx,.xls",
    showUploadList: false,
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const wb = read(data);
          const ws = wb.Sheets[wb.SheetNames[0]];
          const jsonData = utils.sheet_to_json(ws, { header: 1 });

          // 转换为二维数组格式
          const twoDArray = jsonData as any[][];
          setTableData(twoDArray);
        } catch (error) {
          message.error("文件解析失败:");
        }
      };
      reader.readAsArrayBuffer(file);

      // 阻止默认上传行为
      return false;
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
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
          <Upload {...uploadProps}>
            <Button
              icon={<UploadOutlined />}
              onClick={() => handleButtonClick}
              style={{ borderRadius: "6px 0 0 6px" }}
            >
              上传Excel
            </Button>
          </Upload>
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
