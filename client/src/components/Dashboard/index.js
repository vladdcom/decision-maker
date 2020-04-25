import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserState } from "../../store/user/selectors";
import { signOut } from "../../store/user/actions";

const Dashboard = () => {
  const userData = useSelector(selectUserState);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Привет, {userData.login}</h1>
      <button type="button" onClick={() => dispatch(signOut())}>
        Выйти
      </button>
    </>
  );
};

export default Dashboard;
