
import React, { useState, useEffect } from 'react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');
  const [editedTaskDescription, setEditedTaskDescription] = useState('');
  const [filterOption, setFilterOption] = useState('all');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    filterTasks();
  }, [tasks]);

  const filterTasks = () => {
    switch (filterOption) {
      case 'active':
        setFilteredTasks(tasks.filter(task => !task.completed));
        break;
      case 'completed':
        setFilteredTasks(tasks.filter(task => task.completed));
        break;
      default:
        setFilteredTasks(tasks);
        break;
    }
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') {
      alert('Please enter a task title');
      return;
    }

    if (tasks.some(task => task.title === newTaskTitle)) {
      alert('Task with this title already exists');
      return;
    }

    const newTask = {
      id: Math.random().toString(36).substring(7),
      title: newTaskTitle,
      description: newTaskDescription,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    }
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find(task => task.id === taskId);
    setEditedTaskTitle(taskToEdit.title);
    setEditedTaskDescription(taskToEdit.description);
  };

  const handleSaveEdit = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, title: editedTaskTitle, description: editedTaskDescription } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
  };

  const activeTasksCount = tasks.filter(task => !task.completed).length;
  const completedTasksCount = tasks.filter(task => task.completed).length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center py-4 border-b border-gray-200">Task Manager</h1>
        <div className="p-4">
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Task Title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-grow border border-gray-300 rounded-l p-2 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Task Description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="flex-grow border border-gray-300 rounded-r p-2 focus:outline-none"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l-none focus:outline-none"
            >
              Add Task
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Active Tasks ({activeTasksCount})</h2>
            {filteredTasks.map(task => (
              !task.completed && (
                <div key={task.id} className="border border-gray-300 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      {editingTaskId === task.id ? (
                        <>
                          <input
                            type="text"
                            value={editedTaskTitle}
                            onChange={(e) => setEditedTaskTitle(e.target.value)}
                            className="text-lg font-semibold mb-1 border-b-2 border-transparent focus:border-blue-500 outline-none"
                          />
                          <textarea
                            value={editedTaskDescription}
                            onChange={(e) => setEditedTaskDescription(e.target.value)}
                            className="resize-none border border-gray-300 p-1"
                          />
                        </>
                      ) : (
                        <>
                          <h3 className="text-lg font-semibold">{task.title}</h3>
                          <p>{task.description}</p>
                        </>
                      )}
                    </div>
                    <div>
                      {editingTaskId === task.id ? (
                        <button onClick={() => handleSaveEdit(task.id)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none">Save</button>
                      ) : (
                        <button onClick={() => handleEditTask(task.id)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none">Edit</button>
                      )}
                      <button onClick={() => handleToggleComplete(task.id)} className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none ${task.completed ? 'bg-opacity-50 cursor-not-allowed' : ''}`}>
                        {task.completed ? 'Undo' : 'Complete'}
                      </button>
                      <button onClick={() => handleDeleteTask(task.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none">Delete</button>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Completed Tasks ({completedTasksCount})</h2>
            {filteredTasks.map(task => (
              task.completed && (
                <div key={task.id} className="border border-gray-300 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <p>{task.description}</p>
                    </div>
                    <div>
                      <button onClick={() => handleToggleComplete(task.id)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none">Undo</button>
                      <button onClick={() => handleDeleteTask(task.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none">Delete</button>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
