const resizable = () => {
    const wrapperX = document.querySelector('.wrapper-X') as HTMLElement
    const handlerX = document.querySelector('.handler-X') as HTMLElement
    const handlerYL = document.querySelector('.handler-YL') as HTMLElement
    const handlerYR = document.querySelector('.handler-YR') as HTMLElement
    const consoleHandler = document.querySelector('.console-resize') as HTMLElement

    const XL = document.querySelector('#XL') as HTMLElement
    const XR = document.querySelector('#XR') as HTMLElement
    const YLT = document.querySelector('#YL-top') as HTMLElement
    const YLB = document.querySelector('#YL-bottom') as HTMLElement
    const YRT = document.querySelector('#YR-top') as HTMLElement
    const YRB = document.querySelector('#YR-bottom') as HTMLElement
    console.log(handlerYL)

    const editorPreview = document.querySelector('#editor-preview') as HTMLElement
    const consoleLog = document.querySelector('.console-log') as HTMLElement

    let isHandlerDragging: boolean = false
    let activeHandler: 'X' | 'YL' | 'YR' | 'CH'

    document.addEventListener('mousedown', function (e) {
        console.log('mousedown')
        const target = e.target

        if (target == handlerX) {
            activeHandler = 'X'
            isHandlerDragging = true
            console.log('handler ', isHandlerDragging)
        } else if (target == handlerYL) {
            activeHandler = 'YL'
            isHandlerDragging = true
            console.log('YL')
        } else if (target == handlerYR) {
            activeHandler = 'YR'
            isHandlerDragging = true
        } else if (target === consoleHandler) {
            console.log('console')
            activeHandler = 'CH'
            isHandlerDragging = true
        }
    })

    document.addEventListener('mousemove', function (e) {
        // console.log('mouse move')
        // console.log(isHandlerDragging)
        if (!isHandlerDragging) {
            return false;
        }
        editorPreview.style.pointerEvents = 'none'

        if (activeHandler === 'X') {
            console.log(e.clientX)
            // console.log(wrapperX.offsetLeft)
            const containerOffsetLeft = wrapperX.offsetLeft
            const pointerRelativeXpos = e.clientX - containerOffsetLeft;
            XL.style.width = pointerRelativeXpos - 8 + 'px';
            XR.style.width = 'calc(100% - ' + pointerRelativeXpos + 'px)'
        } else if (activeHandler === 'YL') {
            console.log(e.clientY)
            console.log(wrapperX.offsetTop)
            const containerOffsetTop = wrapperX.offsetTop
            const pointerRelativeYpos = e.clientY - containerOffsetTop;
            YLT.style.height = pointerRelativeYpos - 8 + 'px';
            YLB.style.height = 'calc(100% - ' + pointerRelativeYpos + 'px)'

        } else if (activeHandler === 'YR') {
            const containerOffsetTop = wrapperX.offsetTop
            const pointerRelativeYpos = e.clientY - containerOffsetTop;
            YRT.style.height = pointerRelativeYpos - 8 + 'px';
            YRB.style.height = 'calc(100% - ' + pointerRelativeYpos + 'px)'
        } else if (activeHandler === 'CH') {
            const containerOffsetTop = wrapperX.offsetTop
            const pointerRelativeYpos = e.clientY - containerOffsetTop;
            console.log(pointerRelativeYpos)

            // const value = 822 - 94 - 48.5 - pointerRelativeYpos + 'px';
            const value = 822 - e.clientY - 94 + 'px'
            console.log(value)
            consoleLog.style.height = value
        }
    })

    document.addEventListener('mouseup', function (e) {
        //console.log('mouse up')
        isHandlerDragging = false
        editorPreview.style.pointerEvents = 'auto'
    })

}

export default resizable