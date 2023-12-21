import React, { useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteAProductCategory,
  getProductCategories,
  resetState,
} from "../features/productCategory/productCategorySlice";
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
  const [pCatId, setPCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setPCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProductCategories());
  }, []);

  const productCategoryState = useSelector(
    (state) => state.productCategory.productcategories
  );
  const data1 = [];
  for (let i = 0; i < productCategoryState?.length; i++) {
    data1.push({
      key: i,
      name: productCategoryState[i].title,
      action: (
        <>
          <Link
            to={`/admin/category/${productCategoryState[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productCategoryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteProductCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProductCategories());
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
          deleteProductCategory(pCatId);
        }}
        title="Bạn có chắc chắn rằng bạn muốn xóa danh mục này?"
      />
    </div>
  );
};

export default CategoryList;
