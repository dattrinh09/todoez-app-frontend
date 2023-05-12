import { Button } from "antd";
import styled from "styled-components";

export const TeamDetailLayout = styled.div``;

export const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export const Heading = styled.div`
  margin: 30px 0;
  display: flex;
  gap: 10px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1677ff;
`

export const BtnGroup = styled.div`
  margin-top: 7px;
  display: flex;
  gap: 5px;
`

export const Section = styled.div``;

export const Items = styled.ul`
  list-style: none;
`;

export const Item = styled.li`
  margin: 20px 0;
  display: flex;
`;

export const ItemTitle = styled.p`
  font-size: 18px;
  font-weight: ${props => props.isCreator ? "600" : ""};
  width: 200px;
  color: #333;
`;

export const ErrorMsg = styled.div`
  color: red;
  text-align: center;
  padding-bottom: 10px;
`;
