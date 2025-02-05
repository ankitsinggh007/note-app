import { useState, useEffect } from "react";
import { FaDotCircle, FaRegDotCircle } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";
import { LuPenLine } from "react-icons/lu";
import MessageModal from "./MessageModal";

const MessageInput = ({ onNoteSubmit, openModal,closeModal } ) => {
  const [note, setNote] = useState("");
  console.log(openModal,"uu")

 

  return (
    <>
      <div 
        onClick={openModal}
        className=" flex items-center bg-white p-3 rounded-full border shadow-md cursor-pointer mt-4"
      >
        {/* Left Icons */}
        <button type="button" className="absolute left-3 text-gray-500">
          <MdInsertPhoto size={25} />
        </button>
        <button type="button" className="absolute left-12 text-gray-500">
          <LuPenLine size={25} />
        </button>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Write a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 pl-20 pr-14 rounded-full focus:outline-none"
        />

        {/* Recording Button */}
        <button
          type="button"
          className="absolute flex items-center gap-2 px-3 py-1 right-3 bg-red-500 text-white rounded-3xl"
        >
           <FaDotCircle size={20} />
          <span>Start Recording</span>
        </button>
      </div>

      {/* {isModalOpen && <MessageModal onClose={closeModal} onSubmit={onNoteSubmit} />} */}
    </>
  );
};

export default MessageInput;
