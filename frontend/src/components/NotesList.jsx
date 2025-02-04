import NoteCard from "./NoteCard";

const NotesList = ({ notes, onEdit, onDelete, onCopy, onFavorite }) => {
  if (notes.length === 0) {
    return <p className="text-gray-500 text-center mt-4">No notes found.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-3">
      {notes.map((note) => (
        <NoteCard 
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onCopy={onCopy}
          onFavorite={onFavorite}
        />
      ))}
    </div>
  );
};

export default NotesList;
