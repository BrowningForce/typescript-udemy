import React, { useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

import { Todo } from '../interfaces/Todo';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (todo: Todo) => {
    const newTodoList = [...todos, todo];
    setTodos(newTodoList);
  };

  const deleteTodoHandler = (todoId: string) => {
    const newTodoList = todos.filter(todo => todo.id !== todoId);
    setTodos(newTodoList);
  };

  return (
    <div className='App'>
      <h1>Todo List</h1>
      <AddTodoForm addTodo={addTodoHandler} />
      <TodoList items={todos} deleteTodo={deleteTodoHandler} />
    </div>
  );
};

export default App;
