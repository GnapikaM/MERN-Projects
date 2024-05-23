import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAccount, logout } from "../../actions/AuthActions";

const ManageAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { userId } = location.state || {};

  const handleCancel = () => {
    navigate(-1);
  };

  const handleDelete = (userId) => {
    dispatch(deleteAccount(userId));
    dispatch(logout());
    navigate(-1);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-y-auto"
      style={{ backgroundColor: `rgba(0, 0, 0, 0.7)` }}
    >
      <div className="px-4 py-8 rounded-lg w-[270px] flex flex-col items-center relative bg-white">
        <h2 className="font-bold mb-4">DELETE ACCOUNT</h2>
        <p className="text-center mb-4">
          You will lose access to your account once your deletion request has
          been submitted.
        </p>
        <div className="flex flex-between">
          <button className="mr-10 font-bold" onClick={handleCancel}>
            CANCEL
          </button>
          <button
            className="font-bold bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => handleDelete(userId)}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
