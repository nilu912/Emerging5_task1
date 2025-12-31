import React, { useState } from "react";
import { Button, Drawer, Layout, Radio, Space } from "antd";
import { Breadcrumb, ConfigProvider, Menu, theme } from "antd";
import logo from "../assets/pngwing.com.png";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
import { useNavigate } from "react-router-dom";
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

const StaticSidebarDrawer = ({ open, setOpen }) => {
  // const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  return (
    <>
      <Space>
        {/* <Button type="primary" onPointerEnter={showDrawer}>
          Open
        </Button> */}
      </Space>
      <Drawer
        // title="Basic Drawer"
        width={collapsed ? 80 : "auto"}
        placement="left"
        onPointerLeave={() => setOpen(false)}
        onClose={() => setOpen(false)}
        open={open}
        key="left"
        closable={false}
        headerStyle={{ display: "none" }}
        styles={{
          header: { display: "none" }, // remove header
          body: { padding: 0, overflowX: "hidden" }, // remove default padding
        }}
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#1c398e",
            },
          }}
        >
          <Layout style={{ minHeight: "100vh", width: "100%" }}>
            <Sider
              collapsible
              collapsed={collapsed}
              onPointerLeave={() => setOpen(false)}
              onCollapse={(value) => setCollapsed(value)}
              style={{ margin: 0, padding: 0 }}
              theme="light"
              className="
      bg-slate-50
    border-r border-gray-200
  "
            >
              <div
                className={`w-auto h-28 flex flex-col border-b-2 border-[#1c398e] justify-center items-center md:gap-3 py-4 md:py-2 md:mb-2`}
              >
                  <img
                    src={logo}
                    alt="logoImg"
                    className="h-8 w-8 md:h-16 md:w-16 transition-all duration-300 ease-in-out"
                  />
                <p
                  className={`hidden md:flex text-[#1c398e] font-bold
      transition-all duration-300 ease-in-out ${
        collapsed ? "opacity-0" : "opacity-100"
      }`}
                >
                  INDITRONICS
                </p>
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
                className="bg-slate-50"
              />
            </Sider>{" "}
          </Layout>
        </ConfigProvider>
      </Drawer>
    </>
  );
};
export default StaticSidebarDrawer;
