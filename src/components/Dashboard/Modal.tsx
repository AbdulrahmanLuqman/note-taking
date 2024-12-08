import { More } from "../Icons"
import ModalMenu from "./ModalMenu"

const Modal = () => {
  return (
    <div className="relative hidden">
        <button className="text-xl dark:text-[whitesmoke]"><More /></button>
        <ModalMenu />
    </div>
  )
}

export default Modal