import styled from "styled-components";

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleBar = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #555;
`;

export const Sub = styled.div`
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
`;

export const SubIcon = styled.div`
  color: #1677ff;
`;

export const SubText = styled.span`
  padding-top: 2px;
  color: #555;
`;

export const Items = styled.ul`
  list-style: none;
`;

export const Item = styled.li`
  display: flex;
  margin-bottom: 20px;
`;

export const ItemTitle = styled.p`
  font-size: 18px;
  font-weight: ${(props) => (props.isCreator ? "700" : "500")};
  width: 200px;
  color: #333;
`;

export const ErrorMsg = styled.div`
  color: red;
  text-align: center;
  padding-bottom: 10px;
`;
