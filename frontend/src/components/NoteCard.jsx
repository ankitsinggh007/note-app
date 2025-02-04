import { FaRegStar, FaStar, FaTrash, FaEdit, FaCopy, FaFileImage } from "react-icons/fa";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { FaEllipsis } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";
import { IoIosPlay } from "react-icons/io";
import { useState } from "react";
import { formatTimestamp } from "../utils/utils";
import Modal from "./Modal";
import CapsuleWrapper from "./Capsule";

const NoteCard = ({ note, onEdit, onDelete, onCopy, onFavorite }) => {
  // Format the date and time
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const formattedDate = formatTimestamp(note.date);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
  <>
  <div 
  onClick={openModal}
  className="bg-white p-4 relative rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
      {/* Top-left Date and Time */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-500 text-xs">{formattedDate}</span>

        {/* Top-right Type Icon */}
        <CapsuleWrapper >
        <div className="flex items-center space-x-1">
          {note.type === "text" ? (
            <>
              <BsFileEarmarkTextFill className="text-gray-600" />
              <span className="text-gray-600 text-xs">Text</span>
            </>
          ) : note.type === "audio" ? (
            <>
              <IoIosPlay className="text-gray-600" />
              <span className="text-gray-600 text-xs">{note.duration}</span>
            </>
          ) : null}
        </div>
        </CapsuleWrapper>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg truncate">{note.title}</h3>

      {/* Spacer */}
      <div className="my-2" />

      {/* Content */}
      <p className="text-gray-600 text-sm line-clamp-2">{note.content}</p>

      

      
      <div className="flex justify-between items-center mt-3 ">
        {/* Images section */}
      {note.images && note.images.length > 0 && (
       <CapsuleWrapper >
         <div className="flex items-center space-x-1 text-gray-500s">
          <FaFileImage className="mr-1" />
          <span className="text-xs">{note.images.length} Image{note.images.length > 1 ? "s" : ""}</span>
        </div>
       </CapsuleWrapper>
      )}

{/* Actions   */}
<div className="flex items-center space-x-2">
      <button
       onClick={() => { onCopy(note.id); setIsMenuOpen(false); }}
       className="p-2 hover:bg-gray-200 cursor-pointer"
     >
      <MdContentCopy className="text-gray-500"  />

      </button>
        <button onClick={toggleMenu} className="p-2 hover:bg-gray-200 cursor-pointer">
          <FaEllipsis className="text-gray-500" />
        </button>
         {/* Dropdown Menu */}
         {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 shadow-md rounded-md z-10">
            <ul className="text-sm">
              <li onClick={()=>{onFavorite(note.id); setIsMenuOpen(false)}}
                 className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  Favourite
              </li>
              <li
                onClick={() => { onEdit(note.id); setIsMenuOpen(false); }}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                Edit
              </li>
              <li
                onClick={() => { onDelete(note.id); setIsMenuOpen(false); }}
                className="p-2 hover:bg-gray-200 cursor-pointer text-red-500"
              >
                Delete
              </li>
              <li
                onClick={() => { onCopy(note.id); setIsMenuOpen(false); }}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                Copy
              </li>
            </ul>
          </div>
        )}
        </div>  
        </div>
    </div>
    {/* Modal */}
    {isModalOpen && (
      <Modal
        note={note}
        onClose={closeModal}
        onEdit={onEdit}
        onFavorite={onFavorite}
        // onImageUpload={onImageUpload}
      />
    )}
    </>
  );
};

export default NoteCard;
