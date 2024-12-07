import Header from "../components/Dashboard/Header"
import SpeakToDocs from "../components/Dashboard/SpeakToDocs"
import Mode from "../components/Mode"

const Dashboard = () => {
  return (
    <div className="text-4xl flex flex-col gap-10 items-center h-screen w-full bg-[whitesmoke] dark:bg-[#0E1117]">
      <Mode />
      <Header />
      <SpeakToDocs />
    </div>
    
  )
}

export default Dashboard