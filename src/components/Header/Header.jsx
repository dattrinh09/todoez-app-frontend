import React, { useState } from "react";
import {
  Container,
  HeaderLayout,
  Item,
  Logo,
  Menu,
  SignUp,
  UserIcon,
} from "./header-styles";
import { Link, useNavigate } from "react-router-dom";
import { ConstantsPath } from "@/constants/ConstantsPath";
import { Button, Dropdown } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import api from "@/api/api";
import { errorResponse } from "@/utils/errorResponse";
import MyAvatar from "../MyAvatar/MyAvatar";

const Header = ({ info }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await api.get("auth/signout");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate(ConstantsPath.SIGN_IN);
    } catch (e) {
      errorResponse(e.response);
    } finally {
      setIsLoading(false);
    }
  };
  const items = [
    {
      key: "1",
      label: (
        <Link to={ConstantsPath.PROFILE}>
          <Button type="ghost" icon={<UserOutlined />}>
            My Profile
          </Button>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Button
          type="ghost"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          loading={isLoading}
        >
          Sign out
        </Button>
      ),
    },
  ];
  return (
    <HeaderLayout>
      <Container>
        <Link to={ConstantsPath.MY_PAGE}>
          <Logo>TodoEZ</Logo>
        </Link>
        <Menu>
          {info ? (
            <>
              <Link to={ConstantsPath.MY_TASK}>
                <Item>Tasks</Item>
              </Link>
              <Link to={ConstantsPath.PROJECT_LIST}>
                <Item>Projects</Item>
              </Link>
              <Link to={ConstantsPath.TEAM_LIST}>
                <Item>Teams</Item>
              </Link>
              <Dropdown
                menu={{ items }}
                trigger={["click"]}
                placement="bottomRight"
                arrow
              >
                <UserIcon>
                  <MyAvatar src={info.avatar} name={info.fullname} />
                </UserIcon>
              </Dropdown>
            </>
          ) : (
            <>
              <Link to={ConstantsPath.SIGN_IN}>
                <Item>Sign In</Item>
              </Link>
              <Link to={ConstantsPath.SIGN_UP}>
                <SignUp>Sign Up</SignUp>
              </Link>
            </>
          )}
        </Menu>
      </Container>
    </HeaderLayout>
  );
};

export default Header;
