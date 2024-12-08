import Record from "./Record";
import { useDashboardState } from "../../util/DashboardContext";

const SpeakToDocs = () => {
  const { showSideBar } = useDashboardState();

  return (
    <section
      className={`w-[90%] space-y-5 transition-all duration-300 ${
        showSideBar && "lg:w-[50%] justify-end"
      }`}
    >
      <div className="flex items-center gap-2">
        <img src="./logo.png" alt="logo" className="w-[60px] h-[50px]" />
        <h1 className="dark:text-white text-gray-500 font-bold">noter</h1>
      </div>
      <Record />
    </section>
  );
};

export default SpeakToDocs;
