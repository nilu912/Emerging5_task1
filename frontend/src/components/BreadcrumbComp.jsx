import React, { use } from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { useAuth } from "../context/authContext";

const NavItems = ({ path }) => {
  const location = useLocation();
  return (
    // <Link to={location.pathname.split("/")}>
      {title: path}
    // </Link>
  );
};

const BreadcrumbComp = () => {
  const { locationPaths } = useAuth();
  return (
    <div className="font-bold">
    <Breadcrumb
      items={locationPaths.map((path) => {
        return { title: path };
        // return <NavItems path={path} />;
      })}
    />
    </div>
    // <NavItems path={'hello'} />
  );
};

export default BreadcrumbComp;
