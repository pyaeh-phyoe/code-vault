import { useState, useEffect } from 'react'

const Console = () => {
    const [currentValue, setCurrentValue] = useState('')
    const [history, setHistory] = useState([''])
    const [error, setError] = useState<boolean>()

    const consoleInputHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') {
            return
        }
        const consoleInput = e.target as HTMLInputElement
        const consoleInputValue = consoleInput.value
        const consoleOutput = document.querySelector('.console-log') as HTMLElement

        if (consoleInputValue.match(/console.clear\((\s+)?\)/)) {
            consoleOutput.innerHTML = ''
        } else {
            let element = document.createElement('p');
            element.append(consoleInputValue)
            consoleOutput.append(element)
            setHistory([...history, consoleInputValue])
            let a = currentValue.replace(/console\.(log|warn|info|error)\(.+\)/, '')
            a += '\n' + consoleInputValue
            console.log(a)
            setCurrentValue(a)
        }
        consoleInput.value = ''
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    useEffect(() => {

        updateCommandLine(currentValue)

    }, [history, currentValue])

    useEffect(() => {
        const handleErrorEvent = () => {
            setError(true)
        }
        document.addEventListener('consoleErrorEvent', handleErrorEvent)
        return () => document.removeEventListener('consoleErrorEvent', handleErrorEvent)
    }, [])

    useEffect(() => {
        if (error) {
            const errorInput = history[history.length - 1]
            const undo = currentValue.replace(errorInput, '')
            setCurrentValue(undo)
            setError(false)
        }
    }, [error])

    const toggleConsole = () => {
        const elem = document.querySelector('#console') as HTMLElement
        const display = getComputedStyle(elem).display

        if (display === 'none') {
            elem.style.display = 'block'
        } else {
            elem.style.display = 'none'
        }
    }

    const clearConsole = () => {
        const consoleOutput = document.querySelector('.console-log') as HTMLElement
        consoleOutput.innerHTML = ''
    }


// .console-log {
//     height: 9rem;
//     overflow-y: scroll;
//     background-color: var(--adjacent-color);
//     color: #fff;
// }

    return (
        <section id='console' className='bottom-0 absolute w-full text-base	'>
            <div className='console-resize'></div>
            <section className='flex  items-center bg-secondaryColor h-9 px-1 justify-end	'>
                <button className='button-type-2' onClick={clearConsole}>Clear</button>
            <button onClick={toggleConsole} className='button-type-2'> X </button>

            </section>
            <section className='console-log h-36	 overflow-y-scroll bg-primaryColor'></section>
            <div className='flex items-center bg-consoleColor py-1	px-2.5	border-r-8 border-primaryColor	'>
                <iframe id='commandline' className='hidden'></iframe>
                <span className='text-white cursor-default mr-4	'>&gt;</span>
                <input className='font-[monospace] border-none w-full bg-consoleColor' onKeyUp={consoleInputHandler} />
            </div>
        </section>
    );
}

export default Console;



const start = 'function start() { console = { panel: parent.document.querySelector(".console-log"), log: function (m) { if (typeof m === "object") { m = JSON.stringify(m); } let p = document.createElement("p"); p.append(m); this.panel.append(p); }, warn: function (m) { let p = document.createElement("p"); p.style.color = "#fede5d"; p.append(m); this.panel.append(p); }, error: function (m) { let p = document.createElement("p"); p.style.color = "#fe4450"; p.append(m); this.panel.append(p); var myCustomData = { foo: "bar" }; var event = new CustomEvent("consoleErrorEvent", { detail: myCustomData }); window.parent.document.dispatchEvent(event); } }; }'


export const updateCommandLine = (js: string) => {
    const previewFrame = document.querySelector('#commandline') as HTMLIFrameElement
    const preview = previewFrame.contentDocument
    const getErrorLineNumber = '<script>window.onerror = function(message, url, line, col, errorObj) { alert(`${message}\n${url}, ${line}:${col}`);};</script>'
    const code = `${getErrorLineNumber}<script>${start}</script><script>start()</script><script>try{${js}}catch(error){console.error(error)}</script>`
    console.log(code)

    if (preview) {
        preview.open();
        preview.write(code);
        preview.close();
    }
}
