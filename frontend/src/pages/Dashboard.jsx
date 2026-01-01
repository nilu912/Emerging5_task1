import React, { useState, useEffect } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from "antd";
import Navbar from "../components/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import logo from "../assets/pngwing.com.png";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
import { Button, Flex } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardHome from "./dashboardPages/DashboardHome.jsx";
import Users from "./dashboardPages/Users.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import BreadcrumbComp from "../components/BreadcrumbComp.jsx";
import { LuLogOut } from "react-icons/lu";
import { MdFullscreenExit } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { MdFormatLineSpacing } from "react-icons/md";
import FilterModal from "../components/FilterModal.jsx";
import { data } from "../utils/userData.js";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import DrawerComp from "../components/DrowerComp.jsx";
import { IoCloseOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import SidebarDrawer from "../components/SidebarDrawer.jsx";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import * as XLSX from "xlsx";
import StaticSidebarDrawer from "../components/StaticSidebarDrawer.jsx";
import { FaArrowCircleRight } from "react-icons/fa";

const items = [
  getItem("Dashboard", "/dashboard/", <PieChartOutlined />),
  getItem("Channel Insight", "/dashboard/channel-insight", <DesktopOutlined />),
  getItem(
    "Copyright Insight",
    "/dashboard/copyright-insight",
    <DesktopOutlined />
  ),
  getItem("System Master", "/system-master", <UserOutlined />, [
    getItem("User", "/dashboard/users"),
    getItem("Roles", "/dashboard/roles"),
  ]),
  getItem("Master", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];
const Dashboard = () => {
  const { user, logout, isLoading, setIsLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [arrow, setArrow] = useState("Show");
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState({ role: "All", type: "All" });
  const [isEdit, setIsEdit] = useState(false);
  const [selectEditData, setSelectEditData] = useState(null);
  const updateData = (newData) => {
    setFilteredData(newData);
  };
  const [open, setOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [sliderOpen, setSliderOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = sliderOpen || isHovered;
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
  const exportToExcel = async () => {
    setIsLoading(true);
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    await XLSX.writeFile(workbook, "UsersData.xlsx");
    setIsLoading(false);
  };
  const setQueryHandler = (queryInp) => {
    console.log(queryInp);
    setQuery(queryInp);
    // console.log("Query in table comp:", queryInp);
  };
  useEffect(() => {
    setIsLoading(true);
    if (
      location.pathname.startsWith("/dashboard/users") ||
      location.pathname.startsWith("/dashboard/roles")
    ) {
      setOpenKeys(["/system-master"]);
    } else {
      setOpenKeys([]);
    }
    setIsLoading(false);
  }, [location.pathname]);
  useEffect(() => {
    setIsLoading(true);
    const filterData = () => {
      let filterUserData = data;
      if (query.role != "All")
        filterUserData = filterUserData.filter(
          (item) => item.rollname === query.role
        );
      if (query.type != "All")
        filterUserData = filterUserData.filter(
          (item) => item.usertype === query.type
        );
      setFilteredData(filterUserData);
    };
    filterData();
    setIsLoading(false);
  }, [query]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {/* LEFT EDGE CONTROLLER */}
      {/* <div className="fixed left-0 top-0 h-full z-50 flex items-center">
        {!sliderOpen && (
        // Floating Arrow Button
          <button
            onClick={() => setSliderOpen(true)}
            className="h-12 w-5 hover:w-9 
                 bg-blue-900 text-white 
                 rounded-tr-md rounded-br-md
                 shadow-xl backdrop-blur-md
                 flex items-center justify-center
                 transition-all duration-300 ease-in-out
                 hover:bg-blue-800"
          >
            <MdKeyboardDoubleArrowRight className="text-lg" />
          </button>
        )}

        <SidebarDrawer open={sliderOpen} setOpen={setSliderOpen} />
      </div> */}

      {/* <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1c398e", // selector / active indicator
          },
          components: {
            Layout: {
              siderBg: "#0f172a", // sidebar background
            },
            Menu: {
              darkItemBg: "#0f172a",
              darkItemColor: "#cbd5f5",

              darkItemHoverBg: "#1e293b",
              darkItemHoverColor: "#ffffff",

              darkItemSelectedBg: "#1c398e",
              darkItemSelectedColor: "#ffffff",

              darkSubMenuItemBg: "#020617",
            },
          },
        }}
      > */}
      {/* <Layout style={{ minHeight: "100vh" }}> */}
      <Layout className={`min-h-screen transition-all duration-300`}>
        {!sliderOpen && (
          <div
            className="h-screen hidden md:block"
            style={{ width: "80px", flexShrink: 0, background: "transparent" }}
          ></div>
        )}
        <div
          className={`h-screen px-2 py-2 rounded-lg z-50`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            // MAGIC SWITCH: If Pinned -> Relative. If Hovered -> Absolute.
            position: sliderOpen ? "relative" : "absolute",
            height: "100vh",
            left: 0,
            top: 0,
          }}
        >
          <Sider
            // collapsible
            collapsed={!isExpanded}
            onMouseEnter={() => setCollapsed(false)}
            trigger={null}
            onMouseLeave={() => setCollapsed(true)}
            onCollapse={(value) => {
              setCollapsed(value);
            }}
            theme="light"
            className="bg-slate-50 border-r rounded-lg border-gray-200 h-full shadow-xl"
            style={{ height: "100%" }}
            collapsedWidth={64}
          >
            <div className="h-full overflow-auto flex flex-col shadow-lg border border-gray-400 rounded-lg justify-between">
              {" "}
              <div
                className={`w-auto flex flex-col border-b-2 border-[#1c398e] justify-center items-center md:gap-3 py-4 md:py-2 md:mb-2`}
              >
                <div
                  className="flex flex-row items-center gap-2 cursor-pointer"
                  onClick={() => setSliderOpen(!sliderOpen)} // Toggle "Pin" state
                >
                  {" "}
                  <FaArrowCircleRight
                    size={40}
                    className={`transition-transform duration-300 ${
                      sliderOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
                {/* <p
                  className={`hidden md:flex text-[#1c398e] font-bold
      transition-all duration-300 ease-in-out ${
        (sliderOpen && collapsed) ? "opacity-0" : "opacity-100"
      }`}
                >
                  INDITRONICS
                </p> */}
              </div>
              <div className="demo-logo-vertical" />
              <Menu
                theme="light"
                mode="inline"
                // defaultSelectedKeys={[location.pathname]}
                selectedKeys={[location.pathname]}
                // selectedGroupKeys={[]}
                openKeys={openKeys}
                onClick={({ key }) => navigate(key)}
                onOpenChange={(keys) => setOpenKeys(keys)}
                items={items}
              />
              <div
                className={`w-auto h-28 flex flex-col border-t-2 border-[#1c398e] justify-center items-center md:gap-3 py-4 md:py-2 md:mb-2 mt-auto`}
              >
                <img
                  src={logo}
                  alt="logoImg"
                  className="h-8 w-8 md:h-16 md:w-16 transition-all duration-300 ease-in-out"
                />
                <p
                  className={`hidden md:flex text-[#1c398e] font-bold whitespace-nowrap
                    transition-all duration-300 ease-in-out ${
                      !isExpanded
                        ? "opacity-0 w-0 overflow-hidden"
                        : "opacity-100 w-auto hidden"
                    }`}
                >
                  INDITRONICS
                </p>
              </div>
              <div className="demo-logo-vertical" />
            </div>
          </Sider>
        </div>

        {/* <div className="fixed left-0 top-0 h-full z-50 flex items-center">
          {!sliderOpen && (
            // Floating Arrow Button
            <button
              onClick={() => setSliderOpen(true)}
              className="h-12 w-5 hover:w-9 
                 bg-blue-900 text-white 
                 rounded-tr-md rounded-br-md
                 shadow-xl backdrop-blur-md
                 flex items-center justify-center
                 transition-all duration-300 ease-in-out
                 hover:bg-blue-800"
            >
              <MdKeyboardDoubleArrowRight className="text-lg" />
            </button>
          )}



          <StaticSidebarDrawer open={sliderOpen} setOpen={setSliderOpen} />
        </div> */}

        {/* <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div
              className={`w-auto h-28 flex flex-col border-b-2 border-white/70 justify-center items-center md:gap-3 py-4 md:py-2 md:mb-2`}
            >
              <img
                src={logo}
                alt="logoImg"
                className="h-8 w-8 md:h-16 md:w-16 transition-all duration-300 ease-in-out"
              />
              <p
                className={`hidden md:flex text-white font-bold
      transition-all duration-300 ease-in-out ${
        collapsed ? "opacity-0" : "opacity-100"
      }`}
              >
                INDITRONICS
              </p>
            </div>
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              // defaultSelectedKeys={[location.pathname]}
              selectedKeys={[location.pathname]}
              // selectedGroupKeys={[]}
              openKeys={openKeys}
              onClick={({ key }) => navigate(key)}
              onOpenChange={(keys) => setOpenKeys(keys)}
              items={items}
            />
          </Sider> */}
        {/* <Layout> */}
        <Layout className={`flex flex-col`}>
          <div className="h-auto min-h-12 border-b border-gray-300 shadow-md flex bg-white relative z-20 items-center px-4">
            <p className="text-xl font-bold text-gray-800 min-w-[12rem] w-[16rem]">
              Welcome, {user.userName}
            </p>
            {/* <div className="hidden md:block w-full">
              <Navbar />
            </div> */}
            <div className="ml-auto text-center">
              <Flex gap="small">
                <div className="flex gap-3">
                  {/* <Button danger onClick={logout}> */}
                  <span className="text-lg cursor-pointer">
                    <MdFullscreenExit onClick={logout} />
                  </span>
                  <div className="border-r-2 border-gray-500"></div>
                  <span className="text-lg cursor-pointer">
                    <IoIosLock onClick={logout} />
                  </span>
                  <div className="border-r-2 border-gray-500"></div>
                  <span className="text-lg cursor-pointer">
                    <LuLogOut onClick={logout} />
                  </span>
                </div>
                {/* </Button> */}
              </Flex>
            </div>
          </div>

          {/* <Content className="px-4 py-2 bg-gray-100 min-h-[calc(100vh-120px)]"> */}
          <Content className="flex-1 px-4 py-2 bg-gray-100">
            {/* <Breadcrumb
              style={{ margin: "16px 0" }}
              items={[{ title: "User" }, { title: "Bill" }]}
            /> */}
            {/* <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              Bill is a cat.
            </div> */}
            {/* <div className="h-auto w-auto lg:h-21 gap-2 lg:gap-0 py-2 md:py-2 flex items-start justify-center lg:items-start flex-col md:flex-row ">
              <div className="w-auto md:min-w-[24rem] lg:px-2 flex flex-col gap-1 h-auto"> */}
            <div className="h-auto w-auto lg:h-18 pb-2 lg:pb-0 gap-2 lg:gap-0 flex items-start justify-center lg:items-start flex-col md:flex-row ">
              <div className="w-auto md:min-w-[24rem] lg:px-2 flex flex-col gap-1 h-auto">
                {/* <BreadcrumbComp /> */}
                {/* <div className="flex gap-2 flex-wrap items-center px-2 mr-20 "> */}
                <div className="flex gap-1 items-center px-2">
                  <FaUser className="" />
                  <div className="flex  items-center py-1 items-center rounded-md">
                    {location.pathname
                      .split("/")
                      .filter(Boolean)
                      .map((path, index, arr) => (
                        <Link key={index} to={`/${path}`}>
                          <p className="text-md text-black font-bold">
                            {path.toLocaleUpperCase()}
                            {index < arr.length - 1 && (
                              <MdKeyboardArrowRight className="inline h-5 w-5 -translate-y-[1px]" />
                            )}
                          </p>
                        </Link>
                      ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  {query.type && query.type != "All" && (
                    <div className="w-auto border border-gray-500 flex bg-gray-200 rounded-full px-3 py-[2px] gap-2 items-center justify-start">
                      <p className="whitespace-nowrap">
                        User Type:{" "}
                        <span className="text-blue-900 font-bold">
                          {query.type}
                        </span>
                      </p>
                      <button
                        className="translate-y-[1px] cursor-pointer"
                        onClick={() => {
                          setQuery((pre) => ({ ...pre, type: "All" }));
                        }}
                      >
                        <IoCloseOutline size={18} />
                      </button>
                    </div>
                  )}
                  {query.role && query.role != "All" && (
                    <div className=" w-auto border border-gray-500 flex bg-gray-200 rounded-full px-3 py-[2px] gap-2 items-center justify-start">
                      <p className="whitespace-nowrap">
                        User Role:{" "}
                        <span className="text-blue-900 font-bold">
                          {query.role}
                        </span>
                      </p>
                      <button
                        className="translate-y-[1px] cursor-pointer"
                        onClick={() =>
                          setQuery((pre) => ({ ...pre, role: "All" }))
                        }
                      >
                        <IoCloseOutline size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex wrap gap-2 lg:ml-auto w-full h-7 lg:px-2 text-sm lg:text-md items-center justify-start lg:justify-end">
                <button className="bg-blue-900 text-white px-3 py-1 rounded-full cursor-pointer hover:shadow-2xl hover:bg-blue-800 hover:bg-blue-800 transition-all duration-300">
                  <span className="flex items-center gap-2 h-5 w-5 sm:h-auto sm:w-auto justify-center">
                    <MdFormatLineSpacing className="translate-y-[1px]"/>
                    <div className="hidden sm:block">
                      <p className="whitespace-nowrap">Columns</p>
                    </div>
                  </span>
                </button>
                <FilterModal
                  arrow={arrow}
                  setArrow={setArrow}
                  dataSet={data}
                  filterByRoleValue={filterByRole}
                  filterByUserTypeValue={filterByUserType}
                  filterValues={setQueryHandler}
                  queryVal={query}
                />

                <button
                  className="bg-blue-900 text-white px-3 py-1 rounded-full cursor-pointer hover:shadow-2xl hover:bg-blue-800 transition-all duration-300"
                  onClick={() => exportToExcel()}
                >
                  <span className="flex items-center gap-2 h-5 w-5 sm:h-auto sm:w-auto justify-center">
                    <PiMicrosoftExcelLogoFill className="translate-y-[1px]"/>
                    <div className="hidden sm:block">
                      <p className="whitespace-nowrap">Excel</p>
                    </div>
                  </span>
                </button>
                <button
                  className="bg-blue-900 text-white px-3 py-1 rounded-full cursor-pointer hover:shadow-2xl hover:bg-blue-800 transition-all duration-300"
                  onClick={() => {
                    setOpen(true);
                    setIsEdit(false);
                    setSelectEditData(null);
                  }}
                >
                  <span className="flex items-center gap-2 h-5 w-5 sm:h-auto sm:w-auto justify-center">
                    <IoMdAdd className="translate-y-[1px]"/>
                    <div className="hidden sm:block">
                      <p className="whitespace-nowrap">Add User</p>
                    </div>
                  </span>
                </button>
              </div>
            </div>
            <div className="w-full rounded-lg shadow-lg flex-1 overflow-hidden relative">
              <Routes>
                <Route index element={<DashboardHome />} />
                <Route
                  path="/users"
                  element={<Users dataSet={filteredData} />}
                />
                <Route path="*" element={<div>Page Not Found</div>} />
              </Routes>
              <DrawerComp
                open={open}
                onClose={() => setOpen(false)}
                isEdit={isEdit}
                editData={selectEditData}
                updateData={updateData}
              />
            </div>
          </Content>
          {/* <Footer style={{ textAlign: "center", backgroundColor: "#ffffff" }}> */}
          <Footer className="text-center flex justify-center items-center bg-white border-t border-gray-400 h-3">
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
      {/* </ConfigProvider> */}
    </>
  );
};
export default Dashboard;
