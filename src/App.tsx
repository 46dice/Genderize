import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Result from './components/Result';

function App() {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [textResult, setTextResult] = useState(``);

    const baseUrl = `https://api.genderize.io?name=`;

    async function getGender(url: string, name: string) {
        const response = await fetch(`${url}${name}`);
        const data = await response.json();
        return data;
    }

    async function handleUseEffect() {
        setTextResult('Loading..');
        const data = await getGender(baseUrl, name);

        let newGender = data.gender;
        if (!newGender) {
            newGender = `undefined`;
        }

        setGender(newGender);
        setTextResult((prev) => (prev = `${name} is ${gender}`));
        console.log(newGender);
    }

    useEffect(() => {
        if (name) handleUseEffect();
    }, [name, gender]);

    return (
        <>
            <Dialog
                open
                sx={{
                    '.MuiDialog-container': {
                        alignItems: 'center',
                    },
                    '.MuiPaper-root': {
                        width: '500px',
                        height: '300px',
                        justifyContent: 'center',
                    },
                }}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const inputName = event.currentTarget.name.value;
                        setName(inputName);
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        padding: '0px 10px',
                    }}
                    textAlign={'center'}
                >
                    Genderize
                </DialogTitle>
                <Box>
                    <DialogContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <DialogContentText mb={5}> Приложение для определения пола по имени</DialogContentText>
                        <Box display={'flex'} gap={5} mb={2}>
                            <TextField autoFocus required variant='standard' id='name' type='text' placeholder='Введите имя'></TextField>
                            <Button type='submit' size='small' variant='outlined'>
                                Проверить пол
                            </Button>
                        </Box>
                        {gender && <Result text={textResult}></Result>}
                    </DialogContent>
                </Box>
            </Dialog>
        </>
    );
}

export default App;
