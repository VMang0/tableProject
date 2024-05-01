import { memo } from 'react';
import { TableCell, TableRow, Grid, Select, Button, MenuItem, Typography } from '@mui/material';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material';

export const Pagination = memo((
    {
        pageIndex,
        gotoPage,
        pageOptions,
        pageSize,
        setPageSize,
        canPreviousPage,
        previousPage,
        canNextPage,
        nextPage,
        pageCount
    }) => (
    <TableRow>
        <TableCell colSpan={4}>
            <Grid
                container
                alignItems='center'
                justifyContent='flex-end'
                direction='row'
                sx={{ gap: '10px' }}>
                <Typography variant='body1'>Количество строк на странице: </Typography>
                <Select
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                    size='small'>
                    {[5, 10, 20, 25].map(pageSize => (
                        <MenuItem key={pageSize} value={pageSize}>{pageSize}</MenuItem>
                    ))}
                </Select>
                <Typography variant='body1'>Страница { pageIndex + 1 } из { pageOptions.length }</Typography>
                <Button
                    size='small'
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}>
                    <FirstPage />
                </Button>
                <Button
                    size='small'
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}>
                    <KeyboardArrowLeft />
                </Button>
                <Button
                    size='small'
                    onClick={() => nextPage()}
                    disabled={!canNextPage}>
                    <KeyboardArrowRight />
                </Button>
                <Button
                    size='small'
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}>
                    <LastPage />
                </Button>
                <Select
                    size='small'
                    value={pageIndex + 1}
                    onChange={e => {
                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                        gotoPage(pageNumber);
                    }}>
                    {Array.from({ length: pageOptions.length },
                        (_, index) => index + 1).map(number => (
                        <MenuItem key={number} value={number}>
                            {number}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
        </TableCell>
    </TableRow>
));
