import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { customTheme, darkTheme, lightTheme } from '../themes';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

interface Props extends AppProps {
    theme: string;
}

function MyApp({ Component, pageProps, theme = 'dark' }: Props) {
    const [currentTheme, setCurrentTheme] = useState(lightTheme);

    useEffect(() => {
        const cookieTheme = Cookies.get('theme') || 'light';
        const selectedTheme: Theme =
            cookieTheme === 'dark'
                ? darkTheme
                : cookieTheme === 'light'
                ? lightTheme
                : customTheme;

        setCurrentTheme(selectedTheme);
    }, []);

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//     const { theme } = appContext.ctx.req?.headers.cookie || 'light';

//     return {
//         theme: 'dark',
//     };
// };

export default MyApp;
