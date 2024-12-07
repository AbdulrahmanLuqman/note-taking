import { Mic } from "../Icons"
import { useState } from "react"
import { useReactMediaRecorder } from "react-media-recorder"
import axios from "axios"

const Record = () => {
    const [transcription, setTranscription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [docUrl, setDocUrl] = useState<string | null>(null); 
  
    // Use the react-media-recorder hook to record audio
    const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
      audio: true,
    });
  
    const handleStopRecording = async (blobUrl: string) => {
        console.log("Recording stopped. Blob URL:", blobUrl);
        setLoading(true);
        try {
          const blob = await fetch(blobUrl).then((r) => r.blob());
    
          const formData = new FormData();
          formData.append('file', blob, 'audio.wav');  // Use .wav for better compatibility with most APIs
    
          // Debugging: Log the FormData
          console.log("FormData being sent:", formData);
    
          const response = await axios.post(
            'https://speech-to-text-ai-6l1c.onrender.com/api/speech-to-text/',
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            }
          );
    
          // Debugging API response
          console.log("API Response:", response.data);
    
          if (response.data.text) {
            setTranscription(response.data.text);
            setDocUrl(response.data.file); // Set the URL for the DOC file
          } else {
            setError('No transcription found. Please try again.');
          }
        } catch (err) {
          setError('Failed to process the speech. Please try again.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };    
      
  return (
    <div className="space-y-2">
        <h3 className="text-sm dark:text-white text-gray-400">Record a voice message</h3>
        <div className="dark:bg-[#262730] bg-gray-300 w-full p-4 rounded-lg flex items-center justify-between">
            <button onClick={startRecording}><Mic className="text-[#7B7B81] text-xl"/></button>

            <span className="text-[#7B7B81] text-lg">00:00</span>
        </div>

        <div className="mt-4">
        <audio src={mediaBlobUrl} controls />
      </div>

        <button
        onClick={() => {
          stopRecording();
          if (mediaBlobUrl) handleStopRecording(mediaBlobUrl);
        }}
        className="ml-2 px-4 py-2 rounded bg-red-500 text-white"
      >
        Stop Recording
      </button>

        <div className="mt-4 border p-2 h-40 overflow-y-auto bg-gray-100">
        {loading ? (
          <p>Processing...</p>
        ) : (
          <p className="font-mono">
            {transcription || "Speak to see the transcription here."}
          </p>
        )}
      </div>
    </div>
  )
}

export default Record