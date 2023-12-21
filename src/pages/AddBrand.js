import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  createBrands,
  getBrand,
  resetState,
  updateBrand,
} from "../features/brand/brandSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Brand Name is Required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getBrand(getBrandId));
      // formik.values.title = brandName;
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Thêm thương hiệu thành công!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Cập nhật thương hiệu thành công");
      navigate("/admin/brand-list");
    }
    if (isError) {
      toast.error("Đã có lỗi xảy ra!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateBrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrands(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          // navigate("/admin/brand-list");
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBrandId !== undefined ? "Cập nhật" : "Thêm"} thương hiệu
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Tên thương hiệu"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getBrandId !== undefined ? "Lưu" : "Thêm"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
