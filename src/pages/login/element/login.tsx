import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '@hooks/auth';
import { PATH } from '@utils/constants';
import { Box, Button, Container, FormControl, TextField, Typography } from '@mui/material';

export const Login = () => {
    const { setAuthenticated } = useAuthState<() => void>();
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const handleChange = (event) => setName(event.target.value);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (name.trim() !== '') {
            setAuthenticated(name);
            navigate(PATH.REPORTS);
        } else {
            setError(true);
        }
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Typography component='h1' variant='h5'>
                    Авторизация
                </Typography>
                <FormControl component='form' onSubmit={handleSubmit} fullWidth>
                    <TextField
                        margin='normal'
                        fullWidth
                        id='name'
                        label='Имя'
                        name='name'
                        autoFocus
                        value={name}
                        onChange={handleChange}
                        error={error} />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'>
                        Войти
                    </Button>
                </FormControl>
            </Box>
        </Container>
    );
};