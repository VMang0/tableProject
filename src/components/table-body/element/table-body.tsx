import { TableBody, TableCell, TableRow } from '@mui/material';
import { ColumnReportsMenu } from '@components/column-reports-menu';
import { FC } from 'react';

type CellType = {
    render: (string) => void,
    getCellProps: () => { any}
    column: {
        id: string
    }
}

type PageType = {
    getRowProps: () => { any },
    cells: Array<CellType>
}

type TablesBodyPropsType = {
    getTableBodyProps: () => { any },
    pages: Array<PageType>,
    prepareRow: (unknown) => void
}

export const TablesBody: FC<TablesBodyPropsType> = ({ getTableBodyProps, pages, prepareRow }) => (
    <TableBody {...getTableBodyProps()} className="table_body">
        {pages.map(row => {
            prepareRow(row);
            return (
                <TableRow {...row.getRowProps()}>
                    {row.cells.map(cell => (
                        <TableCell {...cell.getCellProps()}>
                            {cell.column.id === 'actions' ? (
                                <ColumnReportsMenu row={row} />
                            ) : (
                                cell.render('Cell')
                            )}
                        </TableCell>
                    ))}
                </TableRow>
            );
        })}
    </TableBody>
);