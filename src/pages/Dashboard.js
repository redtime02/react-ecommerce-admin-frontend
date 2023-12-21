import React, { useEffect, useState } from "react";
import { BsArrowDownLeft, BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyData,
  getYearlyData,
  getOrders,
} from "../features/auth/authSlice";

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
    title: "Số lượng sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Tổng tiền",
    dataIndex: "price",
  },
  {
    title: "Tổng tiền sau khi giảm giá",
    dataIndex: "dprice",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const ordersState = useSelector((state) => state?.auth?.orders?.orders);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    dispatch(getMonthlyData());
    dispatch(getYearlyData());
    dispatch(getOrders());
  }, []);
  console.log(monthlyDataState);

  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    let monthlyOrderCount = [];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({
        type: monthNames[element?._id?.month],
        income: element?.amount,
      });
      monthlyOrderCount.push({
        type: monthNames[element?._id?.month],
        sales: element?.count,
      });
    }
    // console.log(data);
    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);
    const data1 = [];
    for (let i = 0; i < ordersState?.length; i++) {
      data1.push({
        key: i,
        name: ordersState[i].user.firstname + ordersState[i].user.lastname,
        product: ordersState[i].orderItems?.length,
        price: ordersState[i]?.totalPrice,
        dprice: ordersState[i]?.totalPriceAfterDiscount,
        status: ordersState[i]?.orderStatus,
      });
    }
    setOrderData(data1);
  }, [monthlyDataState]);

  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#33c2ff";
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
  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#33c2ff";
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
        alias: "Bán được",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Bảng điều khiển</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Tổng doanh thu</p>
            <h4 className="mb-0 sub-title">
              {yearlyDataState && yearlyDataState[0]?.amount} VND
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc">Trong năm</p>
          </div>
        </div>
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Tổng doanh số</p>
            <h4 className="mb-0 sub-title">
              {yearlyDataState && yearlyDataState[0]?.count}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc">Trong năm</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between" gap-3>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-4 title">Thống kê thu nhập</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-4 title">Thống kê số hàng bán được</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Các đơn hàng gần đây</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
