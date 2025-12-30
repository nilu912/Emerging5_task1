import React, { use } from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { useAuth } from "../context/authContext";

const NavItems = ({ path }) => {
  const location = useLocation();
  return (
    // <Link to={location.pathname.split("/")}>
    { title: path }
    // </Link>
  );
};

const BreadcrumbComp = () => {
  const locationPath = useLocation();
  // let locationPaths;
  useEffect(() => {
    console.log(locationPath.pathname)
    // const calcPath = () => {
    //   locationPaths = locationPath.split("/");
    //   console.log(locationPath, locationPaths);
    // };
    // calcPath()
  }, []);
  return (
    <div className="font-bold text-lg">
      <Breadcrumb style={{fontSize: "15px"}}
        items={locationPath.pathname.split("/").map((path) => {
          return { title: path };
          // return <NavItems path={path} />;
        })}
      />
    </div>
    // <NavItems path={'hello'} />
  );
};

export default BreadcrumbComp;
