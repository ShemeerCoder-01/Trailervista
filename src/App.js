import './App.css';
import SignupPage from './Pages/SignUpPage';
import { Routes,Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import UserPage from './Pages/UserPage';



function App() {



  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignupPage/>}/>
        <Route path='/Home' element={<HomePage/>}/>
        <Route path='/profile' element={<UserPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
