import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";

const Breadcrumb = () => {
      const location = useLocation();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  useEffect(() => {
    // const pathItems = location.pathname.split("/");
    console.log("hello");
    //  console.log(breadcrumbItems)
  }, []);

  return (
    <Breadcrumb
      items={[
        {
          title: "Home",
        },
        {
          title: <a href="">Application Center</a>,
        },
        {
          title: <a href="">Application List</a>,
        },
        {
          title: "An Application",
        },
      ]}
    />
  );
};

export default Breadcrumb;
