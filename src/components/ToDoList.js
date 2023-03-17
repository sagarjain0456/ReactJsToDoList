import React, { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [todoInput, setTodoInput] = useState('');

  const handleAddTodo = () => {
    setTodos([...todos, todoInput]);
    setTodoInput('');
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };



    // Save todos to localStorage whenever they change
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);


  return (
    <div>
      <h1 id="todolist-heading">To-Do List</h1>
      <input id="input-bar"
        type="text"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        onKeyPress={handleInputKeyPress}
      />
    
      <button id="add-btn" onClick={handleAddTodo}>Add</button>

<div id="grandparent-div">
      <ul>
  {todos.map((todo, index) => (
    <div id="list-btn-container" key={index}>
      <ul><li>{todo}</li></ul>
      <button id="delete-btn" onClick={() => handleDeleteTodo(index)}>Delete</button>
    </div>
  ))}
</ul>
</div>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
    </div>
    


  );
}


export default TodoList;
