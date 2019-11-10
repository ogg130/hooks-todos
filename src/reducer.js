// Reducer (actions) seperated into its own file

export default function reducer(state, action) {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload
      };

    case "ADD_TODO":
      //   // If we have no text in payload return state as is
      //   if (!action.payload) {
      //     return state;
      //   }
      //   // If todo text that is sent over with the payload is the same as in todo list
      //   if (state.todos.findIndex(t => t.text === action.payload) > -1) {
      //     return state;
      //   }

      const addedTodos = [...state.todos, action.payload];
      return {
        ...state,
        todos: addedTodos
      };

    case "SET_CURRENT_TODO":
      return {
        ...state,
        currentTodo: action.payload
      };

    case "TOGGLE_TODO":
      const toggledTodos = state.todos.map(
        t =>
          t.id === action.payload.id // if id of current todo that we are iterating over with map = id of dispatched todo payload in the action
            ? action.payload
            : t // if not the id we wish modify, just return what we already have, the todo.
      );
      return {
        ...state, // Spread in state
        todos: toggledTodos // todos array is updated with toggeled todos
      };

    case "UPDATE_TODO":
      /*       // If we have no text in payload return state as is
      if (!action.payload) {
        return state;
      }
      // If todo text that is sent over with the payload is the same as in todo list
      if (state.todos.findIndex(t => t.text === action.payload) > -1) {
        return state;
      } */
      const updatedTodo = { ...action.payload };

      // Get todo index to be able to find it later
      const updatedTodoIndex = state.todos.findIndex(
        t => t.id === state.currentTodo.id
      );

      // Array
      const updatedTodos = [
        ...state.todos.slice(0, updatedTodoIndex), // spread up to the index
        updatedTodo, // put the updated todo in array where index is
        ...state.todos.slice(updatedTodoIndex + 1) // spread in the rest of the array
      ];

      // return spread state, clear currentTodo, return updated todos array which was created
      return {
        ...state,
        currentTodo: {},
        todos: updatedTodos
      };

    case "REMOVE_TODO":
      const filteredTodos = state.todos.filter(t => t.id !== action.payload.id); // Remove the todo that is coming in payload from array of todos
      const isRemovedTodo =
        state.currentTodo.id === action.payload.id ? {} : state.currentTodo; // if the current todo in states id is equal to id of todo in playload then clear todo otherwise return state
      return {
        ...state,
        currentTodo: isRemovedTodo,
        todos: filteredTodos
      };

    default:
      return state;
  }
}
