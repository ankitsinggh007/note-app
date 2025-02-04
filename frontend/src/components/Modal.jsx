import { useState } from "react";
import { FaRegStar, FaStar, FaTrash, FaEdit, FaCopy, FaFileImage, FaTimes } from "react-icons/fa";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { IoIosPlay } from "react-icons/io";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { formatTimestamp } from "../utils/utils";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import CapsuleWrapper from "./Capsule";  

const Modal = ({ note, onClose, onEdit, onFavorite, onImageUpload }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(false); // For play/pause functionality
  const formattedDate = formatTimestamp(note.date);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const toggleAudioPlayer = () => {
    setAudioPlayer((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full ${isFullscreen ? "h-full" : "max-h-[80%]"}`}>
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <CapsuleWrapper >
          <button onClick={toggleFullscreen}>
            {isFullscreen ? (
              <AiOutlineFullscreenExit className="text-gray-600" />
            ) : (
              <AiOutlineFullscreen className="text-gray-600" />
            )}
          </button>
          </CapsuleWrapper>
          <CapsuleWrapper >
          <button onClick={() => onFavorite(note.id)}>
          
  {note.favorite ? (
    <FaStar className="text-yellow-500" />
  ) : (
    <FaRegStar />
  )}

          </button>
          </CapsuleWrapper>
         <CapsuleWrapper>
         <button onClick={onClose}>
            <FaTimes className="text-gray-600" />
          </button>
         </CapsuleWrapper>
        </div>

        {/* Note Title */}
        <div className="flex justify-between items-center mt-4">
          <h3 className="font-semibold text-lg">{note.title}</h3>
          <button onClick={() => onEdit(note.id)} className="text-gray-600">
            <FaEdit />
          </button>
        </div>

        {/* Date */}
        <span className="text-gray-500 text-xs">{formattedDate}</span>

        {/* Content or Audio Player */}
        {note.type === "audio" ? (
          <div className="mt-4">
            <audio controls>
              <source src={note.audioUrl} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
            <div className="flex justify-between items-center mt-2">
              <button onClick={() => setAudioPlayer(!audioPlayer)}>
                {audioPlayer ? "Pause" : "Play"}
              </button>
              <button onClick={() => window.location.href = note.audioUrl} className="text-gray-600">
                Download
              </button>
            </div>
            <div className="flex items-center mt-4">
              <FaCopy className="mr-2" />
              <button onClick={() => navigator.clipboard.writeText(note.audioUrl)}>Copy URL</button>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-gray-600">{note.content}</p>
          </div>
        )}

        {/* Images Section */}
        <div className="mt-4">
          {note.images && note.images.length > 0 && (
            <div className="flex space-x-2">
              {note.images.map((image, index) => (
                <img key={index} src={image} alt={`Note image ${index + 1}`} className="w-20 h-20 object-cover" />
              ))}
            </div>
          )}
          <button
            onClick={onImageUpload}
            className="mt-2 text-blue-500 underline"
          >
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;