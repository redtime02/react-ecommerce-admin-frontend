import React from "react";
import CustomInput from "../components/CustomInput";

const AddBlogCategory = () => {
  return (
    <div>
      <h3 className="mb-4 title">Thêm danh mục tin tức</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Nhập danh mục" />
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
