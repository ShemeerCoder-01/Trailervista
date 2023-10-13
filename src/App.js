import './App.css';
import SignupPage from './Pages/SignUpPage';
import { Routes,Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LoaderComponent from './components/Common/Loader';

const HomePage = lazy(()=>import('./Pages/HomePage'));
const LoginPage = lazy(()=>import('./Pages/LoginPage'));
const UserPage = lazy(()=>import('./Pages/UserPage'));







function App() {





  return (
    <div className="App">
      <Suspense fallback={<LoaderComponent/>}>
      <Routes>
        
          <Route path='/' element={<SignupPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/Home' element={<HomePage/>}/>
          <Route path='/profile' element={<UserPage/>}/>
      </Routes>
      </Suspense>
    </div>
  );
}

export default App;
