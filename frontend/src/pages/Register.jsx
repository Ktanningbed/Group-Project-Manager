import React, { useState } from 'react'
import { useEffect } from 'react'
import { FaChevronRight, FaLock, FaUser, FaUserAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import {register, reset} from '../features/auth/authSlice'
import './style.css'


function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2){
            toast.error('Passwords do not match')
        }
        else{
            const userData = {
                name, email, password,
            }// all from the form
            dispatch(register(userData))
        }
    }

    return (
        <>
            <div className="lr-background">
                <div className="form-style register-form">
                    <div className="heading">
                        <h1>Register</h1>
                    </div>
                    <h3>Please create an account</h3>
                    <div className='form'>
                        <form className='login' onSubmit={onSubmit}>
                            <div className="login__field">
                                <FaUserAlt className='fa-icons'/>
                                <input className='login__input' type="text" id="name" name="name" value={name} placeholder="Enter your name" onChange={onChange}/>
                            </div>
                            <div className="login__field">
                                <FaUserAlt className='fa-icons'/>
                                <input type="email" className="login__input" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange}/>
                            </div>
                            <div className="login__field">
                                <FaLock className='fa-icons'/>
                                <input type="password" className="login__input" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange}/>
                            </div>
                            <div className="login__field">
                                <FaLock className='fa-icons'/>
                                <input type="password" className="login__input" id="password2" name="password2" value={password2} placeholder="Confirm password" onChange={onChange}/>
                            </div>
                            <div className="button login__submit">
                                <span type='submit' className='button__text'>Register</span>
                                <FaChevronRight />
                            </div>
                        </form>
                    </div>
                    <Link to='/login'>
                        Already have an account?
                    </Link>
                </div>
            </div>
            
            
        </>
    )
}

export default Register