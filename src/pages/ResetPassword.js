import React from "react";
import CustomInput from "../components/CustomInput";

const ResetPassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center">Đặt lại mật khẩu</h3>
        <p className="text-center">Nhập mật khẩu mới của bạn để thay đổi</p>
        <form action="">
          <CustomInput type="password" label="Mật khẩu" id="password" />
          <CustomInput
            type="password"
            label="Xác nhận mật khẩu"
            id="confirm-password"
          />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Đặt lại mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
