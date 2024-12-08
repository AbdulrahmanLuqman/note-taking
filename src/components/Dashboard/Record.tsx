import * as React from "react";
import { Mic, Stop } from "../Icons";
import { useAudioRecorder } from "react-audio-voice-recorder";

const Record: React.FC = () => {
  const {
    startRecording,
    stopRecording,
    recordingBlob,
    recordingTime,
  } = useAudioRecorder();
  const [audioURL, setAudioURL] = React.useState<string | null>(null);
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
  const [activeTool, setActiveTool] = React.useState(true);
  const handleMic = () => {
    startRecording();
    setActiveTool(false);
  };
  const handleStop = () => {
    stopRecording();
    setActiveTool(true);
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
      {audioURL && <audio src={audioURL} controls />}
      
    </div>
  );
};

export default Record;