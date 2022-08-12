import React, { useState, useEffect } from "react";

export const Todo = () => {
  const getLocalData = () => {
    const lists = localStorage.getItem("mytodo");
    if (lists) {
      return JSON.parse(lists);
    } else {
      return [];
    }
  };

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [editedItems, setEditedItems] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);
  const [count, setCount] = useState(0);

  const addItem = () => {
    if (!inputData) {
      alert("Please enter your text");
    } else if (inputData && toggleBtn) {
      setItems(
        items.map((curr) => {
          if (curr.id === editedItems) {
            return { ...curr, name: inputData };
          }
          return curr;
        })
      );
      setInputData("");
      setEditedItems(null);
      setToggleBtn(false);
    } else {
      const incomingItem = {
        id: Math.floor(Math.random() * 10000 + 1),
        name: inputData,
      };
      setItems([...items, incomingItem]);
      setInputData("");
      setCount(count + 1);
    }
  };

  const itemDelete = (id) => {
    const updatedItems = items.filter((curr) => {
      return curr.id !== id;
    });
    setCount(count - 1);
    setItems(updatedItems);
  };

  useEffect(() => {
    localStorage.setItem("mytodo", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    document.title = `TooDoos(${count})`;
  }, [count]);

  const editItem = (value) => {
    const itemEdit = items.find((curr) => {
      return curr.id === value;
    });
    setInputData(itemEdit.name);
    setEditedItems(value);
    setToggleBtn(true);
  };

  const removeAll = () => {
    setItems([]);
    setCount(0);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todos.png" alt="todologo" />
            <figcaption>Add your todos here</figcaption>
          </figure>
          <div className="addItems">
            <input
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              type="text"
              placeholder="Add items.."
              className="form-control"
            />
            {toggleBtn ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-solid fa-circle-plus" onClick={addItem}></i>
            )}
          </div>
          <div className="showItems">
            {items.map((curr) => {
              return (
                <div className="eachItem" key={curr.id}>
                  <h3>{curr.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curr.id)}
                    ></i>
                    <i
                      className=" far fa-trash-alt add-btn"
                      onClick={() => itemDelete(curr.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button className="btn effect04" onClick={removeAll}>
              <span>Remove all</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
