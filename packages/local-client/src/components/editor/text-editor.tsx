import './text-editor.css'
import React, {useEffect, useRef, useState} from "react";
import MDEditor from '@uiw/react-md-editor';
import { Cell } from "../../state";
import { useActions } from "../../hooks";

interface TextEditorProps {
    cell: Cell;
}

export const TextEditor: React.FC<TextEditorProps> = ( { cell }) => {
    const [editing, setEditing] = useState(false);
    const markdownRef = useRef<HTMLDivElement | null>(null);

    const { updateCell } = useActions();

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (markdownRef.current && event.target && markdownRef.current.contains(event.target as Node)) {
                return;
            }
            setEditing(false);
        }

        document.addEventListener('click', listener, { capture: true})

        return () => {
            document.removeEventListener('click', listener, { capture: true })
        }
    }, [])

    if (editing) {
        return (
            <div ref={markdownRef} className="text-editor">
                <MDEditor value={cell.content} onChange={(v) => updateCell(cell.id, v || '')}/>
            </div>
        )
    }

    return (
        <div className="text-editor card" onClick={() => setEditing(true)} >
            <div className="card-content">
                <MDEditor.Markdown source={cell.content || 'Click to edit'}/>
            </div>
        </div>
    )
}

export default TextEditor;
