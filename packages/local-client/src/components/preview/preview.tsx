import React, {useEffect, useRef} from 'react';
import './preview.css'

interface PreviewProps {
    code: string | undefined;
    err: string | undefined;
}

const html = `
       <html lang="">
          <head><title>Jdoc</title></head>
          <body>
            <div id="preview"></div>
          </body>
          <script>
          const handleError = (err) => {
              const root = document.querySelector("#preview");  
              root.innerHTML = '<div style="color: red;"><h4>Runtime error</h4>' + err + '</div>'
              console.error(err);
              throw err;
          }
          
          // invoked to handle uncaught errors that are asynchronous
          window.addEventListener('error', (event) => {
              // default is that the browser prints out the error
              event.preventDefault()
              handleError(event.error)
          })
          
          
          window.addEventListener('message', (event) => {
            try {
                eval(event.data);
            } catch (err) {
                /* types of errors include 
                   synchronous vs asynchronous
                */
              handleError(err);
            }
          }, false)
          </script>       
       </html>
    `


const Preview: React.FC<PreviewProps> = ({ code, err }) => {
    const iframe = useRef<any>()

    useEffect(() => {
        iframe.current.srcDoc = html;

        // update the source doc and postMessage
        // without this, we may postMessage to a different element
        // if the user messes with it.
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, "*")
        }, 50);
    }, [code]);

    return (
       <div className="preview-wrapper">
           <iframe
               title="Code preview"
               srcDoc={html}
               sandbox="allow-scripts"
               ref={iframe}
           />
           { err && <div className="preview-error">{err}</div> }
       </div>
    )
}

export default Preview;
