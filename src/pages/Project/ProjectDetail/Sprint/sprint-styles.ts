import styled from 'styled-components';

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SprintTitle = styled.div`
  font-size: 20px;
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

export const BoxTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #555;
`;

export const ButtonBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Content = styled.div`
  max-width: 900px;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #1677ff;
`;

export const SubContent = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ItemExtra = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
