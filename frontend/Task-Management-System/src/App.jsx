
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AddTask from './component/AddTaskComponent'

function App() {

  return (
    <Router>
    {/* <HeaderComponent /> */}
    <Routes>
      {/* <Route path='/' element={<WelcomePage />} />
      <Route path='/tasks' element={
          <Tasks />
      } /> */}
      <Route path='/add-task' element={
          <AddTask />
      } />
      {/* <Route path='/history' element={
          <TaskHistory  />
      } />
      <Route path='/update-task/:id' element={
          <AddTask />
      } /> */}
    </Routes>
  </Router>
  )
}

export default App
