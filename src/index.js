import React, { useContext, useReducer, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import TodosContext from "./context";
import todosReducer from "./reducer";

import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import axios from "axios";

// Custom hook
const useAPI = endpoint => {
  const [data, setData] = useState([]);

  // UseEffect because getting data from API
  useEffect(() => {
    getData();
  }, []);

  // Make api call an setData
  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  };

  return data;
};

// Main app starts in index.js instead of app.js
const App = () => {
  const initialState = useContext(TodosContext); // Get the intial data from context
  const [state, dispatch] = useReducer(todosReducer, initialState); // Add initialState context to state using the default action in the reducer
  const savedTodos = useAPI("https://hooks-api-ossp0z5r1.now.sh/todos");

  useEffect(() => {
    dispatch({ type: "GET_TODOS", payload: savedTodos });
  }, [savedTodos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {" "}
      {/*Pass the state and dispatch action into the context provider that the rest of the app can use*/}
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  );
};

ReactDOM.render(
  <App />,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
