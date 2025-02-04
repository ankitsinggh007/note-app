import TopBar from "./TopBar";
import NotesList from "./NotesList";
import MessageInput from "./MessageInput";
import MainLayout from "./MainLayout";
import { useState } from "react";

const HomeComponent = () => {
  // Dummy Notes Data
  const [notes, setNotes] = useState([
    { id: 1, title: "First Note", content: "This is a sample note.", favorite: false,date :1675110360000,type:'text' },
    { id: 2, title: "Second Note", content: "Another note content.", favorite: true ,date :167511040000,type:'audio', duration:'50s' ,images:[1,2 ]},
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
