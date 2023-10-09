import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Mã đơn",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Sản phẩm",
    dataIndex: "address",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];

const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const BrandList = () => {
  return (
    <div>
      <h3 className="mb-4 title">Thương hiệu</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BrandList;
