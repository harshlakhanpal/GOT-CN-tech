import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;

const Navbar = () => {
  return (
    <div>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <Menu theme="light" mode="horizontal" style={{ lineHeight: "64px" }}>
          <Menu.Item key="1">
            <div className="logo">
              <Link to="/">Game Of Thrones</Link>
            </div>
          </Menu.Item>
        </Menu>
      </Header>
    </div>
  );
};

export default Navbar;
