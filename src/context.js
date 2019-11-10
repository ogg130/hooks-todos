// context (data) seperated into its own file

import React from "react";

const TodosContext = React.createContext({
  todos: [],
  currentTodo: {}
});

export default TodosContext;
