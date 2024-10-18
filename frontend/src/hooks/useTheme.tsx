import { useContext } from 'react';

import { ThemeContext, ThemeContextProps } from '../contexts/ThemeContext';

export function useTheme(): ThemeContextProps {
    const context = useContext(ThemeContext);

    return context;
}