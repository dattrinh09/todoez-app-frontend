import { Avatar } from "antd";
import styled from "styled-components";

export const Header = styled.div`
  height: 192px;
  background-image: linear-gradient(to left, #00ffff, #00bfff, #1e90ff);
`;

export const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
  height: calc(100vh - 192px - 54px);
  position: relative;
`;

export const UserPhoto = styled(Avatar)`
  position: absolute;
  height: 100px;
  width: 100px;
  background-color: #1677ff;
  top: -50px;
  border-radius: 50%;
  font-size: 50px;
  font-weight: 600;
  letter-spacing: 5px;
  color: #fff;
  border: 2px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Section = styled.div`
  padding-top: 50px;
`;

export const UserName = styled.div`
  padding-top: 10px;
  font-size: 24px;
  font-weight: 700;
  color: #333;
`;

export const Info = styled.ul`
  padding-top: 20px;
  list-style: none;
`;

export const InfoItem = styled.li`
  font-size: 20px;
  padding-top: 10px;
  display: flex;
`;

export const Label = styled.div`
  width: 200px;
  color: #1677ff;
  font-weight: 600;
`;
