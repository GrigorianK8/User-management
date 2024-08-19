import { Route, Routes } from 'react-router-dom'
import './App.css'
import CreateUser from './components/createUser/createUser'
import Dashboard from './components/dashboard/dashboard'
import NoMatch from './components/noMatch/noMatch'
import UpdateUser from './components/updateUser/updateUser'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path='/user' element={<CreateUser/>}/>
        <Route path='/user/:id' element={<UpdateUser/>}/>
        <Route path='*' element={<NoMatch/>}/>
      </Routes>
    </>    
  );
}

export default App;
