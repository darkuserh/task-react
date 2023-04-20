import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', completed: false });
  const [filterCompleted, setFilterCompleted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;

    setNewTask({
      ...newTask,
      [name]: name === 'completed' ? checked : value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setTasks([...tasks, newTask]);
    setNewTask({ title: '', description: '', completed: false });
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);

    setTasks(newTasks);
  };

  const handleEdit = (index, editedTask) => {
    const newTasks = [...tasks];
    newTasks[index] = editedTask;

    setTasks(newTasks);
  };

  const filteredTasks = filterCompleted
    ? tasks.filter((task) => task.completed)
    : tasks.filter((task) => !task.completed);

  const searchedTasks = searchQuery
    ? filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredTasks;

  return (
    <div className="App">
      <h1 className='header'>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          required
        ></textarea>
        <label htmlFor="completed">Completed</label>
        <input
          type="checkbox"
          name="completed"
          checked={newTask.completed}
          onChange={handleInputChange}
        />
        <button type="submit">Add Task</button>
      </form>
      <div>
        <label htmlFor="filterCompleted">Filter Completed:</label>
        <input
          type="checkbox"
          name="filterCompleted"
          checked={filterCompleted}
          onChange={() => setFilterCompleted(!filterCompleted)}
        />
      </div>
      <div>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          name="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
      <ul>
        {searchedTasks.map((task, index) => (
          <li key={index}>
            <div className="task-header">
              <h3>{task.title}</h3>
              <div className="task-buttons">
                <button onClick={() => handleDelete(index)}>Delete</button>
                <button
                  onClick={() => {
                    const editedTask = {
                      ...task,
                      completed: !task.completed
                    };
                    handleEdit(index, editedTask);
                  }}
                >
                  {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
              </div>
            </div>
            <p>{task.description}</p>
            <p>
            {task.completed ? 'Completed' : 'Incomplete'}
        </p>
      </li>
    ))}
  </ul>
</div>
  )
}
export default App;

