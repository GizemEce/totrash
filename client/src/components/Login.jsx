import React, { useState } from 'react'

const Login = ({ onLoginSuccess }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const res = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                onLoginSuccess();
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server error');
        }
    };

    return (
        <div className='bg-white w-full lg:w-1/3 md:w-1/2 p-4 shadow-xl rounded-lg'>
            <div>
                <label className='text-lg font-medium ml-2'>Email</label>
                <input
                    onChange={(event) => setEmail(event.target.value)}
                    className='w-full border-2 border-[#00df9a] rounded-xl p-4 mt-1 focus:outline-none'
                    placeholder='Enter your email'
                    type='email'
                />
            </div>

            <div className='mt-5'>
                <label className='text-lg font-medium ml-2'>Password</label>
                <input
                    onChange={(event) => setPassword(event.target.value)}
                    className='w-full border-2 border-[#00df9a] rounded-xl p-4 mt-1 focus:outline-none'
                    placeholder='Enter your password'
                    type='password'
                />
            </div>

            <button 
                className='w-full py-3 mt-4 bg-[#00df9a] rounded-xl text-[#000300] font-bold'
                onClick={handleLogin}>
                LOGIN
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    )
}

export default Login