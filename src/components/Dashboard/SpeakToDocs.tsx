import Record from "./Record"
import Logo from "/logo.png"
import { useDashboardState } from "../../util/DashboardContext"

const SpeakToDocs = () => {
  const { showSideBar } = useDashboardState()

  return (
    <div className={`w-[90%] space-y-5 transition-all duration-300 ${showSideBar && "lg:w-[50%] justify-end"}`}>
        <h1 className="flex items-center"><img src={Logo} className="w-10 h-10" alt="Logo" /> <span>🔊</span></h1>
        <Record />
    </div>
  )
}

export default SpeakToDocs