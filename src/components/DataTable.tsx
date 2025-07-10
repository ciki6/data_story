import { Table } from 'antd';
import { useDataStore } from '../store/dataStore';
import type { FC } from 'react';

const DataTable: FC = () => {
  // 从zustand store获取数据
  const tableData = useDataStore(state => state.tableData);
  
  // 动态生成列配置
  const columns = tableData[0] 
    ? Object.keys(tableData[0]).map(key => ({
        title: key,
        dataIndex: key,
        key: key,
      }))
    : [];

  return (
    <div className="data-table-container" style={{ marginTop: 16 }}>
      <Table
        bordered
        dataSource={tableData}
        columns={columns}
        rowKey={(record, index) => `${index}-${Math.random()}`}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default DataTable;
