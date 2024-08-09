import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function SignUp() {
    const [user, setUser] = useState({
        fullname: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",

    })
    const handleCheckbox = (gender) => {
        setUser({ ...user, gender })
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            
            const res = await axios.post('http://localhost:5000/api/v1/user/register',user,{
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials: true

            })
            console.log(res)
            
        } catch (error) {
            console.log(error)
            
        }
        
        setUser({
           

        })
    }

    return (
        <div className='min-w-96 m-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
                <h1 className='text-3xl font-bold text-center '>SignUp</h1>
                <form onSubmit={onSubmitHandler} action="">
                    <div>
                        <label className='label p-2'>
                            <span className=' text-base label-text'>Full Name</span>
                        </label>
                        <input
                            value={user.fullname}
                            onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                            className='w-full input input-bordered h-10' type="text" placeholder='fullname' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className=' text-base label-text'>Username</span>
                        </label>
                        <input
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            className='w-full input input-bordered h-10' type="text" placeholder='Username' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className=' text-base label-text'>Password</span>
                        </label>
                        <input
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className='w-full input input-bordered h-10' type="password" placeholder='password' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className=' text-base label-text'>Confirm Password</span>
                        </label>
                        <input
                            value={user.confirmPassword}
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                            className='w-full input input-bordered h-10' type="Password" placeholder='confirm Password' />
                    </div>
                    <div className='flex items-center my-4'>
                        <div className=' flex items-center'>
                            <p>Male </p>
                            <input
                                checked={user.gender === "male"}
                                onChange={() => handleCheckbox("male")}
                                type="checkbox"
                                defaultChecked
                                className="checkbox mx-2" />
                        </div>
                        <div className=' flex items-center'>
                            <p>Female</p>
                            <input
                                checked={user.gender === "female"}
                                onChange={() => handleCheckbox("female")}
                                type="checkbox"
                                defaultChecked
                                className="checkbox mx-2" />
                        </div>
                    </div>

                    <p className='text-center my-2'> Alredy have an account? <Link to="/login">
                        Login
                    </Link>
                    </p>



                    <div>
                        <button type='submit' className='btn btn-block btm-sm m-2 border border-slate-700'>Signup</button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default SignUp