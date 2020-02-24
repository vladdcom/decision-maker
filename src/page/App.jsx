import React, { useState, useEffect } from "react";
import styles from "./App.css";

export default () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(curr => curr + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <h1 className={styles.main_title}>{count} before start</h1>;
};
