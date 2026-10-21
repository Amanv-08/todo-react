import { useEffect, useState } from 'react';

import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';

function App() {

  const [task, setTask] = useState('');

  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Save tasks in LocalStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = () => {
    if (!task.trim()) return;
    const newTask = {
      id: Date.now(),
      task: task.trim(),
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);

    setTask('');
    setSearchText('');
    setIsSearching(false);
    setFilter('Pending');
  };

  // Search Task
  const searchTask = () => {
    setSearchText(task.trim());
    setIsSearching(true);
    setFilter('All');
  };

  // Start Editing
  const startEdit = (item) => {
    setEditingId(item.id);
    setEditText(item.task);
  };

  // Save Edited Task
  const saveEdit = (id) => {
    if (!editText.trim()) return;

    setTasks((prevTasks) =>
      prevTasks.map((item) =>
        item.id === id ? { ...item, task: editText.trim() } : item
      )
    );

    setEditingId(null);
    setEditText('');
  };

  // Cancel Editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  // Toggle Completed / Pending
  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((item) => item.id === id ? { ...item, completed: !item.completed } : item)
    );
  };

  // Delete One Task
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((item) => item.id !== id));

    if (editingId === id) {
      cancelEdit();
    }
  };

  // Complete All
  const completeAllTasks = () => {
    setTasks((prevTasks) => prevTasks.map((item) => ({...item, completed: true,})) );
  };

  // Clear All
  const clearAllTasks = () => {
    if (tasks.length === 0) return;
    const confirmed = window.confirm('Are you sure you want to delete all tasks?');
    if (confirmed) { setTasks([]); cancelEdit(); setTask(''); setSearchText(''); setIsSearching(false);}
  };

  // Search + Status Filter
    const filteredTasks = tasks.filter((item) => {
    const matchesSearch = !isSearching || item.task.toLowerCase().includes(searchText.toLowerCase());

    const matchesFilter = filter === 'Pending' ? !item.completed : filter === 'Completed' ? item.completed : true;

    return matchesSearch && matchesFilter;
  });

  // Counters
  const pendingCount = tasks.filter(
    (item) => !item.completed).length;

  const completedCount = tasks.filter(
    (item) => item.completed).length;

  return (
    <div className="min-h-screen bg-[#111318] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-2xl border-2 border-white bg-[#1b1f27] p-6 md:p-8">

        <h1 className="text-white mt-2 flex justify-center mb-6 text-4xl font-bold">
          To <span className="text-green-300 mr-2">do</span> List 📃
        </h1>

        <TaskForm task={task} setTask={setTask} onSearch={searchTask} onAdd={addTask} />

        <TaskFilters filter={filter} setFilter={setFilter} pendingCount={pendingCount} taskCount={tasks.length} onCompleteAll={completeAllTasks} onClearAll={clearAllTasks} />

        <TaskList filteredTasks={filteredTasks} tasks={tasks} filter={filter} isSearching={isSearching} searchText={searchText} editingId={editingId} editText={editText} setEditText={setEditText} onToggle={toggleTask} onStartEdit={startEdit} onSaveEdit={saveEdit} onCancelEdit={cancelEdit} onDelete={deleteTask} />

        <TaskStats total={tasks.length} pending={pendingCount} completed={completedCount} />

      </div>
    </div>
  );
}

export default App;