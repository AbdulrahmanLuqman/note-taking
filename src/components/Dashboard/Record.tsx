import * as React from "react";
import { Mic, Stop } from "../Icons";
import { useAudioRecorder } from "react-audio-voice-recorder";

// Custom declaration to tell TypeScript about SpeechRecognition and webkitSpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof webkitSpeechRecognition;
  }
}

const Record: React.FC = () => {
  const { startRecording, stopRecording, recordingTime } = useAudioRecorder();
  const [transcription, setTranscription] = React.useState<string>(""); // Use an empty string initially
  const [activeTool, setActiveTool] = React.useState(true);
  const [recognition, setRecognition] = React.useState<SpeechRecognition | null>(null);

  // Web Speech API setup (only for the client side)
  React.useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const recognitionInstance = new (
        window.SpeechRecognition || window.webkitSpeechRecognition
      )();
      recognitionInstance.continuous = true; // Keep listening after each phrase
      recognitionInstance.interimResults = true; // Show partial results as the user speaks
      recognitionInstance.lang = "en-US"; // Set language

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = "";
        // Loop through all results to get final and interim transcripts
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          // Only add the transcript if it's final (to avoid repeating interim results)
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          }
        }
        setTranscription((prevTranscript) => prevTranscript + finalTranscript); // Append new transcript
      };

      recognitionInstance.onerror = (event: Event) => {
        console.error("Speech Recognition Error", event);
      };

      setRecognition(recognitionInstance); // Store the recognition instance
    } else {
      console.error("SpeechRecognition API is not supported in this browser");
    }
  }, []);

  const formattedTime = `${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, "0")}`;

  // Start and stop speech recognition
  const handleMic = () => {
    if (recognition) {
      recognition.start(); // Start recognizing speech
    }
    startRecording();
    setActiveTool(false);
  };

  const handleStop = () => {
    if (recognition) {
      recognition.stop(); // Stop recognition
    }
    stopRecording();
    setActiveTool(true);
  };

  // Function to download the transcription as a .txt file
  const downloadTranscript = () => {
    if (transcription) {
      const blob = new Blob([transcription], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "transcript.txt"; // Name of the file to download
      link.click(); // Trigger the download
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm dark:text-white text-gray-400">
        Record a voice message
      </h3>
      <div className="dark:bg-[#262730] bg-gray-300 w-full p-4 rounded-lg flex items-center justify-between">
        <div>
          <button>
            <Mic
              className={`text-[#7B7B81] text-xl ${!activeTool && "hidden"}`}
              onClick={handleMic}
            />
          </button>
          <button>
            <Stop
              className={`text-[#7B7B81] ${activeTool && "hidden"}`}
              onClick={handleStop}
            />
          </button>
        </div>
        <span className="text-[#7B7B81] text-lg">{formattedTime}</span>
      </div>

      {transcription && (
        <main className="w-[90%] bg-white rounded-md p-3 border-t-[30px] border-black relative">
          <p
            className="absolute top-[-27px] right-2 text-black cursor-pointer text-sm bg-gray-100 p-1"
            onClick={() => navigator.clipboard.writeText(transcription)}
          >
            Copy text
          </p>
          <textarea
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            className="focus:outline-none resize-none w-full text-[18px]"
          />
        </main>
      )}

      {/* Download button */}
      {transcription && (
        <button
          className="mt-4 bg-[#9B500A] text-white rounded py-2 px-4 text-sm"
          onClick={downloadTranscript}
        >
          Download Transcript
        </button>
      )}
    </div>
  );
};

export default Record;