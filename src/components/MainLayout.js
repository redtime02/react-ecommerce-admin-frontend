import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
  AiOutlinePicLeft,
  AiOutlinePicRight,
} from "react-icons/ai";
import { Outlet } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { SiBrandfolder } from "react-icons/si";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">Z</span>
            <span className="lg-logo">Zero</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Bảng điều khiển",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Tài khoản",
            },
            {
              key: "catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Mục lục",
              children: [
                {
                  key: "add-product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Thêm sản phẩm",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Danh sách sản phẩm",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Thương hiệu",
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Danh sách thương hiệu",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Danh mục",
                },
                {
                  key: "category-list",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Danh sách danh mục",
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Màu sắc",
                },
                {
                  key: "color-list",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Danh sách màu sắc",
                },
              ],
            },
            {
              key: "order",
              icon: <FaClipboardList className="fs-4" />,
              label: "Đơn hàng",
            },
            {
              key: "blog",
              icon: <FaBloggerB className="fs-4" />,
              label: "Tin tức",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog className="fs-4" />,
                  label: "Thêm tin tức",
                },
                {
                  key: "blog-list",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Danh sách tin tức",
                },
                {
                  key: "blog-category",
                  icon: <ImBlog className="fs-4" />,
                  label: "Thêm danh mục tin tức",
                },
                {
                  key: "blog-category-list",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Danh sách danh mục tin tức",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaClipboardList className="fs-4" />,
              label: "Phản hồi",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{ padding: 0, background: colorBgContainer }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuUnfoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://th.bing.com/th/id/R.9dcce93126baf5a0c95981a2d2d2aa82?rik=044obY0D36%2beug&pid=ImgRaw&r=0"
                  alt=""
                />
              </div>
              <div>
                <h5 className="mb-0">Admin</h5>
                <p className="mb-0">admin@gmail.com</p>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
