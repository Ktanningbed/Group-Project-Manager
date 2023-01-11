import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteProject } from '../features/projects/projectSlice'

const ProjectItem = ({project}) => {
    const dispatch = useDispatch()
    return (
        <div className="project">
            <p className="project-text">{project.text}</p>
        </div>
    )
}

export default ProjectItem