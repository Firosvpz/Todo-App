import React, { useState } from 'react';
import './index.css';

function TodoList() {
    const [tasks, setTasks] = useState(['sachin', 'sehwag', 'Gambhir']);
    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingTask, setEditingTask] = useState('');

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== '' && !tasks.includes(newTask)) {
            setTasks([...tasks, newTask]);
            setNewTask('');
        } else {
            alert('Name already exists');
        }
    }

    function deleteTask(index) {
        const isConfirmed = window.confirm('Are you sure you want to delete this task?');
        if (isConfirmed) {
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
        }
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            const temp = updatedTasks[index];
            updatedTasks[index] = updatedTasks[index - 1];
            updatedTasks[index - 1] = temp;
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            const temp = updatedTasks[index];
            updatedTasks[index] = updatedTasks[index + 1];
            updatedTasks[index + 1] = temp;
            setTasks(updatedTasks);
        }
    }

    function startEditing(index) {
        setEditingIndex(index);
        setEditingTask(tasks[index]);
    }

    function handleEditChange(event) {
        setEditingTask(event.target.value);
    }

    function saveEdit(index) {
        if (editingTask.trim() !== '' && !tasks.includes(editingTask)) {
            const updatedTasks = [...tasks];
            updatedTasks[index] = editingTask;
            setTasks(updatedTasks);
            setEditingIndex(null);
            setEditingTask('');
        } else {
            alert('Name already exists or is empty');
        }
    }

    function cancelEdit() {
        setEditingIndex(null);
        setEditingTask('');
    }

    return (
        <div className='to-do-list'>
            <h1>Players List</h1>
            <div>
                <input
                    type="text"
                    placeholder='Enter a name..'
                    value={newTask}
                    onChange={handleInputChange}
                />
                <br /><br />
                <button
                    className='add-button'
                    onClick={addTask}
                >
                    ADD
                </button>
            </div>
            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {editingIndex === index ? (
                            <span>
                                <input
                                    type="text"
                                    value={editingTask}
                                    onChange={handleEditChange}
                                />
                                <button
                                    className='save-button'
                                    onClick={() => saveEdit(index)}
                                >
                                    Save
                                </button>
                                <button
                                    className='cancel-button'
                                    onClick={cancelEdit}
                                >
                                    Cancel
                                </button>
                            </span>
                        ) : (
                            <span className='text'>{task}</span>
                        )}
                        <button
                            className='delete-button'
                            onClick={() => deleteTask(index)}
                        >
                            Delete
                        </button>
                        <button
                            className='move-button'
                            onClick={() => moveTaskUp(index)}
                        >
                            Up
                        </button>
                        <button
                            className='move-button'
                            onClick={() => moveTaskDown(index)}
                        >
                            Down
                        </button>
                        {editingIndex !== index && (
                            <button
                                className='edit-button'
                                onClick={() => startEditing(index)}
                            >
                                Edit
                            </button>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default TodoList;
