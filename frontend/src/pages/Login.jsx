import React from 'react'
import Header from '../components/Header'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import { FaSignInAlt, FaChevronRight, FaUserAlt, FaLock } from 'react-icons/fa'
import './style.css'

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)


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
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email, password
        }
        dispatch(login(userData))
    }

    return (
        <div className='lr-background'>
            <div className="form-style login-form">
                <div className="heading">
                    <h1>
                        Login
                    </h1>               
                </div>
                <h3>
                    Login and start managing projects
                </h3>

                <div className="form">
                    {/* <form className='lr' onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange}/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange}/>
                        </div>
                        <div className="form-group">
                            <button type='submit' className='btn btn-block'>Login</button>
                        </div>
                    </form> */}
                    <form className="login" onSubmit={onSubmit}>
                        <div className="login__field">
                            <FaUserAlt className='fa-icons'/>
                            <input type="email" className="login__input" id="email" name="email" value={email} placeholder="Email" onChange={onChange}/>
                        </div>
                        <div className="login__field">
                            <FaLock className='fa-icons'/>
                            <input type="password" className="login__input" id="password" name="password" value={password} placeholder="Password" onChange={onChange}/>
                        </div>
                        <button className="button login__submit">
                            <span className="button__text">Login</span>
                            <FaChevronRight />
                        </button>				
                    </form>
                </div>
                <Link to='/register'>
                    Don't have an account?
                </Link> 
            </div>
        </div>
    )
            
        
    
}

export default Login