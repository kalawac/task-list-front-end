import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  const onCompleteButtonClick = () => {
    const updatedTask = {
      id: props.id,
      title: props.title,
      isCompleteData: !props.isCompleteData,
    };
    props.onUpdate(updatedTask);
  };

  const buttonClass = props.isCompleteData
    ? 'tasks__item__toggle--completed'
    : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={onCompleteButtonClick}
      >
        {props.title}
      </button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isCompleteData: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Task;
