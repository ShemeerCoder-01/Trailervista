import React, { useEffect, useState } from 'react'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import GoogleIcon from '@mui/icons-material/Google';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { isSignedIn } from '../actions/signInChecker';
import { dbFetching } from '../actions/dbFetching';


function SignUpPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
   
     useEffect(()=>{
    const user = isSignedIn();
    if(user){
      navigate('/Home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    
    

    const handleClick = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            localStorage.setItem('user', response.user.email);
            dbFetching();
            navigate('/Home');
        } catch (error) {
            navigate('/');
            console.log(error);
        }
    }

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            localStorage.setItem('user', response.user.email);
            navigate('/Home');
        } catch (e) {
            console.log(e);
            navigate('/');
        }
    }

    return (
        <div className='container' >
            <div className='signup'>
                <h1>SignUp Page</h1>
                <div style={{ marginTop: "2rem" }}>
                    <form onSubmit={handleForm}>
                        <TextField
                            sx={{
                                "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "rgb(2 6 23)"
                                },
                                "& .MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white"
                                },
                                "& .MuiInputLabel-root": {
                                    color: "rgb(255,255,255)",
                                    bottom: "8px"
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "rgb(239 68 68)"
                                },
                                "& .MuiInputBase-input": {
                                    fontSize: "12px",
                                    padding: "14px 7px",
                                    height: "22px",
                                    color: "white"
                                },
                            }}
                            type='email'
                            label="Email"
                            placeholder='Enter email address'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            sx={{
                                "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "rgb(2 6 23)"
                                },
                                "& .MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white"
                                },
                                "& .MuiInputLabel-root": {
                                    color: "rgb(255,255,255)",
                                    bottom: "8px"
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "rgb(239 68 68)"
                                },
                                "& .MuiInputBase-input": {
                                    fontSize: "12px",
                                    padding: "14px 7px",
                                    height: "22px",
                                    color: "white"
                                },
                            }}
                            type='password'
                            label="Password"
                            placeholder='Enter password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button className='auth-btn' type='submit'>SignUp</button>
                        <p>Already signed up? <span onClick={()=> navigate('/login')} style={{paddingLeft:"5px",cursor:"pointer"}}>Login</span> </p>
                    </form>
                </div>
                <div className="text-with-lines">
                    <hr className="line" />
                    <span className="text">or</span>
                    <hr className="line" />
                </div>
                <button className='auth-btn' onClick={handleClick} style={{display:"flex",alignItems:"center"}}>Sign In with Google <GoogleIcon className='icon' /></button>
            </div>
        </div>
    )
}

export default SignUpPage;