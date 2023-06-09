import styled from 'styled-components';

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SprintTitle = styled.div`
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

export const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BoxTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #555;
`;

export const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #aaa;
`;

export const Item = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: #e6f4ff;
  &:hover{
    background-color: #bae0ff;
  }
  &:last-child{
    border: none;
  }
`;

export const ItemSec = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Content = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #1677ff;
`;

export const SubContent = styled.div`
  margin-left: 20px;
`;

export const ItemExtra = styled.div`
  display: flex;
  gap: 5px;
`;

export const ErrorMsg = styled.div`
  color: red;
  text-align: center;
  padding-bottom: 10px;
`;
