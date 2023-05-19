import styled from "styled-components";

export const MyPageLayout = styled.div``;

export const Container = styled.div`
  width: 1200px;
  height: calc(100vh - 54px);
  display: flex;
  margin: 0 auto;
  justify-content: space-evenly;
  align-items: center;
`;

export const MyCard = styled.div`
  width: 200px;
  background-color: #e6f7ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    scale: 1.05;
    box-shadow: 0 2px 5px 0 rgba(51, 62, 73, 0.1);
  }
`;

export const CardPhoto = styled.div`
  height: 150px;
  width: 150px;
`;

export const CardTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
`;
