import { ChangeEvent, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
    Button,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Layout } from '../components/layouts';

interface Props {
    theme: string;
}

const ThemeChangerPage = ({ theme }: Props) => {
    const [currentTheme, setCurrentTheme] = useState(theme);

    const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedTheme = event.target.value;
        console.log({ selectedTheme });

        setCurrentTheme(selectedTheme);
        localStorage.setItem('theme', selectedTheme);

        Cookies.set('theme', selectedTheme);
    };

    const onClick = async () => {
        const { data } = await axios.get(`/api/hello`);
        console.log({ data });
    };

    useEffect(() => {
        console.log('LocalStorage: ', localStorage.getItem('theme'));
        console.log('Cookies: ', Cookies.get('theme'));
    }, []);

    return (
        <Layout>
            <Card>
                <CardContent>
                    <FormControl>
                        <FormLabel>Tema</FormLabel>
                        <RadioGroup
                            value={currentTheme}
                            onChange={onThemeChange}
                        >
                            <FormControlLabel
                                value={'light'}
                                control={<Radio />}
                                label='Light'
                            />
                            <FormControlLabel
                                value={'dark'}
                                control={<Radio />}
                                label='Dark'
                            />
                            <FormControlLabel
                                value={'custom'}
                                control={<Radio />}
                                label='Custom'
                            />
                        </RadioGroup>
                    </FormControl>
                    <Button onClick={onClick}>Solicitud</Button>
                </CardContent>
            </Card>
        </Layout>
    );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const { name = 'no_name', theme = 'light' } = req.cookies;

    const validTheme = ['light', 'dark', 'custom'].includes(theme);

    return {
        props: {
            theme: validTheme ? theme : 'dark',
            name,
        },
    };
};

export default ThemeChangerPage;
