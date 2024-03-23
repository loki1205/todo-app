import { useState } from 'react';
import './App.css'
import Head from './Head'
import TodoList from './TodoList'
interface ListType {
  id: number,
  task: string,
  completed: boolean;
}

function App() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [taskList, setTaskList] = useState<ListType[]>([{
    id: 0,
    task: 'Complete online JavaScript course',
    completed: false
  }, {
    id: 1,
    task: 'Jog around the park 3x',
    completed: false
  }, {
    id: 2,
    task: '10 minutes meditation',
    completed: false
  }, {
    id: 3,
    task: 'Read for 1 hour',
    completed: false
  }, {
    id: 4,
    task: 'Pick up groceries',
    completed: false
  },
  {
    id: 5,
    task: "Complete Todo App on Frontend Mentor",
    completed: false,
  }
  ]);
  function toggleDarkMode() {
    setDarkModeEnabled((prev) => !prev);
  }
  function changeTaskList(list: ListType[]){
    setTaskList(list);
  }
  return (
    <div className={darkModeEnabled ? 'app-dark' : 'app-light'}>
      <Head darkModeEnabled={darkModeEnabled} addTask={changeTaskList} taskList={taskList} toggleDarkMode={toggleDarkMode} />
      <TodoList changeTaskList={changeTaskList} darkModeEnabled={darkModeEnabled} taskList={taskList} />
    </div>
  )
}

export default App
