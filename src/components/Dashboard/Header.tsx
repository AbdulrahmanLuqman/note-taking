import Modal from "./Modal"
import SidebarArrow from "./SidebarArrow"


const Header = () => {
  return (
    <div className="flex justify-between items-center py-3 px-8 w-full">
        <SidebarArrow />
        <Modal /> 
    </div>
  )
}

export default Header