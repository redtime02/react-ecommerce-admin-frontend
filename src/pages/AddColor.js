import React from "react";
import CustomInput from "../components/CustomInput";

const AddColor = () => {
  return (
    <div>
      <h3 className="mb-4 title">Thêm màu sắc</h3>
      <div>
        <form action="">
          <CustomInput type="color" label="Chọn màu" />
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

export default AddColor;
