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

const items = [
  getItem("Dashboard", "/dashboard/", <PieChartOutlined />),
  getItem("Channel Insight", "/dashboard/channel-insight", <DesktopOutlined />),
  getItem(
    "Copyright Insight",
    "/dashboard/copyright-insight",
    <DesktopOutlined />
  ),
  getItem("System Master", "sub1", <UserOutlined />, [
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
            selectedKeys={[location.pathname]}
            onClick={({ key }) => navigate(key)}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          {/* <div className="flex bg-white items-center"> */}
            {/* <p className="h-12 ">Hello, Meet</p> */}
            {/* <div className="hidden md:flex"> */}
              <Navbar />
            {/* </div> */}
          {/* </div> */}
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
              <p className="text-2xl font-bold">Welcome, {user.userName}</p>
              <div className="">
                <Flex gap="small">
                  <Button danger onClick={logout}>
                    Logout
                  </Button>
                </Flex>
              </div>
            </div>
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/users" element={<Users />} />
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
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
