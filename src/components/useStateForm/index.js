import { useReducer } from "react";

const formReducer = ({ validateFns, inputsValidateMap }) => (state, action) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return {
        ...state,
        [action.inputName]: {
          ...state[action.inputName],
          value: action.value,
          error: ""
        }
      };
    case "VALIDATE": {
      return Object.keys(state).reduce((acc, input) => {
        return {
          ...acc,
          [input]: {
            ...acc[input],
            error: inputsValidateMap[input].reduce(
              (errorMessage, validateFnName) => {
                if (errorMessage.length !== 0) {
                  return errorMessage;
                }

                const { fn, error } = validateFns[validateFnName];
                if (fn(acc[input].value)) {
                  return "";
                }
                return error;
              },
              ""
            )
          }
        };
      }, state);
    }
    default:
      return state;
  }
};

const useStateForm = params => {
  const { changeHandler, validateFns, inputs } = params;
  const inputsValidateMap = Object.keys(inputs).reduce((acc, input) => {
    return { ...acc, [input]: inputs[input].validators || [] };
  }, {});

  const [state, updateState] = useReducer(
    formReducer({ validateFns, inputsValidateMap }),
    Object.keys(inputs).reduce((acc, input) => {
      return {
        ...acc,
        [input]: {
          value: inputs[input].initialValue || "",
          name: input,
          error: ""
        }
      };
    }, {})
  );

  const checkIsFormValid = () => {
    return Object.values(state).reduce((isFormValid, { error }) => {
      return isFormValid ? !error : isFormValid;
    }, true);
  };

  const handleChange = data => {
    const { name, value } = changeHandler(data);

    updateState({
      type: "UPDATE_INPUT",
      inputName: name,
      value
    });
  };

  const handleSubmit = callback => e => {
    e.preventDefault();

    updateState({
      type: "VALIDATE"
    });

    if (checkIsFormValid()) {
      callback(state);
    }
  };

  return { state, handleChange, handleSubmit };
};

export default useStateForm;
