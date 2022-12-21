import React, { useState } from 'react';
import PropTypes from 'prop-types';

const kDefaultFormState = {
  title: '',
  description: '',
};

const NewTaskForm = ({ handleTaskSubmit }) => {
  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    const newFormData = { ...formData, [fieldName]: fieldValue };

    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleTaskSubmit(formData);
    setFormData(kDefaultFormState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Task Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Task Description: </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <input type="submit" value="Create a Task" />
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  handleTaskSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;
