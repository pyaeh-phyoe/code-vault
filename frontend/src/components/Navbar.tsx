import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'
import LoginButton from './LoginButton'
import vault from '../assets/vault.svg'

interface Props {
    setTitle: any;
    title: string;
    html: string;
    css: string;
    js: string;
}

const Navbar = ({ title, setTitle, html, css, js }: Props) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [titleEdit, setTitleEdit] = useState(false)

    const { state } = useAuthContext()
    const user = state.user

    const saveSnippet = async () => {
        if (user) {
            const data = { title, html, css, js }
            console.log(data)

            let url = '/api/snippets'
            let method = 'POST'
            if (id) {
                url = `/api/snippets/${id}`
                method = 'PATCH'
            }

            const response = await fetch(url, {
                method,
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            console.log(response)
            const json = await response.json()
        } else {
            navigate('/login')
        }
    }

    return (
        <nav className='h-16 bg-secondaryColor flex justify-between border border-borderColor'>
            <div className='text-white flex items-center'>
                <div style={{backgroundImage: `url(${vault})`}} className='w-12	h-12 bg-cover mx-3'></div>
                {titleEdit ? (
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        if (title === '') {
                            setTitle('Untitled')
                        }
                        setTitleEdit(false)
                    }}>
                        <input id='title' value={title} onChange={e => setTitle(e.target.value)} className='bg-secondaryColor' autoFocus />
                    </form>
                ) : (
                    <>
                        <span>{title}</span>
                        <div className='mx-2.5 cursor-pointer' onClick={() => {
                            setTitleEdit(true)
                            setTitle('')
                        }}>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' />
                            </svg>
                        </div>
                    </>
                )}
            </div>
            <div className='flex'>
                <div className='button-type-1' onClick={saveSnippet}>
                    <div className='save'>Save<div></div></div>
                </div>
                <div className='button-type-1' onClick={() => navigate('/snippets')}>
                    <div className='save'>Snippets<div></div></div>
                </div>
                <LoginButton />
            </div>
        </nav>
    )
}

export default Navbar
