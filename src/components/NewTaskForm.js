import React, {useState} from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({handleTaskSubmit}) => {
  const [taskTitle, setTask] = useState('');

  const handleTitleChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleTaskSubmit(taskTitle);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='title'>Task Name: </label>
      <input type='text' id='title' name='title' value={taskTitle} onChange= {handleTitleChange} />
      <div><input type='submit' value='Create a Task' /></div>
    </form>
  );
};

NewTaskForm.propTypes = {
  handleTaskSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;