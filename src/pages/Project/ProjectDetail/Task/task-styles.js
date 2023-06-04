import styled from "styled-components";

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BarTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TitleText = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #555;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.div`
  width: 100px;
  font-size: 16px;
  color: #1677ff;
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 20px;
`;

export const Icon = styled.div`
  height: 15px;
  width: 15px;
`;

export const ErrorMsg = styled.div`
  color: red;
  text-align: center;
  padding-bottom: 10px;
`;
