import React from 'react'
import "./Main.css"
//マークダウン記法をとりいれるライブラリ
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';


function Main({activeNote,onUpdateNote}) {
  //onChangeで発火するonEditNote関数
  // titleかcontentsを受け取る, e.target.valueを受け取る
  const onEditNote =(key,value)=>{
    //app.jsのonUpdateNoteに{ ... 現在のactiveNote(id)と動的keyとvalueを渡す}
    onUpdateNote({
      ...activeNote,
      [key]: value,
      modDate: Date.now(),
    });
  }

  if(!activeNote){
    return <div className='no-active-note'>ノートが選択されていません</div>
  }

  return (
    <div className='app-main'>
      <div className="app-main-note-edit">
        <input type="text" 
        id='title'
        value={activeNote.title} 
        onChange={(e)=> onEditNote("title",e.target.value)}
        />
        <textarea id="content"
        placeholder='ノート内容を記入' 
        value={activeNote.content}
        onChange={(e)=> onEditNote("content",e.target.value)}
        ></textarea>
      </div>
      <div className="app-main-note-preview">
        <h1 className='prevew-title'>{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}


export default Main