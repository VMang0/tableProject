import { createContext, FC, JSX, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

type AlertProviderPropsType = {
    children: JSX.Element
}

const AlertContext = createContext({});

export const AlertProvider: FC<AlertProviderPropsType> = ({ children }) => {
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertSeverity, setAlertSeverity] = useState<string>('success');

    const showAlert = (message: string, severity = 'success') => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertOpen(true);
    };

    const hideAlert = () => {
        setAlertOpen(false);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <Snackbar
                open={alertOpen}
                autoHideDuration={3500}
                onClose={hideAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={hideAlert} severity={alertSeverity}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const { showAlert } = useContext(AlertContext);
    return { showAlert };
};
