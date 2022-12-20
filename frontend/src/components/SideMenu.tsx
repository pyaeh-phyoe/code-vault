import React from 'react';
import { useNavigate } from 'react-router-dom'

const SideMenu = ({ setFilter }: any) => {
    const navigate = useNavigate()
    const handleClick = (e: React.MouseEvent) => {
        const activeItem = document.querySelector('.sidemenu__item--active')
        if (activeItem) {
            activeItem.className= 'sidemenu__item'
        }
        const currentItemValue = e.currentTarget.getAttribute('data-value')
        e.currentTarget.className = 'sidemenu__item--active'
        setFilter(currentItemValue)
    }

    return (
        <ul className='px-2	pt-8 text-grey	text-sm	'>
            <li className='sidemenu__item--active' data-value='all' onClick={(e) => handleClick(e)}>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5' />
                </svg>
                <span className='ml-4 align-text-top'><a className='align-middle hover:underline hover:text-white'>All</a></span></li>
            <li className='sidemenu__item' data-value='titled' onClick={(e) => handleClick(e)}>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' />
                </svg>
                <span className='ml-4'><a className='align-middle hover:underline hover:text-white'>Titled</a></span></li>
            <li className='sidemenu__item' data-value='untitled' onClick={(e) => handleClick(e)}>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' />
                </svg>
                <span className='ml-4 align-text-top'><a className='align-middle hover:underline hover:text-white'>Untitled</a></span></li>
            <li className='sidemenu__item-with-separator' onClick={() => navigate('/')}>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                </svg>
                <span className='ml-4 align-text-top'><a className='align-middle hover:underline hover:text-white'>New Snippet</a></span>
            </li>
        </ul>
    )
}

export default SideMenu