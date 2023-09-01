import React, { useState } from 'react'
import './style.css'
import { auth,provider } from '../../firebase'
import { signInWithPopup } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';


function SignupPage() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const navigate = useNavigate();

  const handleClick = async()=>{
    try {
      const response = await signInWithPopup(auth,provider);
      localStorage.setItem('user',response.user.uid);
      navigate('/Home');
    } catch (error) {
      navigate('/');
      console.log(error);
    }
  }

  const handleForm = async(e)=>{
    e.preventDefault();
    try{
    const response = await createUserWithEmailAndPassword(auth,email, password);  
    localStorage.setItem('user',response.user.uid);
    navigate('/Home');
    }catch(e){
      console.log(e);
      navigate('/');
    }
  }

  return (
    <div className='container' >
      <div className='signup'>
        <h1>SignUp Page</h1>
        <div>
          <form onSubmit={handleForm}>
            <input type='email' placeholder='Email' value={email} onChange={e=> setEmail(e.target.value)}/>
            <input type='password' placeholder='Password' value={password} onChange={e=> setPassword(e.target.value)}/>
            <button className='auth-btn' type='submit'>Submit</button>
          </form>
        </div>
        <div className="text-with-lines">
          <hr className="line" />
          <span className="text">or</span>
          <hr className="line" />
        </div>
        <button className='auth-btn' onClick={handleClick}>Sign In with Google <GoogleIcon className='icon'/></button>
      </div>
    </div>
  )
}

export default SignupPage;