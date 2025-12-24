import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Input } from "antd";

const { Search } = Input;

const Users = () => {
  return (
    <div className="w-full bg-gray-100 shadow-lg rounded-lg">
      <Search
        placeholder="input search loading with enterButton"
        loading
        enterButton
      />
    </div>
  );
};

export default Users;
