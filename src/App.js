import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
    setTask('');
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">My To-Do List</h1>
      <div className="input-group">
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="What needs to be done?"
          className="task-input"
          onKeyDown={(e) => { if (e.key === 'Enter') handleAddTask(); }}
        />
        <button onClick={handleAddTask} className="add-btn" aria-label="Add task">Add</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <span className="checkmark"></span>
            </label>
            <span className="todo-text">{todo.text}</span>
            <button
              className="delete-btn"
              onClick={() => handleDelete(todo.id)}
              aria-label={`Delete ${todo.text}`}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

