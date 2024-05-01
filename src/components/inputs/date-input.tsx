import { TextField } from '@mui/material';
import { date } from 'yup';
import { FC } from 'react';

type ButtonProps = {
    label: string,
    name: string,
    value: string | date,
    onChange?: () => void,
    error?: boolean
}

export const DateInput: FC<ButtonProps> = (
    {   label,
        name,
        value,
        onChange,
        error,
        ...data
    }) => (
    <TextField
        type='date'
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        InputLabelProps={{ shrink: true }}
        error={error}
        {...data}
    />
);

export const ReadInput: FC<ButtonProps> = ({ label, name, value, ...data }) => (
    <TextField
        label={label}
        name={name}
        value={value}
        InputLabelProps={{ shrink: true }}
        disabled
        {...data}
    />
);