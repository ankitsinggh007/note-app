import { useEffect, useState } from "react";
import {
  FaRegStar,
  FaStar,
  FaTrash,
  FaEdit,
  FaCopy,
  FaFileImage,
  FaTimes,
} from "react-icons/fa";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { IoIosPlay } from "react-icons/io";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { formatTimestamp } from "../utils/utils";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { FaDownload } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import CapsuleWrapper from "./Capsule";
import NoteContainer from "./NoteContainer";
import ImageGallery from "./ImageContainer";

const Modal = ({ note, onClose, onEdit, onFavorite, onImageUpload }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(false); // For play/pause functionality
  const formattedDate = formatTimestamp(note.date);
  let typeDocument;

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const toggleAudioPlayer = () => {
    setAudioPlayer((prev) => !prev);
  };

  // Function to handle metadata load (to get duration)
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration); // Set the duration in state
    }
  };

  // Function to format duration (seconds to minutes:seconds)
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="fixed w-full  inset-0 bg-black bg-opacity-50 flex justify-center  items-center z-50">
      <div
        className={`bg-white p-6 rounded-lg shadow-lg  w-full ${
          isFullscreen ? "h-full" : "h-[650px]"
        }`}
      >
        {/* Modal Header */}
        <div className="flex justify-between  items-center">
          <div>
            <CapsuleWrapper>
              <button onClick={toggleFullscreen}>
                {isFullscreen ? (
                  <AiOutlineFullscreenExit className="text-gray-600" />
                ) : (
                  <AiOutlineFullscreen className="text-gray-600" />
                )}
              </button>
            </CapsuleWrapper>
          </div>
          <div className="">
            <CapsuleWrapper additionalClasses="m-2">
              <button onClick={() => onFavorite(note.id)}>
                {note.favorite ? (
                  <FaStar className="text-yellow-500" />
                ) : (
                  <FaRegStar />
                )}
              </button>
            </CapsuleWrapper>
            <CapsuleWrapper className="m-2">
              <button>Share</button>
            </CapsuleWrapper>
            <CapsuleWrapper className="m-2">
              <button onClick={onClose}>
                <FaTimes className="text-gray-600" />
              </button>
            </CapsuleWrapper>
          </div>
        </div>

        {/* Note Title */}
        <div className="flex  items-center mt-4">
          <h3 className="font-semibold text-lg">{note.title}</h3>
          <button
            onClick={() => onEdit(note.id)}
            className="text-gray-600 ml-2"
          >
            <FiEdit3 />
          </button>
        </div>

        {/* Date */}
        <span className="text-gray-500 text-xs">{formattedDate}</span>

        {/* tyep=audio or Audio Player */}
        {note.type === "audio" && (
          <div className="my-4">
            <div className="flex items-center w-full bg-gray-100 p-2 rounded-md">
              <audio controls className="custom-audio">
                <source src={note.audio} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
              <a
                href={note.audio}
                download
                className="ml-2 flex items-center justify-between p-2 bg-slate-200 rounded-md text-black text-sm"
              >
                <FaDownload />
                <span className="ml-2"> Download Audio</span>
              </a>
            </div>
          </div>
        )}
        <div>
          {
            // Text Section
            note.type === "text" && (
              <CapsuleWrapper>
                <BsFileEarmarkTextFill className="text-gray-600" />
                <span className="text-gray-600 text-xs">Text</span>
              </CapsuleWrapper>
            )
          }
          {note.type == "audio" && (
            <CapsuleWrapper>
              <IoIosPlay className="text-gray-600" />
              <span className="text-gray-600 text-xs">Transcript</span>
            </CapsuleWrapper>
          )}
        </div>
        {/* Content */}

          <NoteContainer note={note} />

        {/* Images Section */}
         <div className="mt-4">
          <ImageGallery images={note?.images} /*onDelete={handleDelete}*/ />
        </div>
      </div>
    </div>
  );
};
export default Modal;
