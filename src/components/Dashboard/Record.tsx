import { Mic } from "../Icons"

const Record = () => {
  return (
    <div className="space-y-2">
        <h3 className="text-sm dark:text-white text-gray-400">Record a voice message</h3>
        <div className="dark:bg-[#262730] bg-gray-300 w-full p-4 rounded-lg flex items-center justify-between">
            <button><Mic className="text-[#7B7B81] text-xl"/></button>

            <span className="text-[#7B7B81] text-lg">00:00</span>
        </div>
    </div>
  )
}

export default Record