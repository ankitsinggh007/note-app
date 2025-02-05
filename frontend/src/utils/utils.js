import { useState } from "react";
export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return  date.toLocaleString('en-US', options).replace(',', '');
  }
 
 
  export const useSpeechToTextRecording = () => {
    let mediaRecorder = null;
    let audioChunks = [];
    let stream = null;
  
    const startRecording = async (onStart) => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
  
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };
  
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
          const audioUrl = URL.createObjectURL(audioBlob);
  
          // Use Web Speech API for transcription
          const transcript = await getSpeechToText(audioBlob);
  
          // Callback function to return results
          onStart({ audioUrl, transcript, audioBlob });
  
          // Cleanup
          audioChunks = [];
        };
  
        mediaRecorder.start();
        if (onStart) onStart({ isRecording: true });
      } catch (err) {
        console.error("Error starting recording:", err);
      }
    };
  
    const stopRecording = () => {
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  
    const getSpeechToText = async (audioBlob) => {
      return new Promise((resolve) => {
        const recognition = new (window.SpeechRecognition ||
          window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.interimResults = false;
  
        recognition.onresult = (event) => {
          resolve(event.results[0][0].transcript);
        };
  
        recognition.onerror = () => {
          resolve("Could not recognize speech.");
        };
  
        // Convert blob to audio and play it for recognition
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.onplay = () => recognition.start();
        audio.play();
      });
    };
  
    return { startRecording, stopRecording };
  };
  