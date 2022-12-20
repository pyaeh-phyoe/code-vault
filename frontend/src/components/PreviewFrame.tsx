import { useRef } from 'react'
import DeleteButton from './DeleteButton'
import { useNavigate } from 'react-router-dom';

interface Props {
    _id: string;
    title: string;
    html: string;
    css: string;
    js: string;
}

const PreviewFrame = ({ _id, title, html, css, js }: Props) => {
    const navigate = useNavigate()
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const preview = iframeRef.current && iframeRef.current.contentDocument
    const code = `<style type='text/css'>${css}</style><body>${html}<script>${js}</script></body>`
    if (preview) {
        preview.open();
        try {
            preview.write(code);
        } catch (error) {
            console.error(error)
        }
        preview.close();
    }

    return (
        <div>
            <div className='cursor-pointer' onClick={() => navigate(`/snippets/${_id}`)}>
                <iframe ref={iframeRef} className='test-iframe pointer-events-none w-full bg-white h-72'></iframe>
            </div>
            <div className='p-5	bg-secondaryColor flex justify-between'>
                <h3 className='hover:underline cursor-pointer' onClick={() => navigate(`/snippets/${_id}`)}>{title}</h3>
                <DeleteButton _id={_id} />
            </div>
        </div>
    )
}

export default PreviewFrame