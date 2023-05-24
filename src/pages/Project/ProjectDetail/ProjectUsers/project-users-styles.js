import styled from "styled-components";

export const ProjectUsersLayout = styled.div``;

export const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export const Heading = styled.div`
  padding-top: 30px;
  display: flex;
  gap: 20px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1677ff;
`;

export const BtnGroup = styled.div`
  margin-top: 7px;
  display: flex;
  gap: 5px;
`;

export const Sub = styled.div`
  margin-top: 5px;
  font-weight: 600;
  display: flex;
  gap: 5px;
`;

export const SubIcon = styled.div`
  color: #1677ff;
`;

export const SubText = styled.span`
  font-size: 18px;
  color: #888;
`;

export const Description = styled.div`
  margin: 20px 0;
  color: #888;
`;

export const Items = styled.ul`
  list-style: none;
`;

export const Item = styled.li`
  margin: 20px 0;
  display: flex;
`;

export const ItemTitle = styled.p`
  font-size: 18px;
  font-weight: ${(props) => (props.isCreator ? "600" : "")};
  width: 200px;
  color: #333;
`;

export const ErrorMsg = styled.div`
  color: red;
  text-align: center;
  padding-bottom: 10px;
`;
