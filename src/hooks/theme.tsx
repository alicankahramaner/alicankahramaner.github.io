import { useContext } from "react"
import { ThemeContext } from "../context/theme"

export const useTheme = () => {
    const { toggleThemeMode, mode, theme } = useContext(ThemeContext);

    return {
        toggleThemeMode,
        mode,
        theme
    }
}