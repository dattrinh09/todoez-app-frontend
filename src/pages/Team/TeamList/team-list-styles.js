import styled from "styled-components";

export const TeamListLayout = styled.div``;

export const Container = styled.div`
  padding-top: 30px;
  width: 1200px;
  margin: 0 auto;
`;

export const Heading = styled.div`
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 700;
  color: #1677ff;
`;

export const Section = styled.div`
  margin-top: 50px;
`;

export const Items = styled.ul`
  list-style: none;
`;

export const Item = styled.li`
  width: 200px;
  background-color: #e6f7ff;
  border-radius: 5px;
  border: 1px solid #aaa;
  padding: 10px;
  margin: 20px 0;
  &:hover {
    scale: 1.05;
    box-shadow: 0 2px 5px 0 rgba(51, 62, 73, 0.1);
  }
`;

export const ItemTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const ErrorMsg = styled.div`
  color: red;
  text-align: center;
  padding-bottom: 10px;
`;
