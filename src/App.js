import React from 'react'
import { Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import PlanetsDetailsPage from './components/PlanetsDetailsPage';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/item/:id' element={<PlanetsDetailsPage/>}/>
      </Routes>
    </div>
  )
}

export default App
