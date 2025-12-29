import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TableComp from "../../components/TableComp";

const Users = () => {
  return (
    <div className="w-full bg-gray-100 shadow-lg rounded-lg min-w-[20rem] overflow-x-auto">
      <TableComp />
    </div>
  );
};

export default Users;
