import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TableComp from "../../components/TableComp";
import { useAuth } from "../../context/authContext.jsx";
const Users = ({ dataSet }) => {
  const {isLoading, setIsLoading} = useAuth();
  useEffect(() => {
    setIsLoading(true);
    console.log("DataSet in Users page:", dataSet);
    setIsLoading(false);
  }, [dataSet]);
  if(isLoading)
    return <div>Loading...</div>
  return (
    <div className="w-full bg-gray-100 shadow-lg border border-gray-300 rounded-lg min-w-[20rem] overflow-x-auto">
      <TableComp dataSet={dataSet} />
    </div>
  );
};

export default Users;
