import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1); // For tracking the task being edited

  // Function to add a new task
  const addTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() === "") return;

    if (editIndex >= 0) {
      // Editing an existing task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = taskInput;
      setTasks(updatedTasks);
      setEditIndex(-1);
    } else {
      // Adding a new task
      const newTask = {
        id: tasks.length + 1,
        text: taskInput,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
    
    setTaskInput("");
  };

  // Function to toggle task completion
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Function to start editing a task
  const startEditing = (task) => {
    setTaskInput(task.text);
    setEditIndex(tasks.indexOf(task));
  };

  // Count completed tasks
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-gray-900 rounded-3xl shadow-lg">
      {/* Header */}
      <h1 className="text-2xl font-bold text-blue-400 text-center mb-4">
        My To-Do List
      </h1>
      <div className="mb-6 text-lg text-gray-300 text-center">
        {completedTasks}/{tasks.length} tasks completed
      </div>

      {/* Form to Add/Edit Task */}
      <form onSubmit={addTask} className="flex mb-6">
        <input
          type="text"
          className="flex-1 p-4 bg-gray-800 text-white border border-gray-700 rounded-l-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button
          type="submit"
          className="p-4 bg-blue-500 text-white rounded-r-3xl hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          {editIndex >= 0 ? "Update" : "+"}
        </button>
      </form>

      {/* Task List */}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-4 rounded-xl shadow-md transition-all duration-300 ${
              task.completed
                ? "bg-gray-800 line-through text-gray-500"
                : "bg-gray-700 text-white"
            }`}
          >
            {/* Checkbox-like div */}
            <div
              onClick={() => toggleTaskCompletion(task.id)}
              className={`flex items-center cursor-pointer ${
                task.completed ? "bg-green-500" : "bg-gray-600"
              } rounded-full w-8 h-8 flex-shrink-0 transition duration-300`}
            >
              {task.completed && (
                <div className="w-4 h-4 rounded-full bg-white m-auto"></div>
              )}
            </div>

            <span className="text-lg flex-1 mx-4">{task.text}</span>

            <div className="flex space-x-2">
              <button
                onClick={() => startEditing(task)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
