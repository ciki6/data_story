import { Button, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDataStore } from "../store/dataStore";
import type { FC } from "react";

const DataConfigPanel: FC = () => {
    const tableData = useDataStore((state) => state.tableData);

    return (
        <div style={{
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
        }}>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Button
                    icon={<UploadOutlined />}
                    onClick={() => document.getElementById('file-input')?.click()}
                >
                    重新上传Excel
                </Button>

                {tableData[0]?.map((_, index) => (
                    <div key={index} style={{
                        padding: 12,
                        border: '1px solid #f0f0f0',
                        borderRadius: 6
                    }}>
                        字段 {String.fromCharCode(65 + index)} 配置
                    </div>
                ))}
            </Space>

            <div style={{
                flex: 1,
                border: '1px solid #f0f0f0',
                borderRadius: 8,
                padding: 16,
                minHeight: 200
            }}>
                图表预览区域
            </div>
        </div>
    );
};

export default DataConfigPanel;