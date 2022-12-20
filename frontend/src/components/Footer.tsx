const Footer = () => {
    const toggleConsole = () => {
        const elem = document.querySelector('#console') as HTMLElement
        const display = getComputedStyle(elem).display

        if (display === 'none') {
            elem.style.display = 'block'
        } else {
            elem.style.display = 'none'
        }
    }

    return (
        <footer className='flex items-center h-8 px-1 bg-secondaryColor cursor-pointer border-t border-borderColor'>
            <button onClick={toggleConsole} className='button-type-2 bg-grey border-grey'>Console</button>
        </footer>
    );
}

export default Footer;