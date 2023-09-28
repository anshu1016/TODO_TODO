export const initialState = {
  task: []
};

export const TodoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_TASK":
      const taskExists = state.task.some((task) => task.content === payload);
      if (taskExists) {
        return state;
      } else {
        return {
          ...state,
          task: [
            ...state.task,
            {
              content: payload.trim(),
              id: Math.floor(Math.random() * 100),
              star: false
            }
          ]
        };
      }
    case "EDIT_TASK":
      return {
        ...state,
        task: state.task.map((task) =>
          task.id === payload.ID
            ? { ...task, content: payload.content.trim() }
            : task
        )
      };
    case "DELETE_TASK":
      return {
        ...state,
        task: state.task.filter((task) => task.id !== payload)
      };
    case "TOGGLE_STAR":
      return {
        ...state,
        task: state.task.map((task) =>
          task.id === payload ? { ...task, star: !task.star } : task
        )
      };

    default:
      return state;
  }
};
