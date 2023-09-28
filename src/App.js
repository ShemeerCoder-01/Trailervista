import './App.css';
import SignupPage from './Pages/SignUpPage';
import { Routes,Route, useNavigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import UserPage from './Pages/UserPage';
import { useEffect } from 'react';



function App() {

  const navigate = useNavigate();

  useEffect(()=>{
    let user = localStorage.getItem('user');
    if(user){
      navigate('/Home');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])



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
