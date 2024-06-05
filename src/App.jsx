import "./App.css";
import { useState, useEffect } from "react";
import List from "./components/List";
import Alert from "./components/Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "minus", "Please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "plus", "Item changed");
    } else {
      showAlert(true, "plus", "Item added to do list");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "minus", "List empty");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "minus", "Item removed from the list");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specItem = list.find((item) => item.id === id);
    if (specItem) {
      setIsEditing(true);
      setEditId(id);
      setName(specItem.title);
    } else {
      console.log(`Item with id ${id} not found.`);
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="app-container">
      <form className="to-do-form" onSubmit={handleSubmit}>
        <h2>To-Do List</h2>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <div className="form-control">
          <input
            type="text"
            className="to-do-input"
            placeholder="Type something"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Add"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="to-do-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
