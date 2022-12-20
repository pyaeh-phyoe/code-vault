import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext'
import { useSnippetsContext } from '../hooks/useSnippetsContext'

interface Props {
    _id: string;
}

const DeleteButton = ({ _id }: Props) => {
    const { state } = useAuthContext()
    const { dispatch } = useSnippetsContext()
    const user = state.user

    const deleteSnippet = async (e: React.MouseEvent) => {
        if (user) {
            const url = '/api/snippets/' + _id

            const response = await fetch(url, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${user.token}` },
                body: JSON.stringify({ _id }),
            })
            const json = await response.json()
            console.log(response)
    
            if (response.ok) {
                dispatch({ type: 'DELETE_SNIPPET', payload: json })
            }
        }
    }
    return (
        <button onClick={(e) => deleteSnippet(e)}>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
        </button>);
}

export default DeleteButton;