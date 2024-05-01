import { FC, useState } from 'react';
import { Button, Divider, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

type ColumnFilterMenuType = {
    column: {
        setFilter: (value: string) => void;
    };
}

export const ColumnFilterMenu: FC<ColumnFilterMenuType> = ({ column }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [filter, setFilterValue] = useState('');
    const { setFilter } = column;

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleMenuItemClick = () => {
        setFilter(filter);
        handleMenuClose();
    };

    return (
        <>
            <IconButton onClick={handleMenuOpen}>
                <FilterAltIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose} >
                <MenuItem>
                    <TextField
                        label='Фильтр'
                        value={filter}
                        onChange={e => setFilterValue(e.target.value)} />
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Button
                        fullWidth
                        type='submit'
                        variant='contained'
                        color='primary'
                        onClick={handleMenuItemClick}>
                        Применить фильтр
                    </Button>
                </MenuItem>
            </Menu>
        </>
    )
};