import { useState } from "react";
import { useTodo } from "./context/TodoContext";
import "./styles.css";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
export default function App() {
  const { input, setInput, state, dispatch } = useTodo();
  const [editingId, setEditingId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  // const [isStar, setIsStar] = useState(false);
  const handleInput = (e) => {
    const task = e.target.value;
    setInput(task);
  };
  const handleAdd = () => {
    if (input && input.trim() !== "") {
      // Check if we're in editing mode
      if (editingId) {
        dispatch({
          type: "EDIT_TASK",
          payload: { ID: editingId, content: input.trim() }
        });
        setInput("");
        setEditingId(null); // Reset editing mode
        setIsEdit(false);
      } else {
        dispatch({ type: "ADD_TASK", payload: input.trim() });
        setInput("");
        setIsEdit(false);
      }
    } else {
      alert("Enter Task First...");
    }
  };

  const handleEdit = (ID, CONTENT) => {
    // Set the app to editing mode for this task
    setInput(CONTENT.trim());
    setEditingId(ID);
    setIsEdit(true);
  };

  const handleDelete = (ID) => {
    console.log("DELETE CLICKED", ID);
    dispatch({ type: "DELETE_TASK", payload: ID });
  };

  const toggleStar = (ID) => {
    dispatch({ type: "TOGGLE_STAR", payload: ID });
  };

  return (
    <div className="App">
      <h1>
        <span>T</span>
        <span>O</span>
        <span>D</span>
        <span>O</span> <span>T</span>
        <span>O</span>
        <span>D</span>
        <span>O</span> <span>T</span>
        <span>O</span>
        <span>D</span>
        <span>O</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </h1>
      <div className="tasks">
        <input
          type="text"
          placeholder="Enter Tasks..."
          onChange={handleInput}
          value={input}
        />
        {isEdit ? (
          <button onClick={handleAdd}>Edit</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>
      <div className="result">
        <ul>
          {state?.task?.map((task) => (
            <li key={task.id}>
              <p>{task.content}</p>
              <div className="buttons">
                <button onClick={() => handleEdit(task.id, task.content)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
                <button onClick={() => toggleStar(task.id)}>
                  {task.star ? <AiFillStar /> : <AiOutlineStar />}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
