import {useState} from 'react'
import {useDispatch} from 'react-redux' 
import { createProject } from '../features/projects/projectSlice'

const ProjectForm = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()

        dispatch(createProject({text}))
        setText('')
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="login__field">
                    <input className='login__input input-background' placeholder='add a project' type="text" name='text' id='text' value={text} onChange={(e) => setText(e.target.value)}/>
                    {/* <button className="button login__submit" type='submit'>
                        <span className='button__text button-size'>Add Project</span>
                    </button> */}
                </div>
            </form>
        </section>
    )
}

export default ProjectForm