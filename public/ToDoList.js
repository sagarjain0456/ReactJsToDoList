import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  // Your config values here
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');

  const handleAddTodo = () => {
    const newTodo = { text: todoInput, completed: false };
    db.collection("todos").add(newTodo)
      .then((docRef) => {
        setTodos([...todos, { ...newTodo, id: docRef.id }]);
        setTodoInput('');
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleDeleteTodo = (id) => {
    db.collection("todos").doc(id).delete()
      .then(() => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const handleToggleTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);
    db.collection("todos").doc(id).update({ completed: !todo.completed })
      .then(() => {
        const newTodos = [...todos];
        const index = newTodos.findIndex(todo => todo.id === id);
        newTodos[index].completed = !todo.completed;
        setTodos(newTodos);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  // Load todos from Firestore when component mounts
  useEffect(() => {
    db.collection("todos").get()
      .then((querySnapshot) => {
        const loadedTodos = [];
        querySnapshot.forEach((doc) => {
          loadedTodos.push({ ...doc.data(), id: doc.id });
        });
        setTodos(loadedTodos);
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }, []);

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
          {todos.map((todo) => (
            <div id="list-btn-container" key={todo.id}>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                  <span>{todo.text}</span>
                </li>
              </ul>
              <button id="delete-btn" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
