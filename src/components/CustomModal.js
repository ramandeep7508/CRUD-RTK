import React from "react";
import { useSelector } from "react-redux";

const CustomModal = ({ id, showPopup, setShowPopup }) => {
  const alldata = useSelector((state) => state.app.users);

  const singledata = alldata.filter((ele) => ele.id === id);

  return (
    <div className="fixed  inset-0 flex items-center justify-center z-50 opacity-95 bg-black">
      <div className="bg-white p-2 w-96 h-96 rounded-lg shadow-xl flex flex-col">
        <div className="flex justify-end">
          <button
            className="text-white  bg-red-700 hover:bg-red-800  font-medium rounded-full text-sm px-5 py-2.5  me-2 mb-2"
            onClick={() => setShowPopup(false)}
          >
            Close
          </button>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h2>Name = {singledata[0].name}</h2>
          <h3>Email = {singledata[0].email}</h3>
          <h4>Age = {singledata[0].age}</h4>
          <h5>Gender = {singledata[0].gender}</h5>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
