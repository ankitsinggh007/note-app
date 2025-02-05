import { useState, useEffect } from "react";
import { FaDotCircle, FaRegDotCircle } from "react-icons/fa";
import AudioRecorder from "./AudioRecorder";
import ImageGallery from "./ImageContainer";
const MessageModal = ({ onClose, onSubmit, setIsEdited }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image,setImage]=useState([]);
  const [audio, setAudio] = useState("");
  const [transcript, setTranscript] = useState("");
  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }
    onSubmit({ title, content });
    setIsEdited(false);
    onClose();
  };

  return (
    <div
      className="absolute inset-0  flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[90%] max-w-3xl p-6 rounded-lg shadow-lg flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
      

        {/* Title */}
        <input
          type="text"
          placeholder="Title (required)"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setIsEdited(true);
          }}
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />

        {/* Textarea with Recording Button */}
        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setIsEdited(true);
          }}
          className="w-full p-2 border border-gray-300 rounded-md resize-none min-h-[150px]"
        ></textarea>

        {/* {Recording Button with Audio Player } */}
        <div className="border">
        {/* <button
          type="button"
          className=" top-2 right-3 flex w-44 my-2 items-center gap-2 p-3 bg-red-500 text-white rounded-xl"
          onClick={isRecording ? stopRecording : startRecording}
        > */}
           <AudioRecorder setAudio={setAudio} setTranscript={setTranscript} audio={audio} transcript={transcript} />
          {/* {audioUrl ? (
            <FaRegDotCircle size={20} />
          ) : (
            <FaDotCircle size={20} />
          )}
          <span>{isRecording ? "Stop" : "Start"} Recording</span>
        </button> */}
         {/* Audio Player for Recorded Audio */}
         {/* {audioUrl && (
          <div className="mb-2">
            <audio controls src={audioUrl} className="w-full" />
          </div>
        )} */}
        </div>
       
        {/* Transcript Field */}
        <textarea
          placeholder="Transcript (editable)"
          value={transcript}
          onChange={(e) => {
            setContent(e.target.value);
            setIsEdited(true);
          }}
          className="w-full p-2 border border-gray-300 rounded-md resize-none min-h-[100px] mb-4"
        ></textarea>

        {/* Photo Upload Section */}
        <div className="mb-2">
        <ImageGallery images={image} /*onDelete={handleDelete}*/ />

        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Discard
          </button>
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
