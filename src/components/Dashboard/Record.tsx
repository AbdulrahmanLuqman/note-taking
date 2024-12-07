import { Mic } from "../Icons"

import UseSpeechRecognition from "../UseSpeechRecognition";

const Record = () => {
    const { text, isListening, startListening, stopListening, error } = UseSpeechRecognition();
      
  return (
    <div className="space-y-2">
        <h3 className="text-sm dark:text-white text-gray-400">Record a voice message</h3>
        <div className="dark:bg-[#262730] bg-gray-300 w-full p-4 rounded-lg flex items-center justify-between">
            <button onClick={isListening ? stopListening : startListening}><Mic className="text-[#7B7B81] text-xl"/></button>
            {error && <p className="text-red-500 text-lg">{error}</p>}

            <span className="text-[#7B7B81] text-lg">00:00</span>
        </div>

        <div className="mt-4 rounded p-2 h-40 overflow-y-auto bg-[#262730]">
            <p className="font-mono text-[#7B7B81]">{text || "Start speaking to see transcription."}</p>
        </div>
    </div>
  )
}

export default Record