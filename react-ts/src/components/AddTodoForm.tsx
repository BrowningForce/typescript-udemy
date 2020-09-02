import React, { useRef } from 'react';
import { Todo } from '../interfaces/Todo';

import '../styles/NewTodo.css';

interface AddTodoProps {
  addTodo: (todo: Todo) => void;
}

const AddTodoForm: React.FC<AddTodoProps> = ({ addTodo }) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    const newTodo = {
        id: `t${Math.random().toFixed(2)}`,
        text: enteredText,
    }
    addTodo(newTodo);
    textInputRef.current!.value = '';
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor='addTodo'></label>
      <input type='text' id='addTodo' ref={textInputRef} />
      <button type='submit'>Add Todo</button>
    </form>
  );
};

export default AddTodoForm;