import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../css/todo.css";
import { deleteTodo, sortOrder } from "../app/todo/todosSlice";
import UpdatedTodo from "./UpdateTodo";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
const MySwal = withReactContent(Swal);

export default function TodoList() {
  const todoList = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState();
  const [filterValue, setFilterValue] = useState(null);

  //
  const todoItemList = useMemo(() => {
    let newFilterList = filterValue
      ? todoList.filter((item) => item.priority === filterValue.value)
      : todoList;
    return newFilterList;
  }, [filterValue, todoList]);

  // Priority option array
  const options = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  // sort Filed option Array
  const sortOption = [
    { value: "title", label: "Title" },
    { value: "dueDate", label: "Due Date" },
    { value: "priority", label: "Priority" },
  ];

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

  // Sort Todo List
  const handlerSorBy = (e) => {
    let sortField = e ? e.value : "description";
    dispatch(sortOrder(sortField));
  };

  // Filter Todo List
  const handlerFilter = (e) => {
    setFilterValue(e);
  };
  if (!todoList) {
    return;
  }
  return (
    <>
      <div className="todo-list">
        <div className="filter">
          <p className="heanding">Todo List</p>
          <div className="d-flex justify-content-between">
            <label>Sort By</label>
            <Select
              options={sortOption}
              isClearable
              className="sort-by"
              onChange={handlerSorBy}
            />
            <label>Filter</label>
            <Select
              options={options}
              value={filterValue}
              className="sort-by"
              isClearable
              onChange={handlerFilter}
            />
          </div>
        </div>
        <ul>
          {todoItemList.map((item, index) => {
            return (
              <li key={index} className={`todo-item ${item.priority}`}>
                <span className="title">{item.title}</span>
                <span className="due-date">{item.dueDate}</span>
                <span className="decription">{item.description}</span>
                <span className={`priority`}>{item.priority}</span>
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
