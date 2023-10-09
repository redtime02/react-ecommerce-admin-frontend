import React from "react";
import CustomInput from "../components/CustomInput";

const AddBrand = () => {
  return (
    <div>
      <h3 className="mb-4 title">Thêm thương hiệu</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Nhập thương hiệu" />
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

export default AddBrand;
