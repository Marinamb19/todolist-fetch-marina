import React, { useEffect, useState } from 'react'
import { CiTrash } from "react-icons/ci";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isHovered, setIsHovered] = useState(new Array(tasks.length).fill(false));

  console.log("TASKS", tasks)

  // ESTE ES EL GET 
  // SE USA PARA AGREGAR TAREAS DESDE LA API

  useEffect(() => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/todolistmarina')
      .then((response) => response.json())
      .then(response => setTasks(response))
      .catch(error => (error))
  }, [])

  // ESTE ES EL PUT
  // se utiliza generalmente para actualizar o crear un recurso en el servidor

  const AddTask = (data) => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/todolistmarina', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([...tasks, { label: data, done: false }])
    })
      .then((response) => response.json())
      .then(data => console.log(data))
      .catch(error => (error))
  }

  // ESTE ES EL POST 
  const newToDo = () => {
  const ExampleTask = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify([])
  }
  fetch('https://playground.4geeks.com/apis/fake/todos/user/todolistmarina', ExampleTask)
.then(response => response.json())
.then(data => console.log(data))
}
  useEffect(() => {
   newToDo()
  }, [])
  
  const DeleteTask = () => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/todolistmarina', {
      method: 'DELETE',
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setTasks([]); 
    })
    .catch((error) => console.error(error));
}


  const handleAddTask = (event) => {
    if (event.key === 'Enter' && newTask.trim() !== '') {
      setTasks([...tasks, { label: newTask.trim(), done: false }]);
      AddTask(newTask.trim())
      setNewTask('');
    }
  };
  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };
  const handleMouseEnter = (index) => {
    const newHovered = [...isHovered];
    newHovered[index] = true;
    setIsHovered(newHovered);
  };
  const handleMouseLeave = (index) => {
    const newHovered = [...isHovered];
    newHovered[index] = false;
    setIsHovered(newHovered);
  };

  return (
    <div className='container'>
      <h1>To do List</h1>
      <input
        type="text"
        placeholder="Agregar nueva tarea"
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
        onKeyPress={handleAddTask}
      />
      <ul>
        {tasks.map((task, index) => (
          <li key={index} onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}>
            {task.label}
            {isHovered[index] && (
              <CiTrash
                className="trash"
                onClick={() => handleDeleteTask(index)}
              />
            )}

          </li>
        ))}
      </ul>
      <button onClick={DeleteTask}>
        Delete
      </button>
      <button onClick={newToDo}>Crear una nueva</button>
    </div>
  )
}

export default ToDoList