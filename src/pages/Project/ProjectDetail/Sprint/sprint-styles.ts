import styled from 'styled-components';

export const Container = styled.div`
    width: 1200px;
    margin: 0 auto;
`

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

export const Sub = styled.div`
  margin-top: 5px;
  font-weight: 600;
  display: flex;
  gap: 5px;
  margin-bottom: 30px;
`;

export const SubIcon = styled.div`
  color: #1677ff;
`;

export const SubText = styled.span`
  font-size: 18px;
  color: #888;
`;

export const Items = styled.ul`
  list-style: none;
`;

export const Item = styled.li`
  width: 200px;
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

export const ItemSub = styled.span`
  font-weight: 500;
  color: #888;
`;

export const ErrorMsg = styled.div`
  color: red;
  text-align: center;
  padding-bottom: 10px;
`;
