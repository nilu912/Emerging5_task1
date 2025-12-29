import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";
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
import { useAuth } from "../context/authContext.jsx";
import BreadcrumbComp from "../components/BreadcrumbComp.jsx";
import { LuLogOut } from "react-icons/lu";
import { MdFullscreenExit } from "react-icons/md";
import { IoIosLock } from "react-icons/io";

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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
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
            // defaultSelectedKeys={[location.pathname]}
            selectedKeys={[location.pathname]}
            // selectedGroupKeys={[]}
            onClick={({ key }) => navigate(key)}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <div className="h-auto min-h-12 flex bg-white items-center px-4">
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
                  <span className="text-lg">
                    <MdFullscreenExit onClick={logout} />
                  </span>
                  <div className="border-r-2 border-gray-500"></div>
                  <span className="text-lg">
                    <IoIosLock onClick={logout} />
                  </span>
                  <div className="border-r-2 border-gray-500"></div>
                  <span className="text-lg">
                    <LuLogOut onClick={logout} />
                  </span>
                </div>
                {/* </Button> */}
              </Flex>
            </div>
          </div>

          <Content style={{ margin: "0 16px" }}>
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
            <div className="h-16 border-b-2 border-gray-300 flex items-center justify-between">
              <BreadcrumbComp />
            </div>
            <div className="w-full bg-white min-h-[calc(100vh-200px)] overflow-hidden">
              <Routes>
                <Route index element={<DashboardHome />} />
                <Route path="/users" element={<Users />} />
                <Route path="*" element={<div>Page Not Found</div>} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};
export default Dashboard;
