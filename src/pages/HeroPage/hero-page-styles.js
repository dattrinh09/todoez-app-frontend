import styled from "styled-components";

export const HeroLayout = styled.div`
    padding-top: 100px;
    height: calc(100vh - 154px - 44px);
`

export const Container = styled.div`
    width: 1200px;
    display: flex;
    margin: 0 auto;
`

export const Section = styled.div`
    flex: 1;
` 

export const Title = styled.div`
    font-size: 40px;
    font-weight: 700;
    color: #333;
    word-spacing: 5px;
`

export const SubTitle = styled.div`
    margin-top: 30px;
    font-size: 20px;
    font-weight: 500;
    color: #555;
`

export const Menu = styled.ul`
    margin-top: 20px;
    list-style: none;
    font-size: 18px;
    font-weight: 600;
`

export const Icon = styled.div`
    color: #1677ff;
`
 
export const Item = styled.li`
    display: flex;
    gap: 10px;
`

export const HeroButton = styled.div`
    width: 180px;
    background-color: #1677ff;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    padding: 5px 0;
    margin: 50px auto;
    border-radius: 10px;
    cursor: pointer;
`

export const HeroPhoto = styled.div`
    flex: 1;
`

export const Photo = styled.div`
    width: 500px;
    height: 400px;
    margin: 0 auto;
`