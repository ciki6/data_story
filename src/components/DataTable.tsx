import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { generateExcelColumns } from "../utils/excelUtil";

interface DataTableProps {
  columns: Array<ColumnType>;
  rows: Record<string, unknown>[];
  showDefaultData?: boolean;
  rowHeight?: number;
}

export interface ColumnType {
  title: string;
  dataIndex: string;
  key: string;
  width?: number;
  alias?: string;
}

const DataTable: FC<DataTableProps> = ({ columns, rows, rowHeight = 40, showDefaultData = true }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(200);
  const [bufferCount, setBufferCount] = useState(10);
  const [columnTypes, setColumnTypes] = useState<Record<string, string>>({});

  // 计算可视区域
  const totalHeight = rows.length * rowHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - bufferCount);
  const endIndex = Math.min(rows.length - 1, Math.ceil((scrollTop + height) / rowHeight) + bufferCount);

  const excelHeaderList = generateExcelColumns(columns.length);

  const typeColors: Record<string, any> = {
    number: { badge: "#9780bf", background: "#d2c6e6", text: "123" },
    string: { badge: "#e3b2c2", background: "#fedee7", text: "ABC" },
    unknown: { badge: "#f5f5f5", background: "#f5f5f5", text: "unknown" },
  };

  function isNumeric(str: string): boolean {
    if (typeof str !== "string") return false;
    return !isNaN(str as any) && !isNaN(parseFloat(str)) && Number(str).toString() === str.trim();
  }

  const detectColumnDataType = (key: string) => {
    const sampleValue = rows[0]?.[key];
    if (isNumeric(sampleValue as string)) {
      return "number";
    }
    if (typeof sampleValue === "string") {
      return "string";
    }
    return "unknown";
  };

  useEffect(() => {
    const types: Record<string, string> = {};
    columns.forEach((col) => {
      types[col.key] = detectColumnDataType(col.key);
    });
    setColumnTypes(types);
    console.log(columns);
    console.log(types);
  }, [columns, rows]);

  // 处理容器尺寸变化
  useEffect(() => {
    const calculateBuffer = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const visibleRows = Math.ceil(containerHeight / rowHeight);
        setBufferCount(visibleRows * 2);
        setHeight(containerHeight);
        setScrollTop(containerRef.current.scrollTop || 0);
      }
    };

    calculateBuffer();
    window.addEventListener("resize", calculateBuffer);
    return () => window.removeEventListener("resize", calculateBuffer);
  }, [rowHeight]);

  // 处理滚动事件
  useEffect(() => {
    const container = containerRef.current;
    const handleScroll = () => {
      setScrollTop(container?.scrollTop || 0);
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        minHeight: "200px",
        overflow: "auto",
        position: "relative",
      }}
    >
      <div style={{ height: totalHeight }}>
        <div
          style={{
            position: "absolute",
            top: startIndex * rowHeight,
            width: "100%",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              tableLayout: "fixed",
            }}
          >
            <thead>
              {/* 新增上层表头 */}
              <tr>
                {excelHeaderList.map((header, index) => (
                  <th
                    key={`header-${index}`}
                    colSpan={1}
                    style={{
                      padding: "12px",
                      border: "2px solid #cfcbcb",
                      backgroundColor: typeColors[columnTypes[columns[index]?.key]]?.background,
                      textAlign: "left",
                      position: "sticky",
                      top: 0,
                      zIndex: 2, // z-index 高于下层表头
                      width: columns[index]?.width || "auto",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div
                        style={{
                          backgroundColor: typeColors[columnTypes[columns[index]?.key]]?.badge,
                          width: "35px",
                          height: "35px",
                          textAlign: "center",
                          lineHeight: "35px",
                          color: "#fff",
                          borderRadius: "10%",
                        }}
                      >
                        {typeColors[columnTypes[columns[index]?.key]]?.text}
                      </div>
                      <div style={{ margin: "0 auto", fontSize: "20px" }}>{header}</div>
                    </div>
                  </th>
                ))}
              </tr>

              {/* 原有下层表头 */}
              <tr style={{ display: showDefaultData ? "none" : "table-row" }}>
                {columns.map((col, index) => (
                  <th
                    key={col.key}
                    style={{
                      padding: "12px",
                      border: "2px solid #cfcbcb",
                      backgroundColor: typeColors[columnTypes[col?.key]]?.background,
                      textAlign: "left",
                      position: "sticky",
                      top: 40, // 上层表头高度
                      zIndex: 1,
                      width: col.width || "auto",
                    }}
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(startIndex, endIndex + 1).map((row, index) => (
                <tr
                  key={`row-${startIndex + index}`}
                  style={{
                    height: rowHeight,
                    boxSizing: "border-box",
                  }}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #e8e8e8",
                        textAlign: "left",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        border: "1px solid #f0f0f0",
                      }}
                    >
                      {String(row[col.dataIndex] || "—")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
