export const actionTypeData = [
    'INITIATE_APPLICATION',
    'SUBMIT_APPLICATION',
    'ADD_EMPLOYEE',
    'DARI_REFRESH_TOKEN',
    'DARI_APP_LOGIN'
]

export const applicationTypeData = [
    'LEASE_CLOSURE',
    'ADD_COMPANY_EMPLOYEE',
    'CERT_TITLE_DEED_PLOT',
    'ADD_POA',
    'ADD_COMPANY',
    'CERT_PROP_OWNERSHIP',
    'LEASE_REGISTRATION'
]

export const tableColumns = [
    { key: 'logId', label: 'Log ID', sort: 'asc', intype: 'number' },
    { key: 'applicationType', label: 'Application Type', sort: 'asc', intype: 'string' },
    { key: 'applicationId', label: 'Application ID', sort: 'asc', intype: 'number' },
    { key: 'actionType', label: 'Action', sort: 'asc', intype: 'string' },
    { key: 'action', label: 'Action Details', sort: 'asc', intype: 'number' },
    { key: 'creationTimestamp', label: 'Date : Time', sort: 'asc', intype: 'date' },
]