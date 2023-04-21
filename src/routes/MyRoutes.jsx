import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ConstantsPath } from '../constants/ConstantsPath'
import HomePage from '../pages/HomePage/HomePage'
import SignIn from '../pages/Auth/SignIn/SignIn'
import SignUp from '../pages/Auth/SignUp/SignUp'
import ForgotPassword from '../pages/Auth/ForgotPassword/ForgotPassword'
import ResetPassword from '../pages/Auth/ResetPassword/ResetPassword'
import SuccessPage from '../pages/Auth/SuccessPage/SuccessPage'
import VerifyEmail from '../pages/Auth/VerifyEmail/VerifyEmail'

const MyRoutes = () => {
  return (
    <Routes>
        <Route path={ConstantsPath.HOME_PAGE} element={<HomePage />} index />
        <Route path={ConstantsPath.SIGN_IN} element={<SignIn />} />
        <Route path={ConstantsPath.SIGN_UP} element={<SignUp />} />
        <Route path={ConstantsPath.SUCCESS} element={<SuccessPage />} />
        <Route path={ConstantsPath.VERIFY_EMAIL} element={<VerifyEmail />} />
        <Route path={ConstantsPath.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ConstantsPath.RESET_PASSWORD} element={<ResetPassword />} />
    </Routes>
  )
}

export default MyRoutes