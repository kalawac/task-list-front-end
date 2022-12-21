import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
import './App.css';
import NewTaskForm from './components/NewTaskForm.js';

const kBaseUrl = 'https://task-list-api-c17.herokuapp.com';

const convertFromApi = (apiTask) => {
  // const {id, description, is_complete, title} = apiTask;
  const { is_complete: isComplete, ...rest } = apiTask;

  // const newTask = {id, description, isComplete: is_complete, title};
  const newTask = { isCompleteData: isComplete, ...rest };
  return newTask;
};

const getAllTasksApi = () => {
  return axios
    .get(`${kBaseUrl}/tasks`)
    .then((response) => {
      return response.data.map(convertFromApi);
    })
    .catch((err) => {
      console.log(err.data);
    });
};

const createTaskApi = (taskData) => {
  const requestBody = taskData;

  return axios
    .post(`${kBaseUrl}/tasks`, requestBody)
    .then((response) => {
      return convertFromApi(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateTaskApiIncomplete = (id) => {
  return axios
    .patch(`${kBaseUrl}/tasks/${id}/mark_incomplete`)
    .then((response) => {
      return convertFromApi(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateTaskApiComplete = (id) => {
  return axios
    .patch(`${kBaseUrl}/tasks/${id}/mark_complete`)
    .then((response) => {
      return convertFromApi(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteTaskApi = (id) => {
  return axios
    .delete(`${kBaseUrl}/tasks/${id}`)
    .then((response) => {
      return convertFromApi(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const App = () => {
  const [taskData, setTaskData] = useState([]);

  const getAllTasks = () => {
    return getAllTasksApi()
      .then((tasks) => {
        setTaskData(tasks);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleTaskSubmit = (taskData) => {
    createTaskApi(taskData)
      .then((newTask) => {
        setTaskData([...taskData, newTask]);
      })
      .catch((err) => console.log(err));
  };

  const updateTask = (updatedTask) => {
    const tasks = taskData.map((task) => {
      if (task.id === updatedTask.id) {
        if (task.isCompleteData) {
          updateTaskApiComplete(task.id);
        } else {
          updateTaskApiIncomplete(task.id);
        }
        return updatedTask;
      } else {
        return task;
      }
    });

    setTaskData(tasks);
  };

  const deleteTask = (id) => {
    return deleteTaskApi(id).then(() => {
      return getAllTasks();
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <NewTaskForm handleTaskSubmit={handleTaskSubmit} />
        <div>
          <TaskList
            tasks={taskData}
            onUpdateTasks={updateTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
