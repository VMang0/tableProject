import { formatDateAndMonth } from '@utils/fomat-date';

export const FORMS_COLUMNS = [
    {
        Header: 'Период',
        accessor: row => `${formatDateAndMonth(row.rep_beg_period)} - ${formatDateAndMonth(row.rep_end_period)}`,
        disableFilters: true
    },
    {
        Header: 'Год',
        accessor: row => new Date(row.rep_beg_period).getFullYear(),
    },
    {
        Header: 'Данные сотрудника организации',
        accessor: 'org_employee',
    },
    {
        Header: '',
        accessor: 'actions',
        disableSortBy: true,
        disableFilters: true
    }
];

export const FORMS_INFO_COLUMNS = (findNameById) => [
    {
        Header: 'Наименование показателя',
        accessor: row => findNameById(row.nsi_pers_indicate_id),
        disableFilters: true,
        disableSortBy: true
    },
    {
        Header: 'Общее количество молодых специалистов',
        accessor: row => +row.target_count + +row.distribution_count,
        disableSortBy: true,
        disableFilters: true,
    },
    {
        Header: 'Категория, источник приема на работу',
        columns: [
            {
                Header: 'Целевое',
                accessor: 'target_count',
                disableFilters: true,
            },
            {
                Header: 'Распределение',
                accessor: 'distribution_count',
                disableFilters: true,
            },
        ]
    },
];
