import 'bulmaswatch/superhero/bulmaswatch.min.css'
import './code-editor.css'
import React, { useRef } from "react";
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import parser from 'prettier/parser-babel';
import prettier from 'prettier'
import {editor} from "monaco-editor";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

interface  CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}
export const CodeEditor: React.FC<CodeEditorProps> = ( { initialValue, onChange }) => {
    const editorRef  = useRef<IStandaloneCodeEditor>()
    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue())
        })

        monacoEditor.getModel()?.updateOptions({
            tabSize: 2
        });
    }

    const onFormatClick = () => {
        if (!editorRef?.current) {
            return;
        }

        const unFormatted = editorRef.current.getModel()?.getValue();

        if (!unFormatted) {
            return;
        }

        const formatted = prettier.format(unFormatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/, "");

        editorRef.current.setValue(formatted)
    }

    return (
        <div className="editor-wrapper">
            <button
                onClick={onFormatClick}
                className="button button-format is-primary is-small">
                format
            </button>
            <MonacoEditor
                editorDidMount={onEditorDidMount}
                value={initialValue}
                height="100%"
                language="javascript"
                theme="dark"
                options={{
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true
                }}
            />

        </div>
    )
}
