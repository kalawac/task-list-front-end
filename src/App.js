import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
import './App.css';
import NewTaskForm from './components/NewTaskForm.js';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isCompleteData: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isCompleteData: true,
  },
];

const convertFromApi = (apiTask) => {
  // const {id, description, is_complete, title} = apiTask;
  const {is_complete, ...rest} = apiTask;

  // const newTask = {id, description, isComplete: is_complete, title};
  const newTask = {isComplete: is_complete, ...rest};
  return newTask;
};

const getAllTasksApi = () => {
  return axios.get('https://task-list-api-c17.herokuapp.com/tasks')
  .then(response => {
    return response.data.map(convertFromApi);
  });
};

const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

  const updateTask = (updatedTask) => {
    const tasks = taskData.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      } else {
        return task;
      }
    });

    setTaskData(tasks);
  };

  const handleTaskSubmit = (taskData) => {
    console.log(taskData);
    return taskData;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <NewTaskForm handleTaskSubmit={handleTaskSubmit}/>
        <div>
          <TaskList tasks={taskData} onUpdateTasks={updateTask} />
        </div>
      </main>
    </div>
  );
};

export default App;
