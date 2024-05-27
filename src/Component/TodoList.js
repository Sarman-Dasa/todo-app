import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../css/todo.css";
import { deleteTodo, sortOrder } from "../app/todo/todosSlice";
import UpdatedTodo from "./UpdateTodo";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import Pagination from "./MyPagination";
import { Form } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

export default function TodoList() {
  const todoList = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState();
  const [filterValue, setFilterValue] = useState();
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(todoList.length);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  let priority = searchParams.get("priority");
  const [isBackBtnShow, setIsBackBtnShow] = useState(false);
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

  const perPageOption = [5, 10, 15, 20];
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

  // Set Current page value
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter todolist priority wise
  const todoItemList = useMemo(() => {
    let newFilterList = filterValue
      ? todoList.filter((item) => item.priority === filterValue.value)
      : todoList;
    setTotalCount(newFilterList.length);
    return newFilterList;
  }, [filterValue, todoList]);

  // Sort Todo List
  const handlerSorBy = (e) => {
    let sortField = e ? e.value : "description";
    dispatch(sortOrder(sortField));
  };

  // Filter Todo List
  const handlerFilter = (e) => {
    setFilterValue(e);
    setCurrentPage(1);
  };

  useEffect(() => {
    setIsBackBtnShow(priority ? true : false);
    let priorityValue = options.find((option) => option.value === priority);
    setFilterValue(priorityValue);
    return () => {
      console.log("call de");
      setIsBackBtnShow(false);
    };
  }, [priority]);

  if (!todoItemList) {
    return;
  }
  return (
    <>
      <div className="todo-list">
        <div className="filter">
          <div className="left-flot">
            {isBackBtnShow && (
              <button className="backBtn" onClick={() => navigate(-1)}>
                back
              </button>
            )}
            <p className="heanding">Todo List</p>
          </div>
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
            {/* <Form.Select size="sm" onChange={(e)=>setPerPage(e.target.value)}>
              <option value={5} selected>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </Form.Select> */}

            <Form.Select
              size="sm"
              onChange={(e) => setPerPage(e.target.value)}
              defaultValue={perPageOption[0]}
            >
              {perPageOption.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
        <ul>
          {todoItemList
            .slice((currentPage - 1) * perPage, currentPage * perPage)
            .map((item, index) => {
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
        <Pagination
          totalCount={totalCount}
          perPage={perPage}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
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
