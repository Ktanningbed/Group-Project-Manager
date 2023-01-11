import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {FaSignOutAlt} from 'react-icons/fa'
import { logout, reset } from '../features/auth/authSlice'
import { useEffect } from 'react'
import { getProjects } from '../features/projects/projectSlice'
import ProjectItem from './ProjectItem'
import ProjectForm from './ProjectForm'
import { getTasks, createTask, updateTask } from '../features/tasks/taskSlice'
import ProjectModal from './ProjectModal'
import {BsGearFill} from 'react-icons/bs'


const Nav = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const {projects, isLoading, isError, message} = useSelector((state) => state.projects)
    const taskState = useSelector((state) => state.tasks)
    const [selected, setSelected] = useState()
    const [editProject, setEditProject] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [task, setTask] = useState('')
    const [clickedTask, setClickedTask] = useState()
    
    // const [chosenPrio, setChosenPrio] = useState('')
    
    useEffect(() => {
        if(isError){
            console.log(message)
        }
        dispatch(getProjects())

        if(selected){
            dispatch(getTasks(selected._id))
        }
        if(clickedTask && selected){
            dispatch(updateTask(clickedTask))
            dispatch(getTasks(selected._id))
            setClickedTask()
        }
        // return () => {
        //     dispatch(reset())
        // }
    }, [user, navigate, isError, dispatch, selected, clickedTask])

    
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    const onTaskSubmit = (e) => {
        e.preventDefault()
        dispatch(createTask([selected._id, {text: task, priority: "in progress"}]))
        dispatch(getTasks(selected._id))
        setTask('')
    }

    const taskFilter = (task) => {
        return task.priority==='in progress'
    }
    const taskFilter2 = (task) => {
        return task.priority==='completed'
    }

    const onTaskClick = () => {
        console.log(clickedTask)
        dispatch(updateTask(clickedTask))
        dispatch(getTasks(selected._id))
    }
    return (
        <div className='screen-container'>
            <section className='sidebar'>
                <div className="logo">
                    <Link className='logo-link' to='/'><button className='logo-btn' onClick={() => setSelected()}>ProjectManager</button></Link>
                </div>
                <div>
                    <button className="button login__submit logout-btn" onClick={onLogout}>
                        <FaSignOutAlt className='logout'/> <span className="button__text">Logout</span>
                    </button> 
                </div>
                
                <div className="content">
                    <h1 className="section-title">Projects</h1>
                    {/* <button onClick={() => dispatch(())} className='close'>+</button> */}
                    <ProjectForm/>
                    <div className='project-container'>
                        {projects.length>0?(
                            <>
                                
                                <div className="projects">
                                        {projects.map((project) => {
                                            // console.log(selected)
                                            return(
                                            <div key={project._id}>
                                                <button className='button login__submit project-btn' onClick={() => setSelected(project)}><ProjectItem key={project._id} project={project}/><button  className="openModalBtn gear" onClick={() => {
                                                    setOpenModal(true)
                                                    setEditProject(project)}}><div><BsGearFill/></div></button></button>
                                                {/* <button onClick={() => dispatch(deleteProject(project._id))} className='close'>X</button> */}
                                                
                                                {openModal && <ProjectModal setOpenModal={setOpenModal} project={editProject} />}
                                            </div>)
                                        }
                                        )}
                                </div>
                            </>
                        ):(<h3>You have not started any Projects</h3>)}
                    </div>
                </div>

            </section>

            <section className="content task-content">
                {selected?(
                    <>
                        <h1>{selected.text}</h1>
                        <br/>
                        <form className='login' onSubmit={onTaskSubmit}> 
                            <input className='login__input task-input' type='text' value={task} placeholder='Add some tasks!' onChange={(e) => setTask(e.target.value)}/>
                            <button className='button login__submit' type="submit"><span className='button__text'>Add</span></button>
                        </form>

                        <div className='tasks'>
                            <div className='in-progress task'>
                                <h1>Tasks in progress:</h1>
                                {taskState.tasks.filter(taskFilter).length>0?(
                                    <div>
                                        {taskState.tasks.map((task) => 
                                            {
                                                if(task.priority==='in progress')return <div key={task._id}><button className='button login__submit' onClick={() => {
                                                    setClickedTask({id: task._id, priority: 'completed'})
                                                    onTaskClick()
                                                }}>{task.text}</button></div>
                                            })}
                                    </div>
                                ):(
                                    <h3>There are no tasks</h3>
                                )}
                            </div>
                            <div className="completed task">
                                <h1>Completed Tasks</h1>
                                {taskState.tasks.filter(taskFilter2).length>0?(
                                    <div>
                                        {taskState.tasks.map((task) => 
                                            {
                                                if(task.priority==='completed')return <div key={task._id}><button className='button login__submit'  onClick={() => {
                                                    setClickedTask({id: task._id, priority: 'in progress'})
                                                    onTaskClick()
                                                }}>{task.text}</button></div>
                                            })}
                                    </div>
                                ):(
                                    <h3>There are no tasks</h3>
                                )}
                            </div>

                        </div>
                        
                    </>
                    
                ):(
                    <div>hi</div>
                )}
            </section>

        </div>
    )
}

export default Nav