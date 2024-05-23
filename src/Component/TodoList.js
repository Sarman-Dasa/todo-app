import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../css/todo.css";
import { deleteTodo } from "../app/todo/todosSlice";
import UpdatedTodo from "./UpdateTodo";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function TodoList() {
  const todoList = useSelector((state) => state.todos.todos);

  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState();

  const deleteItem = (id) => {
    dispatch(deleteTodo(id));
    MySwal.fire("Deleted!", "", "success");
  };

  // Open modal for todo data edit
  const openEditModal = (item) => {
    setEditItem(item);
    setIsEdit(true);
  };

  // Show Confirmation message for todo item delete
  const deleteConfirmation = (id) => {
    MySwal.fire({
      title: "Do you want to delete this item?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonClass: "",
      customClass: {
        confirmButton: "btn text-bg-danger",
        cancelButton: "btn btn-danger",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(id); // Yes to call deleteItem function
      }
    });
  };

  if (!todoList) {
    return;
  }
  return (
    <>
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
                    onClick={() => deleteConfirmation(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="editBtn"
                    onClick={() => openEditModal(item)}
                  >
                    Edit
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      {isEdit && (
        <UpdatedTodo
          isShow={isEdit}
          item={editItem}
          onclose={() => setIsEdit(false)}
        />
      )}
    </>
  );
}
