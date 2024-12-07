import { useState, useEffect } from "react";
import { Sun, Moon } from "./Icons";

const Mode = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialTheme())

    function getInitialTheme() {
        if(localStorage.theme) return localStorage.theme === "dark"

        return window.matchMedia("(prefers-color-scheme: dark)").matches
    }

    useEffect(()=> {
        const root = document.documentElement
        const theme = isDarkMode ? "dark" : "light"

        root.classList.toggle("dark", isDarkMode)

        localStorage.theme = theme
    }, [isDarkMode])

    console.log(isDarkMode)
  return (
    <div onClick={()=> setIsDarkMode(!isDarkMode)} className="shadow-lg border border-black dark:border-white w-8 h-16 px-2 py-1 rounded-3xl space-x-2 absolute right-2 top-0 bottom-0 my-auto cursor-pointer overflow-hidden">
      <button className={`w-fit absolute left-0 right-0 mx-auto transition-all duration-100 ${!isDarkMode ? "top-2" : "top-[-100px]"}`}><Sun className="text-lg" /></button>
      <button className={`w-fit absolute left-0 right-0 mx-auto transition-all duration-100 text-white ${isDarkMode ? "bottom-2" : "bottom-[-100px]"}`}><Moon className="text-lg" /></button>
    </div>
  )
}

export default Mode