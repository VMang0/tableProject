import { FC, useMemo } from 'react';
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination} from 'react-table';
import { Table, TableContainer, TableFooter } from '@mui/material';
import { TablesHeader } from '@components/table-header';
import { TablesBody } from '@components/table-body';
import { Pagination } from '@components/table-footer';
import { ColumnHiddenButton } from '@components/column-hidden';
import { FORMS_COLUMNS } from '@utils/constants';
import { useSelector } from 'react-redux';
import { reportsSelector } from '@redux/slices/report-slice';

import '../ui/reports-table.scss';

export const ReportsTable: FC = () => {
    const defaultReports = useSelector(reportsSelector);
    const columns = useMemo(() => FORMS_COLUMNS, []);
    const data = useMemo(() => defaultReports, [defaultReports]);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        allColumns,
        getToggleHideAllColumnsProps
    } = useTable({
            columns,
            data
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    )
    const { pageIndex, pageSize } = state;

    return (
        <>
            <ColumnHiddenButton
                getToggleProps={getToggleHideAllColumnsProps}
                columns={allColumns} />
            <TableContainer className='table_container'>
                <Table {...getTableProps()} className='table'>
                    <TablesHeader headerGroups={headerGroups} reportsStyle='table_header_reports'/>
                    <TablesBody getTableBodyProps={getTableBodyProps} pages={page} prepareRow={prepareRow}  />
                    <TableFooter className='table_footer table_footer_reports'>
                        <Pagination
                            pageIndex={pageIndex}
                            gotoPage={gotoPage}
                            pageOptions={pageOptions}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            canPreviousPage={canPreviousPage}
                            previousPage={previousPage}
                            canNextPage={canNextPage}
                            nextPage={nextPage}
                            pageCount={pageCount}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
};