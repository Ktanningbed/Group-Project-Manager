import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import './style.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Login'
import { getProjects } from '../features/projects/projectSlice'
import { reset } from '../features/auth/authSlice'
import Project from './Project'


function Dashboard() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const {projects, isLoading, isError, message} = useSelector((state) => state.projects)

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
        if(isError){
            console.log(message)
        }
        dispatch(getProjects())
        // return () => {
        //     dispatch(reset())
        // }
    }, [user, navigate, isError, message, dispatch])

    return (
        <>
            <Nav/>
            
        </>
    )
}

export default Dashboard