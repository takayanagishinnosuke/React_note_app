import { useEffect, useState } from 'react';
import './App.css'
import Main from './compornents/Main'
import Sidebar from './compornents/Sidebar'
import uuid from 'react-uuid';

function App() {
  //notesの初期値はローカルストレージに値があればGetしてなければ空になる
  //Json形式をもとに戻すのを挟む
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes") || []));
  const [activeNote,setActiveNote] = useState(false);

  //notesが変更したことを感知したらローカルストレージに保存する処理
  useEffect(()=>{
    //ローカルストレージにノートを保存する
    //保存するときはJsonに。
    localStorage.setItem("notes", JSON.stringify(notes));
  },[notes])

  //リロードした時に一番上のノートが選択されている状態の処理
  useEffect(()=>{
    //もしもnotesが空じゃなかったら…
    if (notes.length){
      setActiveNote(notes[0].id)
    }else{
      //空だったら何もしない
      return
    }
  },[])

  //ノートの追加
  const onAddNote = () =>{
    const newNote = {
      id:  uuid(),
      title: "新しいノート",
      content: "",
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
    console.log(notes);
  };
  //ノートの削除
  const onDeleteNote = (id) =>{
    //notesの１つ１つに対してフィルター
    //idが一致していないものをfiterNotesへ
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes)
  }

  const getActiveNote =()=>{
    //notesの中をひとつひとつ見て、note.idとactivenoteが同一のオブジェクトを返す
    return notes.find((note) => note.id === activeNote)
  }

  //Main.jsで呼び出されるよ
  const onUpdateNote =(updatedNote)=>{
    //修正された新しいノートの配列を返す
    const updatedNoteArray = notes.map((note) =>{
      if(note.id === updatedNote.id){
        return updatedNote;
      }else{
        return note;
      }
    });
    setNotes(updatedNoteArray);
  }

  return (
    <div className="App">
      <Sidebar 
      onAddNote={onAddNote}
      onDeleteNote={onDeleteNote}
      notes={notes}
      setActiveNote={setActiveNote}
      activeNote={activeNote}
      />
      <Main
      activeNote={getActiveNote()}
      onUpdateNote={onUpdateNote}
      />
    </div>
  )
}

export default App
