import { useState } from "react";
import { FaTimes, FaSave } from "react-icons/fa";

const NoteModal = ({ note, onClose }) => {
  const [editedContent, setEditedContent] = useState(note.content);
  const [isEdited, setIsEdited] = useState(false);

  const handleEdit = (e) => {
    setEditedContent(e.target.value);
    setIsEdited(e.target.value !== note.content);
  };

  return (
    <div className="fixed inset-0 flex z-20 items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-lg relative">
        {/* Close Button (Top-Left) */}
        <button className="absolute top-2 left-2 text-gray-500 p-2 rounded-full hover:bg-gray-200" onClick={onClose}>
          <FaTimes />
        </button>

        {/* Save Button (Top-Right) */}
        <button
          className={`absolute top-2 right-2 w-20 p-2 rounded-3xl transition ${
            isEdited ? "bg-purple-700 text-white hover:bg-purple-600" : "bg-gray-300 text-gray-600 cursor-default"
          }`}
        >
          save
        </button>

        {/* Title (Extreme Left) */}
        <h3 className="font-bold mt-6">{note.type=="text"?"Text":"Transcript"}</h3>

        {/* Editable Content */}
        <textarea
          className="w-full mt-2 p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-purple-500"
          value={editedContent}
          onChange={handleEdit}
          rows={4}
        />
      </div>
    </div>
  );
};

export default NoteModal;
