import React, { act, useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { Input } from "antd";
import { IoFilterSharp } from "react-icons/io5";
import { MdFormatLineSpacing } from "react-icons/md";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { data } from "../utils/userData.js";
import DrawerComp from "./DrowerComp.jsx";
import FilterModal from "../components/FilterModal.jsx";
import * as XLSX from 'xlsx';

const TableComp = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectEditData, setSelectEditData] = useState(null);
  const [arrow, setArrow] = useState("Show");
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredData(data);
    setSearchValue("");
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };
  const filterByRole = (role) => {
    if (role === "All") {
      setFilteredData(data);
      return;
    }
    const filteredData = data.filter((item) => item.rollname === role);
    setFilteredData(filteredData);
  };
  const filterByUserType = (userType) => {
    if (userType === "All") {
      setFilteredData(data);
      return;
    }
    const filteredData = data.filter((item) => item.usertype === userType);
    setFilteredData(filteredData);
  };
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "UsersData.xlsx");
  }

  const columns = [
    {
      title: "Action",
      width: 100,
      // dataIndex: "email",
      // key: "key",
      // filteredValue: filteredInfo.email || null,
      // onFilter: (value, record) => record.email.includes(value),
      // sorter: (a, b) => a.email.localeCompare(b.email),
      // sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, record) => {
        return (
          <div className="flex gap-3 text-md">
            <button
              onClick={() => {
                setOpen(true);
                setIsEdit(true);
                setSelectEditData(record);
              }}
            >
              <FaEdit />
            </button>
            <MdDeleteForever />
            <FaKey />
          </div>
        );
      },
    },

    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      width: 110,
      filters: [
        { text: "True", value: "true" },
        { text: "False", value: "false" },
      ],
      render: (value) =>
        value ? (
          <Button color="primary" variant="outlined">
            True
          </Button>
        ) : (
          <Button color="danger" variant="outlined">
            False
          </Button>
        ),
      filteredValue: filteredInfo.active || null,
      onFilter: (value, record) => record.active.includes(value.toString()),
      sorter: (a, b) => a.active.toString().localeCompare(b.active.toString()),
      sortOrder: sortedInfo.columnKey === "active" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "User Type",
      dataIndex: "usertype",
      key: "usertype",
      width: 130,
      filters: [
        { text: "Internal", value: "Internal" },
        { text: "External", value: "External" },
      ],
      filteredValue: filteredInfo.usertype || null,
      onFilter: (value, record) => record.usertype.includes(value),
      sorter: (a, b) => a.usertype.localeCompare(b.usertype),
      sortOrder: sortedInfo.columnKey === "usertype" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "User Name",
      dataIndex: "name",
      width: 140,
      key: "name",
      filters: [
        { text: "Joe", value: "Joe" },
        { text: "Jim", value: "Jim" },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Client Name",
      dataIndex: "clientname",
      key: "clientname",
      width: 150,
      filters: [
        { text: "Joe", value: "Joe" },
        { text: "Jim", value: "Jim" },
      ],
      filteredValue: filteredInfo.clientname || null,
      onFilter: (value, record) => record.clientname.includes(value),
      sorter: (a, b) => a.clientname.length - b.clientname.length,
      sortOrder:
        sortedInfo.columnKey === "clientname" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      width: 80,
      key: "age",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Role Name",
      dataIndex: "rollname",
      width: 120,
      key: "rollname",
      filteredValue: filteredInfo.rollname || null,
      onFilter: (value, record) => record.rollname.includes(value),
      sorter: (a, b) => a.rollname.localeCompare(b.rollname),
      sortOrder: sortedInfo.columnKey === "rollname" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Email Id",
      dataIndex: "email",
      width: 200,
      key: "email",
      filteredValue: filteredInfo.email || null,
      onFilter: (value, record) => record.email.includes(value),
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Contact No",
      dataIndex: "contactno",
      width: 130,
      key: "contactno",
      filteredValue: filteredInfo.contactno || null,
      onFilter: (value, record) => record.contactno.includes(value),
      sorter: (a, b) => a.contactno.localeCompare(b.contactno),
      sortOrder: sortedInfo.columnKey === "contactno" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      filters: [
        { text: "London", value: "London" },
        { text: "New York", value: "New York" },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.localeCompare(b.address),
      sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];
  let { Search } = Input;
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const updateData = (newData) => {
    setFilteredData(newData);
  };
  const filterBySearchValue = async (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setIsLoading(true);
    let res = data.filter((e) => {
      return e.name.includes(value);
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFilteredData(res);
    setIsLoading(false);
  };
  return (
    <>
      <Space
        style={{ marginBottom: 16 }}
        className="flex justify-between w-full items-center"
      >
        <div className="flex flex-col md:flex-row gap-10 w-full mt-3 md:px-2 md:mt-2">
          <div className="min-w-75 md:mr-8">
            <Search
              placeholder="input search loading with enterButton"
              loading={isLoading}
              enterButton
              value={searchValue}
              onChange={(e) => filterBySearchValue(e)}
            />
          </div>
          <div className="flex md:gap-2">
            {/* <Button onClick={setAgeSort}>Sort age</Button> */}
            <Button onClick={clearFilters}>Clear filters</Button>
            <Button onClick={clearAll}>Clear filters and sorters</Button>
          </div>
        </div>
        <div className="flex gap-2 md:ml-auto w-full mt-3 md:px-2 md:mt-2">
          <button className="bg-blue-900 text-white px-3 py-1 rounded-full">
            <span className="flex items-center gap-2 justify-center">
              <MdFormatLineSpacing />
              Columns
            </span>
          </button>
          <FilterModal
            arrow={arrow}
            setArrow={setArrow}
            dataSet={filteredData}
            filterByRole={filterByRole}
            filterByUserType={filterByUserType}
          />

          {/* <button className="bg-blue-900 text-white px-3 py-1 rounded-full" onClick={()=> setFilterModelOpen(true)}>
            <span className="flex items-center gap-2 justify-center">
              <IoFilterSharp />
              Filter
            </span>
          </button> */}
          <button className="bg-blue-900 text-white px-3 py-1 rounded-full" onClick={() => exportToExcel()}>
            <span className="flex items-center gap-2 justify-center">
              <PiMicrosoftExcelLogoFill />
              Excel
            </span>
          </button>
          <button
            className="bg-blue-900 text-white px-3 py-1 rounded-full"
            onClick={() => {
              setOpen(true);
              setIsEdit(false);
              setSelectEditData(null);
            }}
          >
            <span className="flex items-center gap-2 justify-center">
              <IoMdAdd />
              Add User
            </span>
          </button>
        </div>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredData}
        onChange={handleChange}
        className="min-w-200"
      />
      <DrawerComp
        open={open}
        onClose={() => setOpen(false)}
        isEdit={isEdit}
        editData={selectEditData}
        updateData={updateData}
      />
      {/* <FilterModal open={filterModelOpen} handleCancel={()=>setFilterModelOpen(false)}/> */}
    </>
  );
};
export default TableComp;
