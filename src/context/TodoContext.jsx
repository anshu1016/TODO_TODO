import { createContext, useContext, useReducer, useState } from "react";
import { TodoReducer, initialState } from "../reducer/TodoReducer";

const TodoContext = createContext();
export const TodoContextProvider = ({ children }) => {
  const [input, setInput] = useState();
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  return (
    <TodoContext.Provider value={{ input, setInput, state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
