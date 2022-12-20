import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

const pink = '#ff7edb'
const blue = '#2ee2fa'
const lightBlue = '#36f9f6'
const green = '#72f1b8'
const red = '#fe4450'
const yellow = '#fede5d'
const orange = '#f97e72'
const grey = '#848bbd'

const backgroundColor = '#272335'

const settings = {
    background: backgroundColor,
    foreground: '#fff',
    caret: '#fff',
    selection: '#413F4F',
    // selectionMatch: '#036dd626',
    // lineHighlight: '#8a91991a',
    selectionMatch: '#413F4F',
    lineHighlight: '#272335',
    gutterBackground: '#272335',
    gutterForeground: '#878690',
}


const neonThemeHtml = createTheme({
    theme: 'dark',
    settings,
    styles: [
        { tag: t.tagName, color: pink },// tag selector
        { tag: t.angleBracket, color: pink },
        { tag: t.comment, color: grey },
        { tag: t.propertyName, color: blue },//property name
        { tag: t.string, color: orange },
    ],
});


const neonThemeCss = createTheme({
    theme: 'dark',
    settings,
    styles: [
    { tag: t.tagName, color: green },// tag selector
    { tag: t.labelName, color: green },// id selector 
    { tag: t.className, color: green },// class selector
    { tag: t.propertyName, color: yellow },//property name
    { tag: t.keyword, color: pink },//keyword value
    { tag: t.unit, color: orange },
    { tag: t.literal, color: blue },
    { tag: t.string, color: red },
    { tag: t.comment, color: grey },
    ],
});

const neonThemeJs = createTheme({
    theme: 'dark',
    settings,
    styles: [
        { tag: t.variableName, color: pink },
        { tag: t.function(t.variableName), color: blue },
        { tag: t.string, color: orange },
        { tag: t.number, color: blue },
        { tag: t.bool, color: orange },
        { tag: t.propertyName, color: lightBlue },
        { tag: t.bracket, color: yellow },
        { tag: t.comment, color: grey },
        { tag: t.keyword, color: yellow },
    ],
});


export { neonThemeHtml, neonThemeCss, neonThemeJs }