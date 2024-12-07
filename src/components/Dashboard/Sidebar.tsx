import { useDashboardState, useDashboardDispatch } from "../../util/DashboardContext"
import { ArrowBack } from "../Icons"

const Sidebar = () => {
  const { showSideBar } = useDashboardState()
  const dispatch = useDashboardDispatch()
  return (
    <div className={`absolute lg:w-[20%] w-[50%] transition-all duration-300 h-screen bg-gray-300 dark:bg-[#262730] top-0 pt-20 px-3 ${showSideBar ? "left-0" : "left-[-500px]"}`}>
      <button onClick={()=> dispatch({type: "showSideBar"})} className="absolute top-[22px] right-5 text-lg dark:text-[whitesmoke] hover:bg-[whitesmoke] dark:hover:bg-[#262730] p-2 rounded-lg"><ArrowBack /></button>
    </div>
  )
}

export default Sidebar