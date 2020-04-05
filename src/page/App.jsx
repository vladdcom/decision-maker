import React from "react";
import styles from "./App.css";
import useStateForm from "../components/useStateForm";

export default () => {
  const { state, handleChange, handleSubmit } = useStateForm({
    changeHandler: e => ({ name: e.target.name, value: e.target.value }),
    validateFns: {
      required: {
        fn: input => input.length !== 0,
        error: "Обязательное поле"
      },
      includeNumbers: {
        fn: input => input.includes(1),
        error: "Имя должно содержать цифру 1"
      }
    },
    inputs: {
      userName: {
        validators: ["required", "includeNumbers"],
        initialValue: "Eva"
      },
      email: {
        validators: ["required"]
      }
    }
  });

  const onSubmit = data => {
    // send data
  };

  return (
    <>
      <h1 className={styles.main_title}>Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name={state.userName.name}
          onChange={handleChange}
          value={state.userName.value}
        />
        <p>{state.userName.error}</p>
        <br />
        <input
          name={state.email.name}
          onChange={handleChange}
          value={state.email.value}
        />
        <p>{state.email.error}</p>
        <br />
        <button type="submit">Отправить</button>
      </form>
    </>
  );
};
