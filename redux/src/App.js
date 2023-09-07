import "./App.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  completeTodo,
  deleteTodo,
  updateTodo,
} from "./actions/todoaction";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [task, settask] = useState("");
  const [editTask, seteditTask] = useState("");
  const [filter, setfilter] = useState("all");
  const todos = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <input 
        type="text"
        placeholder="add task..."
        onChange={(e) => settask(e.target.value)}
      />
      <Button  variant="success"  onClick={() => dispatch(addTodo(task))  }>add task</Button>{' '}
      <Button  variant="info" onClick={() => setfilter("all")}>all</Button>
      <Button  onClick={() => setfilter("done")}>done</Button>
      <Button variant="dark" onClick={() => setfilter("undone")}>undone</Button>

      {filter === "all"
        ? todos.map((el) => (
            <div>
              <h2>{el.title} </h2>
              <button onClick={() => dispatch(deleteTodo(el.id))}>
                delete
              </button>
              <button onClick={() => dispatch(completeTodo(el.id))}>
                {el.complete ? "done" : "undone"}
              </button>
            </div>
          ))
        : filter === "done"
        ? todos
            .filter((el) => el.complete === true)
            .map((el) => (
              <div >
                <h2>{el.title} </h2>
                <Button variant="primary" onClick={handleShow} update />

                <Modal show={show} onHide={handleClose}>
                  <Modal.Body>
                    <input
                      type="text"
                      placeholder="edit task..."
                      value={editTask}
                      onChange={(e) => seteditTask(e.target.value)}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="Secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        dispatch(updateTodo(editTask, el.id));
                        handleClose();
                      }}
                    >
                      Save Changes
                    </Button  >
                  </Modal.Footer>
                </Modal>
                <button  onClick={() => dispatch(deleteTodo(el.id))}>
                  delete
                </button>
                <button onClick={() => dispatch(completeTodo(el.id))}>
                  {el.complete ? "done" : "undone"}
                </button>
              </div>
            ))
        : todos
            .filter((el) => el.complete === false)
            .map((el) => (
              <div>
                <h2>{el.title} </h2>
                <button onClick={() => dispatch(deleteTodo(el.id))}>
                  delete
                </button>
                <button onClick={() => dispatch(completeTodo(el.id))}>
                  {el.complete ? "done" : "undone"}
                </button>
              </div>
            ))}
    </div>
  );
}

export default App;
