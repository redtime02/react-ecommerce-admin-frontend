import React, { useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteABlogCat,
  getBlogCategories,
  resetState,
} from "../features/blogCategory/blogCategorySlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "name",
    sorter: (a, b) => a.name?.length - b.name?.length,
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [blogCatId, setBlogCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, []);

  const blogCategoryState = useSelector(
    (state) => state.blogCategory.blogcategories
  );
  const data1 = [];
  for (let i = 0; i < blogCategoryState?.length; i++) {
    data1.push({
      key: i + 1,
      name: blogCategoryState[i].title,
      action: (
        <>
          <Link
            to={`/admin/blog-category/${blogCategoryState[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogCategoryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteBlogCategory = (e) => {
    dispatch(deleteABlogCat(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogCategories());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Danh mục sản phẩm</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlogCategory(blogCatId);
        }}
        title="Bạn có chắc chắn rằng bạn muốn xóa danh mục này?"
      />
    </div>
  );
};

export default CategoryList;
