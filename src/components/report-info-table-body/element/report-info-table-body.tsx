import { FC, useState } from 'react';
import { TableBody, TableCell, TableRow, TextField } from '@mui/material';
import { useAuthState } from '@hooks/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { updateReportInfo } from '@redux/actions/report-info';
import { useAlert } from '@hooks/alerts';

type CellType = {
    value: number,
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

type ReportInfoTableBodyPropsType = {
    getTableBodyProps: () => { any };
    pages: Array<PageType>;
    prepareRow: (unknown) => void;
    isEditable: boolean;
}

export const ReportInfoTableBody: FC<ReportInfoTableBodyPropsType> = (
    {   getTableBodyProps,
        pages,
        prepareRow,
        isEditable
    }) => {
    const [inputValues, setInputValues] = useState({});
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated } = useAuthState();
    const { showAlert } = useAlert();

    const onChangeValue = (e, row, cell) => {
        const newValue = e.target.value;
        setInputValues(prevState => ({
            ...prevState,
            [row.id]: {
                ...prevState[row.id],
                [cell.column.id]: newValue
            }
        }));
        row.values[cell.column.id] = newValue;
    }
    const onBlurValue = async (e, row) => {
        const { id, original } = row;
        const updatedData = inputValues[id];
        if (Number.isInteger(parseFloat(e.target.value))) {
            try {
                await dispatch(updateReportInfo({
                    infoData: { update_user: isAuthenticated, ...updatedData },
                    id: original.f_pers_young_spec_line_id
                })).unwrap();
                showAlert('Запись успешно изменена', 'success');
            } catch (e) {
                showAlert('Произошла ошибка при изменении данных', 'error');
            }
        }
    }

    return (
        <TableBody {...getTableBodyProps()} className='table_body table_body_report_info'>
            {pages.map(row => {
                prepareRow(row);
                return (
                    <TableRow {...row.getRowProps()}>
                        {row.cells.map(cell => (
                            <TableCell {...cell.getCellProps()}>
                                {cell.column.id === 'target_count' || cell.column.id === 'distribution_count' ? (
                                    <TextField
                                        type='number'
                                        size='small'
                                        value={cell.value}
                                        disabled={!isEditable}
                                        onChange={(e) => onChangeValue(e, row, cell)}
                                        onBlur={(e) => onBlurValue(e, row)}
                                        error={!Number.isInteger(parseFloat(String(cell.value)))} />
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
};