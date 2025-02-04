import { useState } from "react";
import { FaRegCopy, FaTimes, FaSave } from "react-icons/fa";
import NoteModal from "./NoteModal"; // Separate modal component

const NoteContainer = ({ note }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(note.content);
    alert("Copied!");
  };

  return (
    <>
      {/* Note Preview Container */}
      <div className="w-full   border border-gray-300 p-4 mt-2 rounded-md relative bg-white shadow-md">
        {/* Title (Top-Left) */}
        <h3 className="font-bold">{note.type=="text"?note.type.toUpperCase():'Transcript'}</h3>

        {/* Copy Button (Top-Right) */}
        <button className="absolute flex items-center top-2 right-2 text-gray-500 p-2 rounded-full bg-slate-100 hover:bg-slate-200" onClick={handleCopy}>
          <FaRegCopy />
          <span className="ml-2">Copy</span>
        </button>

        {/* Content / Transcript (Truncated) */}
        <p className="text-gray-700 truncate">{note.content}</p>

        {/* Read More */}
        <button className="text-gray-500 mt-1 underline hover:text-gray-700" onClick={() => setIsModalOpen(true)}>
          Read more
        </button>
      </div>

      {/* Modal Component */}
      {isModalOpen && <NoteModal note={note} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default NoteContainer;
