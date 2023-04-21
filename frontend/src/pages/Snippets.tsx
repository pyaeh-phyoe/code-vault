import { useEffect, useMemo, useState } from 'react';
import { useSnippetsContext } from '../hooks/useSnippetsContext';
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import PreviewFrame from '../components/PreviewFrame'
import LoginButton from '../components/LoginButton'
import vault from '../assets/vault.svg'

interface Project {
    _id: string;
    title: string;
    html: string;
    css: string;
    js: string;
    createdAt: string;
    updatedAt: string;
}

interface User {
    email: string;
    token: string;
}

const Snippets = () => {
    const navigate = useNavigate()
    const { snippets, dispatch } = useSnippetsContext()
    const { state } = useAuthContext()
    const [filter, setFilter] = useState<'all' | 'titled' | 'untitled'>('all')
    const [result, setResult] = useState<any>(snippets)
    const user = state.user

    useEffect(() => {
        let result;

        if (filter === 'titled') {
            result = snippets.filter((p: any) => {
                return p.title !== 'Untitled'
            });
        } else if (filter === 'untitled') {
            result = snippets.filter((p: any) => {
                return p.title === 'Untitled'
            });
        } else {
            result = snippets
        }
        setResult(result)
        console.log(result)
    }, [filter, snippets])

    useEffect(() => {
        console.log("dispatch")
        console.log(user)
        const fetchSnippet = async (user: User) => {
            const response = await fetch('/api/snippets', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json()

            console.log(json)

            if (response.ok) {
                dispatch({ type: 'SET_SNIPPETS', payload: json })
            }
        }

        if (user) {
            fetchSnippet(user)
        } else {
            console.log("not user")
        }
    }, [dispatch, user])

    return (
        <div className='bg-primaryColor  flex flex-col'>
            <nav className='flex justify-between h-16	bg-secondaryColor'>
                <div className='flex items-center'>
                    <div style={{ backgroundImage: `url(${vault})` }} className='w-12	h-12 bg-cover mx-3'></div>
                </div>
                <div className='flex'>
                    <div className='button-type-1' onClick={() => navigate('/')}>
                        <div className='save'>Editor<div></div></div>
                    </div>
                    <LoginButton />
                </div>
            </nav>
            <div style={{ 'height': 'calc(100vh - 4rem)' }} className='flex flex-row h-full grow border border-borderColor'>
                <div className='w-52 border-r border-borderColor'>
                    <SideMenu setFilter={setFilter} />
                </div>

                {snippets.length ? (
                    <div className='pt-8 grow overflow-y-scroll'>
                        <h2 className='pl-8 font-bold text-2xl text-white'>All your snippets</h2>
                        <div className='p-8 grid gap-5 text-white grow	' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}>
                            {result.map((p: Project, index: number) => <PreviewFrame _id={p._id} title={p.title} html={p.html} css={p.css} js={p.js} />)}
                        </div></div>
                ) :
                    (
                        <div className='grow flex flex-col items-center justify-center	'>
                            <button onClick={() => navigate('/')} className='border-2	border-adjacentColor rounded-3xl	 text-white py-3	px-6	'>Create a new snippet</button>
                        </div>
                    )}
            </div>
        </div >
    );
}

export default Snippets;


