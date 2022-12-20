
const start = 'function start() { console = { panel: parent.document.querySelector(".console-log"), log: function (m) { if (typeof m === "object") { m = JSON.stringify(m); } let p = document.createElement("p"); p.append(m); this.panel.append(p); }, warn: function (m) { let p = document.createElement("p"); p.style.color = "#fede5d"; p.append(m); this.panel.append(p); }, error: function (m) { let p = document.createElement("p"); p.style.color = "#fe4450"; p.append(m); this.panel.append(p); var myCustomData = { foo: "bar" }; var event = new CustomEvent("consoleErrorEvent", { detail: myCustomData }); window.parent.document.dispatchEvent(event); } }; }'


export const updatePreview = (html: string, css: string, js: string) => {
    const previewFrame = document.querySelector('#editor-preview') as HTMLIFrameElement;
    const consoleOutput = document.querySelector('.console-log') as HTMLIFrameElement;
    const preview = previewFrame.contentDocument
    const getErrorLineNumber = '<script>window.onerror = function(message, url, line, col, errorObj) { console.log(`${message}\n${url}, ${line}:${col}`);};</script>'
    const code = `${getErrorLineNumber}<script>${start}</script><script>start()</script><style type='text/css'>${css}</style><body>${html}</body><script>try{${js}}catch(error){console.error(error)}</script>`
    console.log(code)
    if (preview) {
        preview.open();
        preview.write(code);
        preview.close();
    }
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}


// export const exampleCode = {
//     js: _reverseMarks.toString()
// }

// function _reverseMarks(list: any, width: any) {
//     var i, block, l = list.length,
//       elements = [];
//     for (i = 0; i < l; i++) {
//       elements.push({ location: list[i].location, color: list[i].color.clone() });
//     }
//     for (i = 0; i < l; i++) {
//       list[i].location = 100 - elements[list.length - i - 1].location;
//       list[i].color = elements[list.length - i - 1].color;
//       block = list[i].htmlBlock;
//       block.attr("position", list[i].location);
//       block.attr("color", list[i].color.displayColor("rgba"));
//       block.css("left", ((list[i].location * width) / 100) + "px");
//       block.trinity.css("background-color", list[i].color.displayColor("rgba"));
//     }
//     return list;
//   }