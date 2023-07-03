import styled from "styled-components";

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NoteTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #555;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 50px;
  margin-bottom: 10px;
`

export const ContentTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

export const ContentSection = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
`;
