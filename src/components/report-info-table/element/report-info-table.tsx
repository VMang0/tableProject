import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination } from 'react-table';
import { Table, TableCell, TableContainer, TableFooter, TableRow, Typography } from '@mui/material';
import { ColumnFilterMenu } from '@components/column-filter-menu';
import { TablesHeader } from '@components/table-header';
import { Pagination } from '@components/table-footer';
import { ReportInfoTableBody } from '@components/report-info-table-body';
import { reportInfoSelector, reportTypesSelector } from '@redux/slices/report-info-slice';
import { FORMS_INFO_COLUMNS } from '@utils/constants';

type ReportInfoTablePropsType = {
    isEditable: boolean
}

export const ReportInfoTable: FC<ReportInfoTablePropsType> = ({ isEditable }) => {
    const defaultReportInfo = useSelector(reportInfoSelector);
    const defaultReportTypeInfo = useSelector(reportTypesSelector);
    const findNameById = (id: string) => {
        const foundItem = defaultReportTypeInfo?.find(item => item?.nsi_pers_young_spec_id === id);
        return foundItem ? foundItem.name : '';
    };
    const columns = useMemo(() => FORMS_INFO_COLUMNS(findNameById), [defaultReportInfo]);
    const data = useMemo(() => defaultReportInfo, [defaultReportInfo]);
    const defaultColumn = useMemo(() => ({ Filter: ColumnFilterMenu }), []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state
    } = useTable({
            columns,
            data,
            defaultColumn,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const sumTargetValue = defaultReportInfo?.reduce((total, row) => total+ +row.target_count , 0);
    const sumDistributionValue = defaultReportInfo?.reduce((total, row) => total+ +row.distribution_count , 0);
    const { pageIndex, pageSize } = state;

    return (
        <TableContainer className='table_container'>
            <Table {...getTableProps()} className='table'>
                <TablesHeader headerGroups={headerGroups}/>
                <ReportInfoTableBody
                    getTableBodyProps={getTableBodyProps}
                    pages={page}
                    prepareRow={prepareRow}
                    isEditable={isEditable} />
                <TableFooter className='table_footer'>
                    <TableRow className='table_footer_calculate'>
                        <TableCell><Typography variant='body1'>Общее число:</Typography></TableCell>
                        <TableCell>
                            <Typography variant='body1'>
                                {sumTargetValue + sumDistributionValue}
                            </Typography>
                        </TableCell>
                        <TableCell><Typography variant='body1'>{sumTargetValue}</Typography></TableCell>
                        <TableCell><Typography variant='body1'>{sumDistributionValue}</Typography></TableCell>
                    </TableRow>
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
    )
};