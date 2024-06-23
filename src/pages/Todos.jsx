import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
function Todos() {
    const { id } = useParams();
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('serial');
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
        fetch(`http://localhost:3000/todos?userId=${id}`)
        .then((response) => response.json())
        .then(data => setTodos(data))
        .catch((error) => {
          console.error('Error:', error);
        });
    }, [id]);
  
    const addTodo = async (title) => {
        const newTodo = {
            userId: id,
            title,
            completed: false
          };
          try {
            const response = await fetch('http://localhost:3000/todos', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newTodo),
            });
            const data = await response.json();
            setTodos([...todos, data]);
          } catch (error) {
            console.error('Error adding todo:', error);
          }
    };
  
    const deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:3000/todos/${id}`, {
              method: 'DELETE',
            });
            setTodos(todos.filter(todo => todo.id !== id));
          } catch (error) {
            console.error('Error deleting todo:', error);
          }
    };
  
    const updateTodo = async (id, newTitle) => {
        try {
            const response = await fetch(`http://localhost:3000/todos/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ title: newTitle }),
            });
            const data = await response.json();
            setTodos(todos.map(todo => (todo.id === id ? data : todo)));
          } catch (error) {
            console.error('Error updating todo:', error);
          }
    };
  
    const toggleTodo = async (id) => {
        const todo = todos.find(todo => todo.id === id);
        try {
          const response = await fetch(`http://localhost:3000/todos/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !todo.completed }),
          });
          const data = await response.json();
          setTodos(todos.map(todo => (todo.id === id ? data : todo)));
        } catch (error) {
          console.error('Error toggling todo:', error);
        }
    };
  
    const filteredTodos = todos.filter(todo => {
      if (searchTerm) {
        return todo.id === parseInt(searchTerm) ||
          todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (searchTerm === 'completed' && todo.completed) ||
          (searchTerm === 'not completed' && !todo.completed);
      }
      return true;
    });
  
    const sortedTodos = filteredTodos.sort((a, b) => {
      if (filter === 'serial') return a.id - b.id;
      if (filter === 'completed') return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
      if (filter === 'alphabetical') return (a.title || '').localeCompare(b.title || '');
      if (filter === 'random') return Math.random() - 0.5;
      return 0;
    });
  
    return (
      <div>
        <h2>Todos</h2>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="serial">Serial</option>
          <option value="completed">Completed</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select>
        <input
          type="text"
          placeholder="Search todos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul>
          {sortedTodos.map(todo => (
            <li key={todo.id}>
              {todo.id}. {todo.title}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => {
                const newTitle = prompt('Enter new title', todo.title);
                if (newTitle) updateTodo(todo.id, newTitle);
              }}>Edit</button>
            </li>
          ))}
        </ul>
        <button onClick={() => {
          const title = prompt('Enter todo title');
          if (title) addTodo(title);
        }}>Add Todo</button>
      </div>
    );
  }
  
  
export default Todos;