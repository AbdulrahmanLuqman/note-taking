import Record from "./Record"
import { useDashboardState } from "../../util/DashboardContext"

const SpeakToDocs = () => {
  const { showSideBar } = useDashboardState()

  return (
    <div className={`w-[90%] space-y-5 transition-all duration-300 ${showSideBar && "lg:w-[50%] justify-end"}`}>
        <h1 className="dark:text-white text-gray-500 font-bold">Speak-To-Docs 🔊📝</h1>
        <Record />
    </div>
  )
}

export default SpeakToDocs