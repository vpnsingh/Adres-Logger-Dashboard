import React from 'react'
import Table from 'react-bootstrap/Table';
import { LoggerDataType } from '../types';
import { tableColumns } from '../core/masterdata';

interface DataTableProps {
    loggerData?: LoggerDataType[],
    sortData: (columnName: string, order: string, inputType: string) => void;
}

const TableLayout = ({ loggerData = [], sortData }: DataTableProps) => {
    
    return (
        <div className='logger-table'>
        <Table bordered hover size='sm'>
            <thead>
                <tr>
                    {
                        tableColumns?.map((column) => {
                            return <th key={column.key}>
                                <span>{column.label}</span>
                                <i className="fa fa-sort ps-2" 
                                    onClick={() => {column.sort==='asc' ? column.sort='desc' : column.sort='asc';sortData(column.key, column.sort, column.intype)}}>
                                </i>
                            </th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {loggerData.map((log, index) => {
                    return (
                        <tr key={index}>
                            <td>{log.logId ? log.logId : <i className="fa fa-code" aria-hidden="true"></i>}</td>
                            <td>{log.applicationType ? log.applicationType : <i className="fa fa-code" aria-hidden="true"></i>}</td>
                            <td>{log.applicationId ? log.applicationId : <i className="fa fa-code" aria-hidden="true"></i>}</td>
                            <td>{log.actionType ? log.actionType : <i className="fa fa-code" aria-hidden="true"></i>}</td>
                            <td><i className="fa fa-code" aria-hidden="true"></i></td>
                            <td>{log.creationTimestamp ? log.creationTimestamp : <i className="fa fa-code" aria-hidden="true"></i>}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        </div>
    )
}

export default TableLayout;