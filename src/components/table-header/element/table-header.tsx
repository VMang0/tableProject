import { FC } from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import { ColumnFilterMenu } from '@components/column-filter-menu';

type HeadersType = {
    getHeaderProps: () => { any },
    getSortByToggleProps: () => { any },
    isSorted: boolean,
    isSortedDesc: boolean,
    render: (value: string) => { any },
    canFilter: boolean,
    setFilter: (value: string) => void
}

type headerGroupsPopsType = {
    headerGroups: Array<{
        getHeaderGroupProps: () => { any }
        headers: Array<HeadersType>
    }>,
    reportsStyle?: string | undefined
}

export const TablesHeader: FC<headerGroupsPopsType> = ({ headerGroups, reportsStyle }) => (
    <TableHead className={`table_header ${reportsStyle || ''}`}>
        {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(head_column => (
                    <TableCell
                        align='center'
                        {...head_column.getHeaderProps()}>
                        <TableSortLabel
                            {...head_column.getSortByToggleProps()}
                            active={head_column.isSorted}
                            direction={head_column.isSorted
                                ? (head_column.isSortedDesc ? 'desc' : 'asc')
                                : undefined
                            }>
                            <Typography variant='body1'>{ head_column.render('Header') }</Typography>
                        </TableSortLabel>
                        {head_column.canFilter ? <ColumnFilterMenu column={head_column} /> : null}
                    </TableCell>
                ))}
            </TableRow>
        ))}
    </TableHead>
);



