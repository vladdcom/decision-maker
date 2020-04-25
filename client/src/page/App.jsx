import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { tryAuthenticate } from "../store/user/actions";
import MainComponent from "../components/MainComponent";

export default () => {
  const [isLoading, updateLoadingState] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tryAuthenticate()).then(() => updateLoadingState(false));
  }, []);

  return <>{isLoading ? "Loading..." : <MainComponent />}</>;
};
