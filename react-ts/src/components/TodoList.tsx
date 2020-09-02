import React from 'react';

import '../styles/TodoList.css';

interface TodoProps {
  items: { id: string; text: string }[];
  deleteTodo: (todoId: string) => void;
}

const TodoList: React.FC<TodoProps> = ({ items, deleteTodo }) => {
  const renderTodoList = () => {
    return items.map((todo) => (
      <li key={todo.id}>
        <span>{todo.text}</span>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </li>
    ));
  };

  return <ul>{renderTodoList()}</ul>;
};

export default TodoList;
