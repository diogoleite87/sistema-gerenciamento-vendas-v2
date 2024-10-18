import themeLight from "../../theme/light";
import themeDark from "../../theme/dark";

import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { Theme } from "../../schemas/models";

export type ThemeContextProps = {
    themeName: Theme
    toggleTheme: (theme: Theme) => void
}

type ThemeProviderContextProps = {
    children?: ReactNode
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps)

export function ThemeContextProvider({ children }: ThemeProviderContextProps) {

    const [themeName, setThemeName] = useState<Theme>('light')

    const loadThemeDataStorage = async () => {
        const theme = localStorage.getItem('@Theme')

        if (theme) {
            setThemeName(theme as Theme)
        } else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setThemeName('dark')
                localStorage.setItem('@Theme', 'dark')
            } else {
                setThemeName('light')
                localStorage.setItem('@Theme', 'light')
            }
        }
    }

    const toggleTheme = useCallback((theme: Theme) => {
        setThemeName(theme)
        localStorage.setItem('@Theme', theme)
    }, [])

    const theme = useMemo(() => {
        if (themeName === 'light') {
            return themeLight
        } else {
            return themeDark
        }
    }, [themeName])

    useEffect(() => {
        loadThemeDataStorage()
    }, [])

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}