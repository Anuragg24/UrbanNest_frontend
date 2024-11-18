import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import login from '../assets/login.png'
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch =useDispatch();
    const [loginUser,{isLoading:loginLoading}]= useLoginUserMutation();
    const navigate =useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
           
            email,
            password
            
        }
        try {
            const response = await loginUser(data).unwrap()
            const{token,user}= response;
            dispatch(setUser({user}))
            alert("login successfull!");
            navigate("/")
        } catch (error) {
           setMessage("please provide a valid email and password") 
        }
        
    }
  return (
    <section className='h-screen flex items-center justify-center'
    style={{
        backgroundImage: `url(${login})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}>
    <div className='max-w-sm border shadow bg-white mx-auto p-8'>
        <h2 className='text-2xl font-semibold pt-5'>Please Login</h2>
        <form onSubmit={handleLogin} className='space-y-5 max-w-sm mx-auto pt-8'>
            <input type="email" name="email" id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email Address' required
                className='w-full bg-gray-100 focus:outline-none px-5 py-3'
            />
            <input type="password" name="password" id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password' required
                className='w-full bg-gray-100 focus:outline-none px-5 py-3'
            />
            {
                message && <p className='text-red-500'>{message}</p>
            }

            <button type='submit'
                className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'
            >Login</button>
        </form>

        <p className='my-5 italic text-sm text-center'>Don't have an account?
            <Link to="/register" className='text-red-700 px-1 underline'>Register</Link> here.</p>
    </div>
</section>
  )
}

export default Login