import React, { Suspense } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { ConstantsPath } from "@/constants/ConstantsPath";
import { useCheckLogin } from "@/hooks/auth";
import Loader from "@/components/Loader/Loader";
import HeroPage from "@/pages/HeroPage/HeroPage";
import SignIn from "@/pages/Auth/SignIn/SignIn";
import SignUp from "@/pages/Auth/SignUp/SignUp";
import ForgotPassword from "@/pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword/ResetPassword";
import SuccessPage from "@/pages/Auth/SuccessPage/SuccessPage";
import VerifyEmail from "@/pages/Auth/VerifyEmail/VerifyEmail";
import Profile from "@/pages/Profile/Profile";
import MyPage from "@/pages/MyPage/MyPage";
import MyTask from "@/pages/MyTask/MyTask";
import TeamList from "@/pages/Team/TeamList/TeamList";
import TeamDetail from "@/pages/Team/TeamDetail/TeamDetail";
import NoteList from "@/pages/Team/TeamDetail/Note/NoteList";
import TeamUsers from "@/pages/Team/TeamDetail/TeamUser/TeamUsers";
import ProjectList from "@/pages/Project/ProjectList/ProjectList";
import ProjectDetail from "@/pages/Project/ProjectDetail/ProjectDetail";
import ProjectUsers from "@/pages/Project/ProjectDetail/ProjectUser/ProjectUsers";
import SprintList from "@/pages/Project/ProjectDetail/Sprint/SprintList";
import TaskList from "@/pages/Project/ProjectDetail/Task/TaskList";
import TaskDetail from "@/pages/Project/ProjectDetail/Task/TaskDetail";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";


const PrivateRoute = () => {
  const { isLogin, isChecking } = useCheckLogin();

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
        <Route path={ConstantsPath.HERO_PAGE} element={<HeroPage />} />
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
          <Route path={ConstantsPath.MY_PAGE} element={<MyPage />} index />
          <Route path={ConstantsPath.PROFILE} element={<Profile />} />
          <Route path={ConstantsPath.MY_TASK} element={<MyTask />} />
          <Route path={ConstantsPath.TEAM_LIST} element={<TeamList />} />
          <Route path={ConstantsPath.TEAM_DETAIL} element={<TeamDetail />} />
          <Route path={ConstantsPath.TEAM_NOTE_LIST} element={<NoteList />} />
          <Route path={ConstantsPath.TEAM_USER_LIST} element={<TeamUsers />} />
          <Route path={ConstantsPath.PROJECT_LIST} element={<ProjectList />} />
          <Route
            path={ConstantsPath.PROJECT_DETAIL}
            element={<ProjectDetail />}
          />
          <Route
            path={ConstantsPath.PROJECT_SPRINT_LIST}
            element={<SprintList />}
          />
          <Route
            path={ConstantsPath.PROJECT_TASK_LIST}
            element={<TaskList />}
          />
          <Route
            path={ConstantsPath.PROJECT_TASK_DETAIL}
            element={<TaskDetail />}
          />
          <Route
            path={ConstantsPath.PROJECT_USER_LIST}
            element={<ProjectUsers />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default MyRoutes;
