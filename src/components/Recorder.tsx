import { mimeType } from "@/constants";
import React, { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

type RecorderProps = {
  uploadAudio: (blob: Blob) => void;
};

const Recorder: React.FC<RecorderProps> = ({ uploadAudio }) => {
  const { pending } = useFormStatus();

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [audioPermission, setAudioPermission] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recordingStatus, setRecordingStatus] = useState("inactive");

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setAudioPermission(true);
        setAudioStream(streamData);
      } catch (error: any) {
        setAudioPermission(false);
        alert(error.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    if (audioStream === null || pending) return;

    setRecordingStatus("recording");

    const media = new MediaRecorder(audioStream, { mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;

      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = async () => {
    if (mediaRecorder.current === null || pending) return;

    setRecordingStatus("inactive");

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = (event) => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      uploadAudio(audioBlob);
      setAudioChunks([]);
    };
  };

  useEffect(() => {
    getMicrophonePermission();
  }, []);

  return (
    <div>
      {!audioPermission && (
        <button onClick={getMicrophonePermission}>Get Microphone</button>
      )}

      {pending && <button>Pending...</button>}

      <button
        onClick={() => {
          if (recordingStatus === "inactive") {
            startRecording();
          } else {
            stopRecording();
          }
        }}
      >
        {audioPermission && recordingStatus === "inactive" && !pending
          ? "🎤 Speak"
          : "Listening..."}
      </button>
    </div>
  );
};
export default Recorder;
