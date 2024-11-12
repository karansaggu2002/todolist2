import React, { useState } from 'react';

// Import FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import specific icons from free-solid-svg-icons
import { faCircleCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const TodoList = ({ todo, setTodo, setEditTodo }) => {

  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const toggleComplete = (id) => {
    setTodo((prevTodo) =>
      prevTodo.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const startEdit = (id, title) => {
    setEditId(id);
    setNewTitle(title);
  };

  const handleEditChange = (e) => {
    setNewTitle(e.target.value);
  };

  const saveEdit = (id) => {
    setTodo((prevTodo) =>
      prevTodo.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      )
    );
    setEditId(null); // Clear edit mode
  };

  const removeTodo = (id) => {
    setTodo((prevTodo) => prevTodo.filter((item) => item.id !== id));
  };

  return (
    <div style={{ display: 'flex' }}>
      <ul className="todo-list">
        {todo.map(({ id, title, completed }) => (
          <li key={id} className="todo-item">
            {editId === id ? (
              <input
                type="text"
                value={newTitle}
                onChange={handleEditChange}
              />
            ) : (
              <input
                type="text"
                value={title}
                className={`list ${completed ? "complete" : ""}`}
                readOnly
              />
            )}
            <div className="buttons">
              <button
                className="button-complete task-button"
                onClick={() => toggleComplete(id)}
              >
                <FontAwesomeIcon icon={faCircleCheck} />
              </button>

              {editId === id ? (
                <button
                  className="button-save task-button"
                  onClick={() => saveEdit(id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="button-edit task-button"
                  onClick={() => startEdit(id, title)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              )}

              <button
                className="button-delete task-button"
                onClick={() => removeTodo(id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
