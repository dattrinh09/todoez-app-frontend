import styled from "styled-components";

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #555;
`;

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

export const Info = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.div`
  width: 100px;
  font-size: 16px;
  color: #1677ff;
`;

export const Content = styled.div`
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FullContent = styled(Title)`
  max-width: 1000px;
  word-wrap: break-word;
`;

export const SectionDescription = styled.div`
  margin-top: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  max-width: 1200px;
  padding: 10px 20px;
  white-space: pre-wrap;
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 20px;
`;
