import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="to-do-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <div key={id} className="to-do-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
