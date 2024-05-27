"use client";
import { useEffect, useRef, useState } from "react";
import { LoaderCircleIcon, MicIcon, MicOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface AudioRecorderProps {
  date: string;
}

export function AudioRecorder({ date }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const router = useRouter();

  const handleStartRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error(
        "Media Devices API or getUserMedia not supported in this browser."
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        setIsLoading(true);
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });

        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.wav");
        formData.append("date", date);
        try {
          const response = await fetch("/api/speech", {
            method: "POST",
            body: formData,
            cache: "no-cache"
          });
          if (response.ok) {
            const { data } = await response.json();
            console.log(data.transcription);
            console.log(data.answer);
          } else {
            console.error("Failed to save the audio file");
          }
        } catch (error) {
          console.error("Error while sending the audio file:", error);
        } finally {
          setIsLoading(false);
          router.refresh();
        }
        audioChunks.current = [];
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing the microphone:", error);
    }
  };

  const handleStopRecording = async () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      handleStartRecording();
    } else {
      handleStopRecording();
    }
  };

  useEffect(() => {
    return () => {
      if (mediaRecorder.current) {
        mediaRecorder.current.stop();
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div className="mb-8 flex w-full items-center">
        {!isLoading && (
          <>
            {isRecording ? (
              <button
                onClick={handleToggleRecording}
                className="m-auto mt-10 flex h-20 w-20 items-center justify-center rounded-full bg-red-400 hover:bg-red-500 focus:outline-none"
              >
                <MicOffIcon className="h-12 w-12 text-white" />
              </button>
            ) : (
              <button
                onClick={handleToggleRecording}
                className="m-auto mt-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary focus:outline-none"
              >
                <MicIcon className="h-12 w-12 text-white" />
              </button>
            )}
          </>
        )}
        {isLoading && <LoaderCircleIcon className="h-12 w-12 animate-spin" />}
      </div>
    </div>
  );
}
