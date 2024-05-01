import { FC, memo, useState } from 'react';
import { Grid, IconButton, Menu, MenuItem, Switch } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { AllSwitch } from '@components/column-hidden';

type ColumnsType = {
    id: number,
    getToggleHiddenProps: () => {any},
    Header: string
}

type ColumnHiddenButtonPropsType = {
    getToggleProps: () => void;
    columns: Array<ColumnsType>;
};

export const ColumnHiddenButton: FC<ColumnHiddenButtonPropsType> = memo(({ getToggleProps, columns }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = !!anchorEl;

    const handleClick = (e: MouseEvent) => setAnchorEl(e.currentTarget as HTMLElement);
    const handleClose = () => setAnchorEl(null);

    return (
        <Grid
            alignItems='center'
            justifyContent='flex-end'
            container>
            <IconButton
                id='hidden-button'
                aria-controls={open ? 'hidden-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handleClick}>
                <SettingsIcon />
            </IconButton>
            <Menu
                id='hidden-menu'
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>
                <MenuItem>
                    <AllSwitch {...getToggleProps()} />
                    Переключить все
                </MenuItem>
                {columns.slice(0, -1).map((column) => (
                    <MenuItem key={column.id}>
                        <Switch {...column.getToggleHiddenProps()}  />
                        { column.Header }
                    </MenuItem>
                ))}
            </Menu>
        </Grid>
    );
});