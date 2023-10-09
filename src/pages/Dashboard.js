import React from "react";
import { BsArrowDownLeft, BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
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

const Dashboard = () => {
  const data = [
    {
      type: "1",
      sales: 38,
    },
    {
      type: "2",
      sales: 52,
    },
    {
      type: "3",
      sales: 61,
    },
    {
      type: "4",
      sales: 145,
    },
    {
      type: "5",
      sales: 48,
    },
    {
      type: "6",
      sales: 38,
    },
    {
      type: "7",
      sales: 38,
    },
    {
      type: "8",
      sales: 38,
    },
    {
      type: "9",
      sales: 38,
    },
    {
      type: "10",
      sales: 38,
    },
    {
      type: "11",
      sales: 38,
    },
    {
      type: "12",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Tháng",
      },
      sales: {
        alias: "Thu nhập",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Bảng điều khiển</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Tổng cộng</p>
            <h4 className="mb-0 sub-title">100000000 VND</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight />
              25%
            </h6>
            <p className="mb-0 desc">So với tháng trước</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Tổng cộng</p>
            <h4 className="mb-0 sub-title">100000000 VND</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight />
              25%
            </h6>
            <p className="mb-0 desc">So với tháng trước</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Tổng cộng</p>
            <h4 className="mb-0 sub-title">100000000 VND</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowDownRight />
              25%
            </h6>
            <p className="mb-0 desc">So với tháng trước</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Thống kê thu nhập</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Các đơn hàng gần đây</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
