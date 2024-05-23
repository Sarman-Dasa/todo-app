import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../css/todo.css";
import { deleteTodo } from "../app/todo/todosSlice";
export default function TodoList() {
  const todoList = useSelector((state) => state.todos.todos);

  const dispatch = useDispatch();

  const deleteitem = (id) => {
    dispatch(deleteTodo(id));
  };

  if (!todoList) {
    return;
  }
  return (
    <div className="todo-list">
      <p className="heanding">Todo List</p>
      <ul>
        {todoList.map((item, index) => {
          return (
            <li key={index} className={`todo-item`}>
              <span className="title">{item.title}</span>
              <span className="due-date">{item.dueDate}</span>
              <span className="decription">{item.description}</span>
              <span className="action">
                <button
                  className="deleteBtn"
                  onClick={() => deleteitem(item.id)}
                >
                  Delete
                </button>
                <button className="editBtn">Edit</button>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
