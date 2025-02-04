import { useState } from "react";

const MessageInput = ({ onNoteSubmit }) => {
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    onNoteSubmit(note);
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-white p-3 rounded-md shadow-md mt-4">
      {/* Gallery Icon (Image Upload) */}
      <button type="button" className="mr-2 p-2 text-gray-500 hover:text-primary">
        📷
      </button>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Write a note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {/* Start Recording Button */}
      <button type="submit" className="ml-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-purple-700">
        🎙️ Start Recording
      </button>
    </form>
  );
};

export default MessageInput;
