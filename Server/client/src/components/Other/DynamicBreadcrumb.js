import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import "./style.css";

const DynamicBreadcrumb = ({ middleBreadcrum, middleHref, lastBreadcrum }) => {
  console.log(middleBreadcrum, middleHref, lastBreadcrum);
  return (
    <Breadcrumb className="es-breadcrumb">
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>
        {middleHref != "" ? (
          <Link to={middleHref}> {middleBreadcrum} </Link>
        ) : (
          { middleBreadcrum }
        )}
      </Breadcrumb.Item>
      {lastBreadcrum != "" ? (
        <Breadcrumb.Item>{lastBreadcrum}</Breadcrumb.Item>
      ) : (
        ""
      )}
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
