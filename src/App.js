import './App.css';
import SignupPage from './components/SignUpPage';
import { useEffect } from 'react';
import { Routes,Route } from 'react-router-dom';
import { isSignedIn } from './actions/signInChecker';
// import { auth } from './firebase';
import HomePage from './Pages/HomePage';
import { useNavigate } from 'react-router-dom';


function App() {

 const navigate = useNavigate();


  useEffect(() => {
    // Add an observer to watch for changes in the user's authentication state
    const user = isSignedIn();
    if (user) {
      navigate('/Home');
    } else {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path='/' index element={<SignupPage/>}/>
        <Route path='/Home' element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
