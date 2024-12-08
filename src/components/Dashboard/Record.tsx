import * as React from "react";
import { Mic, Stop } from "../Icons";
import { useAudioRecorder } from "react-audio-voice-recorder";

// Extend the Window interface to include SpeechRecognition and webkitSpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof webkitSpeechRecognition;
  }
}

const Record: React.FC = () => {
  const { startRecording, stopRecording, recordingBlob, recordingTime } =
    useAudioRecorder();
  const [audioURL, setAudioURL] = React.useState<string | null>(null);
  const [transcription, setTranscription] = React.useState<string | null>(null);
  const [activeTool, setActiveTool] = React.useState(true);
  const [recognition, setRecognition] =
    React.useState<SpeechRecognition | null>(null);

  // Web Speech API setup
  React.useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const recognitionInstance = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognitionInstance.continuous = true; // Keep listening after each phrase
      recognitionInstance.interimResults = true; // Show partial results as the user speaks
      recognitionInstance.lang = "en-US"; // Set language (you can change this to your preferred language)

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const result = event.results[event.resultIndex];
        const transcript = result[0].transcript;
        setTranscription(transcript); // Update transcription
      };

      recognitionInstance.onerror = (event: Event) => {
        console.error("Speech Recognition Error", event);
      };

      setRecognition(recognitionInstance); // Store the recognition instance
    } else {
      console.error("SpeechRecognition API is not supported in this browser");
    }
  }, []);

  React.useEffect(() => {
    if (recordingBlob) {
      const url = URL.createObjectURL(recordingBlob);
      setAudioURL(url);
    }
  }, [recordingBlob]);

  const formattedTime = `${Math.floor(recordingTime / 60)}:${(
    recordingTime % 60
  )
    .toString()
    .padStart(2, "0")}`;

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
      <div>{audioURL && <audio src={audioURL} controls />}</div>
      {transcription && (
        <main className="w-[90%] bg-white rounded-md p-3 border-t-[30px] border-black relative">
          <p
            className="absolute top-[-27px] right-2 textwhite text-sm bg-gray-100 p-1 cursor-pointer"
            onClick={() => navigator.clipboard.writeText(transcription)}
          >
            Copy text
          </p>
          <textarea
            name=""
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            id=""
            className="focus:outline-none resize-none w-full"
          />
        </main>
      )}

      {/* Download button */}
      {transcription && (
        <button
          className="mt-4 bg-[#B26217] text-white py-2 px-4 rounded text-sm"
          onClick={downloadTranscript}
        >
          Download Transcript
        </button>
      )}
    </div>
  );
};

export default Record;
