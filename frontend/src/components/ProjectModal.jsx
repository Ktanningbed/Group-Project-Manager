import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser, addUser, deleteProject, getProjects, updateProject } from '../features/projects/projectSlice'
import axios from 'axios'
function ProjectModal({setOpenModal, project}) {
    const [projectName, setProjectName] = useState('')
    const [userName, setUserName] = useState('')
    const [curProj, setCurProj] = useState(project.text)
    const dispatch = useDispatch()
    const {projects, isLoading, isError, isSuccess, message} = useSelector((state) => state.projects)
    const [email, setEmail] = useState(project.emails)
    
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProject([{text: projectName}, {id: project._id}] ))
        dispatch(getProjects())
        setCurProj(projectName)
    }

    const onSubmitUser = (e) => {
        e.preventDefault()
        dispatch(addUser([project._id, {email: userName}]))
        dispatch(getProjects())

        if(isSuccess){ 
            setEmail([...email, userName])
            console.log(isError, isSuccess)
        }
        else if(isError){
            alert('enter a valid email')
        }
        setUserName('')
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                        setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="body">
                <h1 className='modal-title'>Editing "{curProj}"</h1>
                    <form className='login' onSubmit={onSubmit}>
                        <input placeholder='Change project name' className='login__input' type='text' value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
                        {/* <button className='button login__submit' type='submit'>Change</button> */}
                    </form>
                    <form className='login' onSubmit={onSubmitUser}>
                        <input className='login__input' placeholder='Add a user' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
                        {/* <button className='button login__submit' type='submit'>Add</button> */}
                    </form>
                    <div className='user-list'>
                        <div className='users'>{email.map((e) => {
                            return <div className='user'><div><button className='user-delete'>X</button>  {e}</div></div>
                        })}</div>
                          
                        
                        
                    </div>
                    
                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                        setOpenModal(false);
                        dispatch(getProjects())
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button onClick={() => {
                        dispatch(deleteProject(project._id))
                        setOpenModal(false)
                    }}>Delete this Project</button>
                </div>
            </div>
        </div>
    )
}

export default ProjectModal