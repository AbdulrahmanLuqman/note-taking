import { useState, useEffect } from "react";

const Mode = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialTheme())

    function getInitialTheme() {
        if(localStorage.theme) return localStorage.theme === "dark"

        return window.matchMedia("(prefers-color-scheme === dark)").matches
    }

    useEffect(()=> {
        const root = document.documentElement
        const theme = isDarkMode ? "dark" : "light"

        root.classList.toggle("dark", isDarkMode)

        localStorage.theme = theme
    }, [isDarkMode])

    console.log(isDarkMode)
  return (
    <div className="dark:text-red-600" onClick={()=> setIsDarkMode(true)}>Mode</div>
  )
}

export default Mode