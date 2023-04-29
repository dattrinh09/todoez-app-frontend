import React, { Suspense } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { ConstantsPath } from "../constants/ConstantsPath";
import HomePage from "../pages/HomePage/HomePage";
import SignIn from "../pages/Auth/SignIn/SignIn";
import SignUp from "../pages/Auth/SignUp/SignUp";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import SuccessPage from "../pages/Auth/SuccessPage/SuccessPage";
import VerifyEmail from "../pages/Auth/VerifyEmail/VerifyEmail";
import HeroPage from "../pages/HeroPage/HeroPage";
import useLogin from "../hooks/auth/useLogin";
import Profile from "../pages/Profile/Profile";
import ProjectList from "../pages/Project/ProjectList/ProjectList";
import Loader from "../components/Loader/Loader";
import TeamList from "../pages/Team/TeamList/TeamList";

const PrivateRoute = () => {
  const { isLogin, isChecking } = useLogin();
  return (
    <>
      {isChecking ? (
        <Loader />
      ) : (
        <>{isLogin ? <Outlet /> : <Navigate to={ConstantsPath.HERO_PAGE} />}</>
      )}
    </>
  );
};

const MyRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={ConstantsPath.HERO_PAGE} element={<HeroPage />} index />
        <Route path={ConstantsPath.HOME_PAGE} element={<HomePage />} />
        <Route path={ConstantsPath.SIGN_IN} element={<SignIn />} />
        <Route path={ConstantsPath.SIGN_UP} element={<SignUp />} />
        <Route path={ConstantsPath.SUCCESS} element={<SuccessPage />} />
        <Route path={ConstantsPath.VERIFY_EMAIL} element={<VerifyEmail />} />
        <Route
          path={ConstantsPath.FORGOT_PASSWORD}
          element={<ForgotPassword />}
        />
        <Route
          path={ConstantsPath.RESET_PASSWORD}
          element={<ResetPassword />}
        />
        <Route element={<PrivateRoute />}>
          <Route path={ConstantsPath.PROFILE} element={<Profile />} />
          <Route path={ConstantsPath.PROJECT_LIST} element={<ProjectList />} />
          <Route path={ConstantsPath.TEAM_LIST} element={<TeamList />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default MyRoutes;
