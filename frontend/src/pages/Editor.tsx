import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { color, colorView, colorTheme } from '@uiw/codemirror-extensions-color'

import { neonThemeHtml, neonThemeCss, neonThemeJs } from '../themes/neon'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

import resizable from '../helper/resizable'
import { updatePreview } from '../helper/utility'

import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Console from '../components/Console'
import htmlIcon from '../assets/htmlIcon.png'
import cssIcon from '../assets/cssIcon.png'
import jsIcon from '../assets/jsIcon.png'

import '../Editor.css'


interface User {
    email: string;
    token: string;
}


const Editor = () => {
    const { id } = useParams()
    const { state } = useAuthContext()
    const user = state.user
    const [title, setTitle] = useState('Untitled')
    const [htmlCode, setHtmlCode] = useState(' ')
    const [cssCode, setCssCode] = useState(' ')
    const [jsCode, setJsCode] = useState(' ')

    useEffect(() => {
        console.log('user ', user)
        const fetchSnippet = async (user: User) => {
            const response = await fetch(`/api/snippets/${id}`, {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json()

            console.log(json)
            setTitle(json.title)
            setHtmlCode(json.html)
            setCssCode(json.css)
            setJsCode(json.js)
        }

        if (id && user) {
            fetchSnippet(user)
        }
    }, [user])

    useEffect(() => {
        resizable()
    }, [])

    useEffect(() => {
        updatePreview(htmlCode, cssCode, jsCode)
    }, [htmlCode, cssCode, jsCode])
    return (
        <>
            <Navbar title={title} setTitle={setTitle} html={htmlCode} css={cssCode} js={jsCode} />
            <div className='wrapper-X'>
                <div className='wrapper-Y' id='XL'>
                    <div className='editor' id='YL-top'>
                        <Header title='HTML' imgSrc={htmlIcon} />
                        <div className='editor-container'>
                            <CodeMirror
                                value={htmlCode}
                                height='100%'
                                style={{ fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace' }}
                                theme={neonThemeHtml}
                                extensions={[html()]}
                                onChange={(value) => { setHtmlCode(value) }}
                            />
                        </div>
                    </div>
                    <div className='handler-YL'></div>
                    <div className='editor' id='YL-bottom'>
                        <Header title='Java Script' imgSrc={jsIcon} />
                        <div className='editor-container'>
                            <CodeMirror
                                value={jsCode}
                                height='100%'
                                theme={neonThemeJs}
                                extensions={[javascript()]}
                                style={{ fontFamily: 'Fira Code' }}
                                onChange={(value) => { setJsCode(value) }}
                            />
                        </div>
                    </div>
                </div>
                <div className='handler-X'></div>
                <div className='wrapper-Y' id='XR'>
                    <div className='editor' id='YR-top'>
                        <Header title='CSS' imgSrc={cssIcon} />
                        <div className='editor-container'>
                            <CodeMirror
                                value={cssCode}
                                height='100%'
                                theme={neonThemeCss}
                                extensions={[css(), color]}
                                onChange={(value) => { setCssCode(value) }}
                            />
                        </div>
                    </div>
                    <div className='handler-YR'></div>
                    <div className='iframe' id='YR-bottom'>
                        <iframe id='editor-preview'></iframe>
                        <Console />
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}

export default Editor;
