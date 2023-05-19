import { Button } from "antd"
import styled from "styled-components"

export const FormLayout = styled.div`
    background-color: #bae7ff;
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FormContainer = styled.div`
    width: 500px;
    min-height: 100px;
    padding: 10px 20px;
    text-align: center;
    background: #fff;
    border-radius: 5px;
    align-self: center;
    box-shadow: 0 2px 5px 0 rgba(51, 62, 73, 0.1);
`
export const FormHeading = styled.div`
    font-size: 20px;
    font-weight: 600;
`

export const ErrorMessage = styled.div`
    padding-bottom: 20px;
`

export const SubmitBtn = styled(Button)`
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1px;
    padding: 0 20px 32px 20px;
`
export const ForgotPassLink = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const LinkContainer = styled.div`
    font-size: 16px;
    padding-bottom: 20px;
`

export const GoogleContainer = styled.div`
    border-top: 1px solid #aaa;
    padding: 20px;
    display: flex;
    justify-content: center;
`