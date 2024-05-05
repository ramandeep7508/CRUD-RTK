import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";

import Link from "next/link";

const Read = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState();

  const [showPopup, setShowPopup] = useState(false);

  const [radioData, serRadioData] = useState("");

  const { users, loading, searchData } = useSelector((state) => state.app);

  console.log("users", users);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      {showPopup && (
        <CustomModal
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}

      <h1 className="flex items-center justify-center my-4 text-2xl">
        All the data
      </h1>
      <div className="flex items-center justify-center my-4">
        <input type="radio" name="gender" value="" checked={radioData === ''}  onChange={(e) => serRadioData(e.target.value)} className="mx-2" />
        <label>ALL</label>
        <input type="radio" name="gender" value="Male" checked={radioData === 'Male'} onChange={(e) => serRadioData(e.target.value)}  className="mx-2" />
        <label>Male</label>
        <input type="radio" name="gender" value="Female"  checked={radioData === 'Female'} onChange={(e) => serRadioData(e.target.value)}  className="mx-2" />
        <label>Female</label>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Age
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                View
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users
                .filter((ele) => {
                  if (searchData.length === 0) {
                    return ele;
                  } else {
                    return ele.name
                      .toLowerCase()
                      .includes(searchData.toLowerCase());
                  }
                })
                .filter((ele)=>{
                    if(radioData === 'Male'){
                      return ele.gender === radioData;
                    }else if(radioData === 'Female'){
                      return ele.gender === radioData;
                    }else{
                       return ele
                       
                    }
                })

                .map((ele) => (
                  <tr
                    key={ele.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {ele.name}
                    </th>
                    <td className="px-6 py-4">{ele.email}</td>
                    <td className="px-6 py-4">{ele.age}</td>
                    <td className="px-6 py-4">{ele.gender}</td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => [setId(ele.id), setShowPopup(true)]}
                      >
                        View
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/edit/${ele.id}`}
                        // onClick={() => [setId(ele.id), setShowUpdatePopup(true)]}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                        onClick={() => dispatch(deleteUser(ele.id))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Read;
