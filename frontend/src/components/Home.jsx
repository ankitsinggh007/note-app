import TopBar from "./TopBar";
import NotesList from "./NotesList";
import MessageInput from "./MessageInput";
import MainLayout from "./MainLayout";
import { useState } from "react";
import audio1 from '../assets/bgm.mp3'

const HomeComponent = () => {
  // Dummy Notes Data
  const [notes, setNotes] = useState([
    { id: 1, title: "First Note", content: "This is a sample note.", favorite: false,date :1675110360000,type:'text',images:[] },
    { id: 2, title: "Second Note", audio:audio1 ,content: "Another note content.", favorite: true ,date :167511040000,type:'audio', duration:'50s' ,images:[
      "https://images.pexels.com/photos/29861006/pexels-photo-29861006/free-photo-of-majestic-mountain-peaks-shrouded-in-clouds.jpeg",
      "https://images.pexels.com/photos/30375942/pexels-photo-30375942/free-photo-of-vintage-street-lamp-against-modern-architecture.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/12904144/pexels-photo-12904144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
     ]},
  ]);

  // Edit Note
  const handleEdit = (id, updatedNote) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, ...updatedNote } : note)));
  };

  // Delete Note
  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Copy Note
  const handleCopy = (id) => {
    const noteToCopy = notes.find((note) => note.id === id);
    if (noteToCopy) {
      navigator.clipboard.writeText(noteToCopy.content);
      alert("Note copied!");
    }
  };

  // Toggle Favorite
  const handleFavorite = (id) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, favorite: !note.favorite } : note)));
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 flex-shrink-0">
          <TopBar />
        </div>

        {/* Notes List */}
        <div className="flex-grow overflow-auto p-2">
          <NotesList
            notes={notes}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCopy={handleCopy}
            onFavorite={handleFavorite}
          />
        </div>

        {/* Input Bar */}
        <div className="h-16 flex-shrink-0">
          <MessageInput />
        </div>
      </div>
    </MainLayout>
  );
};

export default HomeComponent;
