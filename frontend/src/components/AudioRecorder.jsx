import { useState, useEffect } from "react";
import { FaDotCircle, FaRegDotCircle, FaTrash } from "react-icons/fa";

const AudioRecorder = ({ transcript, setTranscript, audio, setAudio }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [stream, setStream] = useState(null);
  const [recognition, setRecognition] = useState(null);
  const [recordingTimeout, setRecordingTimeout] = useState(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.warn("Speech recognition not supported in this browser.");
      return;
    }

    const speechRec = new window.webkitSpeechRecognition();
    speechRec.continuous = false;
    speechRec.interimResults = false;
    speechRec.lang = "en-US";

    speechRec.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
    };

    setRecognition(speechRec);
  }, [setTranscript]);

  const startRecording = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(userStream);
      let chunks = [];

      recorder.ondataavailable = (event) => chunks.push(event.data);
      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudio(audioUrl);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setStream(userStream);
      setIsRecording(true);
      recognition?.start();

      // Set timeout for auto-stop after 1 minute
      const timeoutId = setTimeout(() => stopRecording(), 60000);
      setRecordingTimeout(timeoutId);
    } catch (error) {
      console.error("Error accessing microphone: ", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    recognition?.stop();

    // Clear timeout if user stops manually
    if (recordingTimeout) {
      clearTimeout(recordingTimeout);
      setRecordingTimeout(null);
    }
  };

  const removeRecording = () => {
    setAudio(null);
    setTranscript("");
  };

  return (
    <div className="flex items-center gap-4 mt-4">
      <button
        type="button"
        className="flex w-44 items-center gap-2 p-3 bg-red-500 text-white rounded-xl"
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? <FaRegDotCircle size={20} /> : <FaDotCircle size={20} />}
        <span>{isRecording ? "Stop" : "Start"} Recording</span>
      </button>

      {audio && (
        <div className="flex items-center gap-2">
          <audio controls src={audio} className="ml-4">
            Your browser does not support the audio element.
          </audio>
          <button
            type="button"
            className="p-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
            onClick={removeRecording}
          >
            <FaTrash size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
