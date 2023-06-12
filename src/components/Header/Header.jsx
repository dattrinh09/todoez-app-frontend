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
import { Link, useNavigate } from "react-router-dom";
import { ConstantsPath } from "@/constants/ConstantsPath";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "@/stores/selectors";
import { formatDisplayName } from "@/utils/formatInfo";
import { Dropdown } from "antd";
import axiosInstance from "@/request/axiosInstance";
import { userInfoRemove } from "@/stores/reducers/userSlice";
import { errorResponse } from "@/utils/errorResponse";

const Header = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector(userSelector);
  const dispatch = useDispatch();
  const handleSignout = async () => {
    try {
      await axiosInstance.get("auth/signout");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      dispatch(userInfoRemove());
      navigate(ConstantsPath.HERO_PAGE);
    } catch (e) {
      errorResponse(e.response);
    }
  };
  const items = [
    {
      key: "1",
      label: <Link to={ConstantsPath.PROFILE}>My profile</Link>,
    },
    {
      key: "2",
      label: <div onClick={handleSignout}>Sign out</div>,
    },
  ];
  return (
    <HeaderLayout>
      <Container>
        <Link to={ConstantsPath.MY_PAGE}>
          <Logo>TodoEZ</Logo>
        </Link>
        <Menu>
          {userInfo ? (
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
                <UserIcon>{formatDisplayName(userInfo.fullname)}</UserIcon>
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
