import { useState } from 'react';

export default function useDarkMode() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        if (theme === 'light') {
            window.localStorage.setItem('theme', 'dark');
            setTheme('dark');
        } else {
            window.localStorage.setItem('theme', 'light');
            setTheme('light');
        }
    };

    return [theme, toggleTheme];
}