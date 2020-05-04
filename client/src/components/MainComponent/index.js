import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "../Dashboard";
import { selectAuthState } from "../../store/user/selectors";

const MainComponent = () => {
  const isUserAuthenticated = useSelector(selectAuthState);

  return (
    <>{isUserAuthenticated ? <Dashboard /> : <a href="api/auth">Войти</a>}</>
  );
};

export default MainComponent;
