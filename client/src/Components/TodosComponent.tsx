import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  InputGroup,
  Form,
  Badge,
  Modal,
  ButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
export default function TodosComponent() {
  const [activeUser, setActiveUser] = useState<any>([]);
  const [todoList, setTodoList] = useState<any>([]);
  const [todoDefList, setTodoDefList] = useState<any>([]);
  const [todoItem, setTodoItem] = useState<any>("");
  const [todoDescription, setTodoDescription] = useState<any>("");
  const [search, setSearch] = React.useState<any>("");
  const [todoError, setTodoError] = useState<any>(false);
  const [editTodos, setEditTodos] = useState<any>([]);
  const [editModal, setEditModal] = useState<any>(false);

  const handleNewTodo = (e: any, type: any) => {
    if (type === "todo") {
      setTodoItem(e.target.value);
    } else if (type === "description") {
      setTodoDescription(e.target.value);
    }
    setTodoError(false);
  };

  useEffect(() => {
    const loadActiveUser = () => {
      let isActiveUser = localStorage.getItem("user");
      let request: any = { email: isActiveUser ?? "" };
      axios
        .post("http://localhost:3200/api/checkuser", request)
        .then((response) => {
          let result = response?.data;
          if (result.length > 0) {
            setActiveUser(result);
            setTimeout(() => {
              getTodos(result);
            }, 10);
          } else {
            setTodoList(result);
            setTodoDefList(result);
          }
        })
        .catch((err) => console.log(err.message));
    };
    loadActiveUser();
  }, []);

  const getTodos = async (result: any) => {
    let request: any = { username: result[0]?.username };
    axios
      .post("http://localhost:3200/api/todos", request)
      .then((response) => {
        let result = response.data;
        if (result.length > 0) {
          result.map(
            (o: any) =>
              (o["iscomplete"] = o.complete === 1 ? "complete" : "incomplete")
          );
          setTodoList(result);
          setTodoDefList(result);
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleSearch = (e: any) => {
    let result = e.target.value;
    setSearch(result);
    let filterList: any = [];
    filterList = todoDefList.filter(
      (o: any) =>
        o.todo.toLowerCase().indexOf(result.toLowerCase().trim()) > -1 ||
        o.iscomplete.toLowerCase().indexOf(result.toLowerCase().trim()) > -1 ||
        o.description.toLowerCase().indexOf(result.toLowerCase().trim()) > -1 ||
        o.time.toLowerCase().indexOf(result.toLowerCase().trim()) > -1
    );
    setTodoList([...filterList]);
  };

  const todosAdd = () => {
    if (todoItem !== "") {
      let request: any = {};
      request.todo = todoItem;
      request.complete = 0;
      request.time = new Date().toISOString();
      request.username = activeUser[0].username;
      request.description = todoDescription;
      axios
        .post("http://localhost:3200/api/addtodos", request)
        .then((response) => {
          getTodos(activeUser);
        })
        .catch((err) => console.log(err.message));
      setTodoItem("");
      setTodoDescription("");
      setTodoError(false);
    } else {
      setTodoError(true);
    }
  };

  const todoEdit = async (id: any) => {
    axios
      .get(`http://localhost:3200/api/todos/${id}`)
      .then((response) => {
        setEditTodos(response.data);
        setEditModal(true);
      })
      .catch((err) => console.log(err.message));
  };

  const handleClose = () => {
    setEditModal(false);
  };

  const handleEditChage = (event: any, type: any) => {
    if (type === "title") {
      editTodos[0].todo = event.target.value;
    } else if (type === "description") {
      editTodos[0].description = event.target.value;
    } else if (type === "complete") {
      editTodos[0].complete = event.target.checked ? 1 : 0;
    }
    setEditTodos([...editTodos]);
  };

  const saveEditedTodos = () => {
    debugger;
    let request: any = {};
    request.todo = editTodos[0].todo;
    request.complete = editTodos[0].complete;
    request.time = editTodos[0].time;
    request.username = activeUser[0].username;
    request.description = editTodos[0].description;
    axios
      .post(`http://localhost:3200/items/update/${editTodos[0]?.id}`, request)
      .then((response) => {
        getTodos(activeUser);
      })
      .catch((err) => console.log(err.message));
    setTodoItem("");
    setEditModal(false);
  };

  const todoDelete = (id: any) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`http://localhost:3200/api/items/${id}`)
        .then((response) => {
          getTodos(activeUser);
          alert(response.data);
        })
        .catch((err) => console.log(err.message));
    }
  };

  let currentTodo = todoList.filter((o: any) => o.id === editTodos[0]?.id);
  let isDataChanged = JSON.stringify(currentTodo) === JSON.stringify(editTodos);

  return (
    <Container>
      <h1 className="page-header">Todos</h1>
      {activeUser.length > 0 ? (
        <InputGroup className="mb-3">
          <Form.Control
            className={`rounded-0 ${
              todoError ? "alert-danger" : ""
            } RobotoCondensed300 w-250 shaddow-down`}
            maxLength={50}
            onChange={(e: any) => handleNewTodo(e, "todo")}
            value={todoItem}
            placeholder="Todo"
            aria-label="Add todo"
            aria-describedby="input-addon"
          />
          <Form.Control
            className="rounded-0 RobotoCondensed300 shaddow-down"
            maxLength={200}
            onChange={(e: any) => handleNewTodo(e, "description")}
            value={todoDescription}
            rows={1}
            as="textarea"
            placeholder="Description"
            aria-label="Add todo"
            aria-describedby="input-addon"
          />
          <Button
            onClick={todosAdd}
            className="rounded-0"
            title="Add Todo"
            variant="success"
            id="button-addon2"
          >
            ADD{" "}
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              style={{ marginTop: "-3px" }}
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M14 10H3v2h11v-2zm0-4H3v2h11V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM3 16h7v-2H3v2z"></path>
            </svg>
          </Button>
        </InputGroup>
      ) : (
        <div className="mb-3">
          <Link to="/login" className="btn btn-outline-secondary rounded-0">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="25"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m10.998 16 5-4-5-4v3h-9v2h9z"></path>
              <path d="M12.999 2.999a8.938 8.938 0 0 0-6.364 2.637L8.049 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051S20 10.13 20 12s-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637C21.063 16.665 22 14.405 22 12s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"></path>
            </svg>
            Login to add todo
          </Link>
        </div>
      )}
      {activeUser.length > 0 && (
        <>
          <div className="mb-3 w-250">
            <Form.Control
              className="RobotoCondensed300 rounded-0 shaddow-down"
              type="text"
              value={search}
              placeholder="Search..."
              onChange={(e: any) => handleSearch(e)}
            ></Form.Control>
          </div>
          <div className="tableResponsive">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              {todoList.length > 0 ? (
                <tbody>
                  {todoList.map((item: any) => (
                    <tr key={item.id}>
                      <td>
                        <div className="mb-1">
                          {item.description === "" ? (
                            <>{item.todo}</>
                          ) : (
                            <strong>{item.todo}</strong>
                          )}
                        </div>
                        <span className="small">{item.description}</span>
                      </td>
                      <td>
                        <span className="small">
                          {new Date(item.time).toLocaleDateString()} -{" "}
                          {new Date(
                            new Date(item.time).toISOString()
                          ).toLocaleTimeString()}
                        </span>
                      </td>
                      <td>
                        <Badge
                          className="statusBadge"
                          bg={item.complete === 0 ? "secondary" : "success"}
                        >
                          {`${item.complete === 0 ? "Inc" : "C"}omplete`}
                        </Badge>
                      </td>
                      <td>
                        <ButtonGroup aria-label="Basic example">
                          <Button
                            title="Edit"
                            onClick={() => todoEdit(item.id)}
                            className="rounded-0 p-2"
                            variant="outline-secondary"
                            id="button-addon2"
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 24 24"
                              height="20"
                              width="20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="Edit">
                                <g>
                                  <path d="M3.548,20.938h16.9a.5.5,0,0,0,0-1H3.548a.5.5,0,0,0,0,1Z"></path>
                                  <path d="M9.71,17.18a2.587,2.587,0,0,0,1.12-.65l9.54-9.54a1.75,1.75,0,0,0,0-2.47l-.94-.93a1.788,1.788,0,0,0-2.47,0L7.42,13.12a2.473,2.473,0,0,0-.64,1.12L6.04,17a.737.737,0,0,0,.19.72.767.767,0,0,0,.53.22Zm.41-1.36a1.468,1.468,0,0,1-.67.39l-.97.26-1-1,.26-.97a1.521,1.521,0,0,1,.39-.67l.38-.37,1.99,1.99Zm1.09-1.08L9.22,12.75l6.73-6.73,1.99,1.99Zm8.45-8.45L18.65,7.3,16.66,5.31l1.01-1.02a.748.748,0,0,1,1.06,0l.93.94A.754.754,0,0,1,19.66,6.29Z"></path>
                                </g>
                              </g>
                            </svg>
                          </Button>
                          <Button
                            title="Delete"
                            onClick={() => todoDelete(item.id)}
                            className="rounded-0 p-2"
                            variant="outline-secondary"
                            id="button-addon2"
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 24 24"
                              height="20"
                              width="20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path fill="none" d="M0 0h24v24H0V0z"></path>
                              <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"></path>
                            </svg>
                          </Button>
                        </ButtonGroup>
                        <div className="d-flex justify-content-end"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={4} className="text-center">
                      No data found.
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </>
      )}
      <Modal
        show={editModal}
        onHide={handleClose}
        className="cusNoBorderModal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form.Group className="mb-2" controlId="editTodoTite">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={(e: any) => handleEditChage(e, "title")}
                maxLength={50}
                value={editTodos[0]?.todo}
                type="text"
                placeholder="Title"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="editTodoDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={(e: any) => handleEditChage(e, "description")}
                value={editTodos[0]?.description}
                maxLength={200}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="editTodoComplete">
              <Form.Check
                type="checkbox"
                id="_checkid"
                onChange={(e: any) => handleEditChage(e, "complete")}
                checked={editTodos[0]?.complete === 1}
                label={"Complete"}
              />
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            disabled={isDataChanged}
            onClick={saveEditedTodos}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
