import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const Signup = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
                setInput({
                    username: "",
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
                    <img src="https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Signup Image" className="w-full h-full object-cover " />
                </div>
                <div className='w-1/2  flex flex-col gap-5 p-8'>
                    <form onSubmit={signupHandler} className='flex flex-col gap-5 p-8'>
                        <div className='my-4'>
                        <h1 className='font-bold text-xl text-orange-600 text-center'>Career-Hub</h1>
                        <p className='text-sm text-center'>Create an account to connect with profesionals and work together</p>
                        </div>
                        <div>
                            <span className='font-medium'>Username</span>
                            <Input
                                type="text"
                                name="username"
                                value={input.username}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-transparent my-2"
                            />
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
                                <Button type='submit'>Signup</Button>
                            )
                        }
                        <span className='text-center'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup