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

const kBaseUrl = 'https://task-list-api-c17.herokuapp.com';

const convertFromApi = (apiTask) => {
  // const {id, description, is_complete, title} = apiTask;
  const {is_complete: isComplete, ...rest} = apiTask;

  // const newTask = {id, description, isComplete: is_complete, title};
  const newTask = {isCompleteData: isComplete, ...rest};
  return newTask;
};

const getAllTasksApi = () => {
  return axios.get(`${kBaseUrl}/tasks`)
  .then(response => {
    console.log(response);
    return response.data.map(convertFromApi);
  })
  .catch(err => {
    console.log(err.data);
  });
};

// const createTaskApi = (exampleTask) => {
//   return axios.post(`${kBaseUrl}/tasks`, {data: exampleTask})
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// };

const updateTaskApiIncomplete = (id) => {
  return axios.patch(`${kBaseUrl}/tasks/${id}/mark_incomplete`)
  .then((response) => {
    return convertFromApi(response.data);
  })
  .catch((err) => {
    console.log(err);
  });
};

const updateTaskApiComplete = (id) => {
  return axios.patch(`${kBaseUrl}/tasks/${id}/mark_complete`)
  .then((response) => {
    return convertFromApi(response.data);
  })
  .catch((err) => {
    console.log(err);
  });
};

const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

  const getAllTasks = () => {
    return getAllTasksApi()
    .then(tasks => {
      setTaskData(tasks);
    })
    .catch(err => {
      console.log(err.data);
    });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  // const createTask = (newTask) => {
  //   return createTaskApi(exampleTask)
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // };

  const updateTask = (updatedTask) => {
    const tasks = taskData.map((task) => {
      if (task.id === updatedTask.id) {
        if (task.isCompleteData){
          updateTaskApiComplete(task.id);
        }
        else {
          updateTaskApiIncomplete(task.id);
        }
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
