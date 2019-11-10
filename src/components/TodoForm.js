import React, { useState, useEffect, useContext } from "react";
import TodosContext from "../context";
import axios from "axios";
import uuidv4 from "uuid/v4";

export default function TodoForm() {
  const [todo, setTodo] = useState("");
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo("");
    }
  }, [currentTodo.id]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (currentTodo.text) {
      // TODO: VALIDATION LOGIC GOES HERE - is the reuqest empty, is the request duplicate etc - see commented out logic in reducer.js

      const response = axios.patch(
        `https://hooks-api-ossp0z5r1.now.sh/todos/${currentTodo.id}`,
        {
          text: todo
        }
      );
      dispatch({ type: "UPDATE_TODO", payload: response.data });
    } else {
      // TODO: VALIDATION LOGIC GOES HERE - is the reuqest empty, is the request duplicate etc - see commented out logic in reducer.js

      const response = await axios.post(
        "https://hooks-api-ossp0z5r1.now.sh/todos",
        { id: uuidv4(), text: todo, complete: false }
      );
      dispatch({ type: "ADD_TODO", payload: response.data });
    }
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        className="border-black border-solid border-2"
        onChange={event => setTodo(event.target.value)}
        value={todo}
      />
    </form>
  );
}
