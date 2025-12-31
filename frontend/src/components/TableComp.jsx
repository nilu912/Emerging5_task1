import React, { act, useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { ConfigProvider, Input } from "antd";
import { IoFilterSharp } from "react-icons/io5";
import { MdFormatLineSpacing } from "react-icons/md";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
// import { data } from "../utils/userData.js";
import DrawerComp from "./DrowerComp.jsx";
import FilterModal from "../components/FilterModal.jsx";
import * as XLSX from "xlsx";
import { useAuth } from "../context/authContext.jsx";

const TableComp = ({ dataSet }) => {
  const { setIsLoading, isLoading } = useAuth();
  const [searchLoading, setSearchLoading] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectEditData, setSelectEditData] = useState(null);
  const [query, setQuery] = useState({ role: "All", type: "All" });
  const [arrow, setArrow] = useState("Show");
  let { Search } = Input;
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const updateData = (newData) => {
    setFilteredData(newData);
  };
  const filterBySearchValue = async (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setSearchLoading(true);
    let res = dataSet.filter((e) => {
      return e.name.includes(value);
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFilteredData(res);
    setSearchLoading(false);
  };
  const setQueryHandler = (queryInp) => {
    console.log(queryInp);
    setQuery(queryInp);
    // console.log("Query in table comp:", queryInp);
  };
  useEffect(() => {
    setIsLoading(true);
    setFilteredData(dataSet);
    setIsLoading(false);
  }, [dataSet]);

  // useEffect(() => {
  //   const filterData = () => {
  //     let filterUserData = data;
  //     if (query.role != "All")
  //       filterUserData = filterUserData.filter(
  //         (item) => item.rollname === query.role
  //       );
  //     if (query.type != "All")
  //       filterUserData = filterUserData.filter(
  //         (item) => item.usertype === query.type
  //       );
  //     setFilteredData(filterUserData);
  //   };
  //   filterData();
  // }, [query]);
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredData(dataSet);
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
      setFilteredData(dataSet);
      return;
    }
    const filteredData = dataSet.filter((item) => item.rollname === role);
    setFilteredData(filteredData);
  };
  const filterByUserType = (userType) => {
    if (userType === "All") {
      setFilteredData(dataSet);
      return;
    }
    const filteredData = dataSet.filter((item) => item.usertype === userType);
    setFilteredData(filteredData);
  };
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "UsersData.xlsx");
  };

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
              className="cursor-pointer hover:text-blue-900 transition-all duration-300"
              onClick={() => {
                setOpen(true);
                setIsEdit(true);
                setSelectEditData(record);
              }}
            >
              <FaEdit />
            </button>
            <MdDeleteForever className="cursor-pointer hover:text-blue-900 transition-all duration-300" />
            <FaKey className="cursor-pointer hover:text-blue-900 transition-all duration-300" />
          </div>
        );
      },
    },

    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      width: 110,
      // filters: [
      //   { text: "True", value: "true" },
      //   { text: "False", value: "false" },
      // ],
      render: (value) =>
        value ? (
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#1c398e",
              },
            }}
          >
            <Button color="primary" variant="outlined" size="small">
              True
            </Button>
          </ConfigProvider>
        ) : (
          <Button color="danger" variant="outlined" size="small">
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
      // filters: [
      //   { text: "Internal", value: "Internal" },
      //   { text: "External", value: "External" },
      // ],
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
      // filters: [
      //   { text: "Joe", value: "Joe" },
      //   { text: "Jim", value: "Jim" },
      // ],
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
      // filters: [
      //   { text: "Joe", value: "Joe" },
      //   { text: "Jim", value: "Jim" },
      // ],
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
      // filters: [
      //   { text: "London", value: "London" },
      //   { text: "New York", value: "New York" },
      // ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.localeCompare(b.address),
      sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];
  return (
    <>
      <div className="h-auto w-full p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row justify-between w-full gap-1 lg:gap-4 mb-4">
          <div className="flex flex-col xl:flex-row gap-2 xl:gap-10 w-full mt-3 md:px-2 md:mt-2">
            <div className="min-w-10 sm:w-90 md:min-w-75 md:mr-8">
              <ConfigProvider
                theme={{
                  components: {
                    Input: {
                      activeBorderColor: "#1c398e",
                      hoverBorderColor: "#1c398e",
                      colorTextPlaceholder: "#94a3b8",
                    },
                  },
                  token: {
                    colorPrimary: "#1c398e", // affects search icon
                  },
                }}
              >
                <Search
                  placeholder="Enter username to search"
                  loading={searchLoading}
                  enterButton
                  value={searchValue}
                  onChange={(e) => filterBySearchValue(e)}
                />
              </ConfigProvider>
            </div>
            {/* <div className="flex gap-1 md:gap-2">
              <Button onClick={clearFilters}>Clear filters</Button>
              <Button onClick={clearAll}>Clear filters and sorters</Button>
            </div> */}
          </div>
          {/* <div className="flex wrap gap-2 md:ml-auto w-full mt-3 h-7 md:px-2 md:mt-2 text-sm md:text-md items-center md:justify-end">
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
              filterByRoleValue={filterByRole}
              filterByUserTypeValue={filterByUserType}
              filterValues={setQueryHandler}
            />

            <button
              className="bg-blue-900 text-white px-3 py-1 rounded-full"
              onClick={() => exportToExcel()}
            >
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
          </div> */}
        </div>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={filteredData}
            onChange={handleChange}
            scroll={{ x: "max-content", y: 400 }}
            size="small"
          />
        </div>
        <DrawerComp
          open={open}
          onClose={() => setOpen(false)}
          isEdit={isEdit}
          editData={selectEditData}
          updateData={updateData}
        />
      </div>
      {/* <FilterModal open={filterModelOpen} handleCancel={()=>setFilterModelOpen(false)}/> */}
    </>
  );
};
export default TableComp;
