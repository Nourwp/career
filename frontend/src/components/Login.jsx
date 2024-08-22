import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
                setInput({
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className='flex items-center w-screen h-screen'>
            <div className='flex items-center w-full'>
                <div className='w-1/2'>
                    {/* Image with filter */}
                    <img src="https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Login Image" className="w-full h-full object-cover" />
                </div>
                <div className='w-1/2 shadow-lg flex flex-col gap-5 p-8'>
                    <form onSubmit={signupHandler} className='flex flex-col gap-5 p-8'>
                        <div className='my-4'>
                        <h1 className=' font-bold text-xl text-orange-600 text-center'>Career-Hub</h1>
                        <p className='text-sm text-center'>Login to connect with profesionals and work together</p>
                        </div>
                        <div>
                            <span className='font-medium'>Email</span>
                            <Input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-transparent my-2"
                            />
                        </div>
                        <div>
                            <span className='font-medium'>Password</span>
                            <Input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-transparent my-2"
                            />
                        </div>
                        {
                            loading ? (
                                <Button>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type='submit'>Login</Button>
                            )
                        }

                        <span className='text-center'>Dosent have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login