import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import { Routes_ } from '@routes/element';

export const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes_ />
            </BrowserRouter>
        </Provider>
    );
};