export type DefaultType = {
    isLoading: boolean,
    error: boolean,
}

export type ReportSliceType = {
    reports: Array<ReportType> | null,
    report: ReportType
} & DefaultType;

export type ReportType = {
    f_pers_young_spec_id: number,
    insert_date: string,
    insert_user: string,
    org_employee: string,
    rep_beg_period: string,
    rep_end_period: string,
    update_date: string
}

export type ReportInfoSliceType = {
    reportInfo: Array<ReportInfoDetailsType> | null,
    reportTypes: Array<ReportInfoType>
} & DefaultType;

export type ReportInfoType = {
    nsi_pers_young_spec_id: number,
    actual_date: string,
    name: string,
    range: number,
    update_date: string,
    update_user: string
}

export type ReportInfoDetailsType = {
    f_pers_young_spec_line_id: number,
    target_count: number,
    distribution_count: number,
    update_date: string,
    update_user: string,
    nsi_pers_indicate_id: number,
    f_pers_young_spec_id: number,
}
