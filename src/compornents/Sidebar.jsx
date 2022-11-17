import React from 'react'
import "./Sidebar.css"

function Sidebar({ onAddNote, onDeleteNote ,notes, setActiveNote,activeNote }) {

  //日付が新しい順でソートをかける
  const sotedNotes = notes.sort((a,b) => b.modDate - a.modDate);

  return (
    <div className='app-sidebar'>
      <div className='app-sidebar-header'>
        <h1>ノート</h1>
        <button onClick={onAddNote}>追加</button>
      </div>

      <div className="app-seidebar-notes">
        {sotedNotes.map((note) =>(
      // このdivがクリックされた時に note.idとactiveNoteが一致ならactiveというクラス名を追加
          <div 
            className={`app-sidebar-note ${note.id === activeNote && "active"}`}
            key={note.id}
            onClick={() => setActiveNote(note.id)}
            >
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
              {/* 引数を取ってonClickイベントで発火させるにはアロー関数で */}
              <button onClick={()=> onDeleteNote(note.id)}>削除</button>
            </div>
            <p>{note.content}</p>
            {/* 日付の取得（日本時間 YY:MM:DD:hh:mm:ss) */}
            <small>{new Date(note.modDate).toLocaleDateString("ja-JP",{
              hour:"2-digit",
              minute:"2-digit",
              second:"2-digit"
              })}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar