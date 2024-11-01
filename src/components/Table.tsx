import { Select, Table } from "antd";
import { useState } from "react";

const TableComponent = ({ data, columns }: any) => {
  const [, setSortedInfo] = useState({
    order: null,
    columnKey: null,
  });

  const [perpage, setPerpage] = useState(10);
  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setSortedInfo(sorter);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        className="custome-table"
        rowClassName="custom-row"
        pagination={{
          pageSize: perpage,
        }}
        footer={() =>
          data?.length > 0 && (
            <div className="footer-table ">
              Items per page:{" "}
              <Select
                defaultValue={10}
                onChange={(data) => {
                  setPerpage(data);
                }}
                options={[
                  { value: "5", label: 5 },
                  { value: "10", label: 10 },
                  { value: "20", label: 20 },
                  { value: "50", label: 50 },
                ]}
              ></Select>
              Showing {perpage < data?.length ? perpage : data?.length} of{" "}
              {data?.length} results
            </div>
          )
        }
      />
    </div>
  );
};

export default TableComponent;
