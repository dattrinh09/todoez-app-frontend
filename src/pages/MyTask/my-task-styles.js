import styled from "styled-components";

export const Container = styled.div`
  width: 1200px;
  padding-top: 30px;
  padding-bottom: 100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Heading = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1677ff;
`;

export const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Content = styled.div`
  max-width: 900px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  color: #1677ff;
`;

export const SubContent = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
