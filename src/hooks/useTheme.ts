import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('anisearch-theme') as Theme;
            if (stored) return stored;

            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'dark'; // Default to dark for anime aesthetic
    });

    useEffect(() => {
        const root = document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        localStorage.setItem('anisearch-theme', theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }, []);

    const setLightTheme = useCallback(() => setTheme('light'), []);
    const setDarkTheme = useCallback(() => setTheme('dark'), []);

    return {
        theme,
        isDark: theme === 'dark',
        toggleTheme,
        setLightTheme,
        setDarkTheme,
    };
}
