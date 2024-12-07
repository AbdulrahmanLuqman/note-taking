import { ArrowForward } from "../Icons"
import { useDashboardDispatch } from "../../util/DashboardContext"
import Sidebar from "./Sidebar"

const SidebarArrow = () => {
  // const { showSideBar } = useDashboardState()
  const dispatch = useDashboardDispatch()
  return (
    <div>
      <button onClick={()=> dispatch({type: "showSideBar"})} className="text-lg dark:text-[whitesmoke] hover:bg-gray-300 dark:hover:bg-[#262730] p-2 rounded-lg"><ArrowForward /></button>
      <Sidebar />
    </div>
  )
}

export default SidebarArrow