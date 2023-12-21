import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getBrands, resetState } from "../features/brand/brandSlice";
import { getProductCategories } from "../features/productCategory/productCategorySlice";
import { Select } from "antd";
import { getColors } from "../features/color/colorSlice";
import "react-widgets/styles.css";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import {
  createProducts,
  getAProduct,
  updateAProduct,
} from "../features/product/productSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.number().required("Price is Required"),
  brand: Yup.string().required("Brand is Required"),
  category: Yup.string().required("Category is Required"),
  tags: Yup.string().required("Tag is Required"),
  color: Yup.array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: Yup.number().required("Quantity is required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProductCategories());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector(
    (state) => state.productCategory.productcategories
  );
  const colorState = useSelector((state) => state.color.colors);
  if (!Array.isArray(colorState)) {
    // Xử lý trường hợp colorState không phải là mảng
    // Ví dụ: colorState = { _id: 1, color: 'Red' }
    colorState = []; // Gán colorState là một mảng rỗng
  }
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    productName,
    // productDesc,
    productPrice,
    productBrand,
    productTag,
    productCat,
    productColor,
    productQ,
    updatedProduct,
    // productImg,
  } = newProduct;

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
      // img.push(productImg);
    }
    if (isSuccess && updatedProduct) {
      toast.success("Cập nhật sản phẩm thành công!");
      navigate("/admin/product-list");
    } else {
      dispatch(resetState());
    }
  }, []);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Thêm sản phẩm thành công!");
    }
    if (isError) {
      toast.error("Đã có lỗi xảy ra!");
    }
  }, [isSuccess, isError, isLoading]);

  const colorOpt = [];
  colorState.forEach((i) => {
    colorOpt.push({
      label: i.title,
      value: i._id,
    });
  });

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, img]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productName || "",
      description: "",
      price: productPrice || "",
      brand: productBrand || "",
      category: productCat || "",
      tags: productTag || "",
      color: productColor || "",
      quantity: productQ || "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const data = { id: getProductId, productData: values };
        dispatch(updateAProduct(data));
        toast.success("Cập nhật sản phẩm thành công!");
        navigate("/admin/product-list");
        dispatch(resetState());
      } else {
        dispatch(createProducts(values));
        formik.resetForm();
        setColor(null);
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/product-list");
        }, 3000);
      }
    },
  });
  const [desc, setDesc] = useState();
  const handleDesc = (e) => {
    setDesc(e);
  };
  const handleColors = (e) => {
    setColor(e);
    console.log(color);
  };
  return (
    <div>
      <h3 className="mb-4 title">
        {getProductId !== undefined ? "Cập nhật" : "Thêm"} sản phẩm
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Thêm hình</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="show-images d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(deleteImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <CustomInput
            text="text"
            label="Tên sản phẩm"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <label className="mb-3" htmlFor="">
              Mô tả
            </label>
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            text="number"
            label="Đơn giá"
            name="price"
            onCh={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Thương hiệu</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Danh mục</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Loại
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Màu sắc"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={colorOpt}
            name="color"
            onBlur={formik.handleBlur("color")}
            value={formik.values.color}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            text="number"
            label="Số lượng"
            name="quantity"
            onCh={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getProductId !== undefined ? "Lưu" : "Thêm"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
