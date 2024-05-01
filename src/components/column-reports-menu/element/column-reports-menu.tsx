import { useDispatch } from 'react-redux';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { AppDispatch } from '@redux/store';
import { setReport } from '@redux/slices/report-slice';

type RowType = {
    row: {
        original: {
            f_pers_young_spec_id: number
        }
    }
}

export const ColumnReportsMenu: FC<RowType> = ({ row }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedRow, setSelectedRow] = useState<object>(null);
    const navigate = useNavigate();
    const open = !!anchorEl;

    const handleClick = (event: MouseEvent, row) => {
        setAnchorEl(event.currentTarget as HTMLElement);
        setSelectedRow(row);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };

    const handleView = () => {
        dispatch(setReport(selectedRow.original));
        const reportId = selectedRow.original.f_pers_young_spec_id;
        navigate(`/reports/${reportId}/info/read`)
        handleClose();
    };

    const handleEdit = () => {
        dispatch(setReport(selectedRow.original));
        const reportId = selectedRow.original.f_pers_young_spec_id;
        navigate(`/reports/${reportId}/info/edit`)
        handleClose();
    };

    return (
        <Box>
            <IconButton
                id='table-menu-button'
                aria-controls={open ? 'table-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup='true'
                onClick={(event) => handleClick(event, row)}>
                <DragIndicatorIcon />
            </IconButton>
            <Menu
                id='table-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleView}>
                    <Typography variant='body1'>Подробнее</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleEdit}>
                    <Typography variant='body1'>Редактировать</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};