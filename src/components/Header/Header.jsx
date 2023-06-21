import React from "react";
import {
  Container,
  HeaderLayout,
  Item,
  Logo,
  Menu,
  SignUp,
  UserIcon,
} from "./header-styles";
import { Link } from "react-router-dom";
import { ConstantsPath } from "@/constants/ConstantsPath";
import { formatDisplayName } from "@/utils/formatInfo";
import { Button, Dropdown } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useLogout } from "@/hooks/auth";

const Header = ({ info }) => {
  const { logoutFn, isLogoutLoading } = useLogout();
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
          loading={isLogoutLoading}
          onClick={() => logoutFn()}
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
              <Link to="">
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
                <UserIcon>{formatDisplayName(info.fullname)}</UserIcon>
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
