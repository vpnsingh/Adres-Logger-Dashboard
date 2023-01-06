import { useState, useEffect } from 'react'
import { getLoggerData } from '../apis/requests'
import TableLayout from '../components/TableLayout'
import Pagination from '../components/Pagination';
import FormInputs from '../components/FormInputs';
import { useLocation } from 'react-router-dom';
import { isAfter, parseISO, isBefore,isEqual } from 'date-fns';
import Alert from 'react-bootstrap/Alert';

const Dashboard = () => {
    const location = useLocation()
    const [logData, setLogData] = useState([])
    // states for pagination data
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    const fetchData = () => {
        getLoggerData()
            .then(res => {
                setLogData(res.result.auditLog)
                localStorage.setItem('loggerData', JSON.stringify(res.result.auditLog))
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchData()
        setTimeout(() => {
            checkForURLParams()
        }, 2000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // for url change detection
    useEffect(()=> {
        if(location.search !== ''){
            var search = location.search.substring(1);
            let searchParamsObj = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
            filterLoggerData(searchParamsObj)
        }else{
            fetchData()
        }
    }, [location])

    const checkForURLParams = () => {
        if(location.search !== ''){
            var search = location.search.substring(1);
            let searchParamsObj = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
            filterLoggerData(searchParamsObj)
        }
    }

    // filter the logger data based on search inputs
    const filterLoggerData = (params:any) => {
        let tempfilteredLogger = JSON.parse(localStorage.getItem('loggerData') || '{}')
        let newfilteredLogger = tempfilteredLogger.filter((logger:any) => {
          // validates all filter criteria
          return Object.entries(params).every(([filter, value] : any) => {
            if(filter === 'logId'){
                return String(logger[filter]).includes(value)
            }
            if(filter === 'actionType'){
                return String(logger[filter]) === String(value)
            }
            if(filter === 'applicationType'){
                return String(logger[filter]) === String(value)
            }
            if(filter === 'applicationId'){
                return String(logger[filter]).includes(value)
            }
            if(filter === 'fromDate') {
                return isAfter(parseISO(logger['creationTimestamp']), new Date(value)) ||
                     isEqual(parseISO(logger['creationTimestamp']), new Date(value))  
            }
            if(filter === 'toDate') {
                return isBefore(parseISO(logger['creationTimestamp']), new Date(value)) ||
                    isEqual(parseISO(logger['creationTimestamp']), new Date(value))
            }
            return false
          });
        });
        setLogData(newfilteredLogger)
    }

    // sorting logger data with columns name in asc & desc order
    const sortLoggerData = (columnName:any, order:string, inputType:string) => {
        let sortedData = logData.sort((prev:any, next:any) : any => {
            if(inputType === 'number'){
                return order === 'asc' ? prev[columnName] - next[columnName] : next[columnName] - prev[columnName]
            }else if(inputType === 'string'){
                if(order === 'asc'){
                    if(prev[columnName] === null) return 1
                    if(next[columnName] === null) return -1
                    return prev[columnName] < next[columnName] ? -1 : 1
                }else{
                    if(prev[columnName] === null) return 1
                    if(next[columnName] === null) return -1
                    return prev[columnName] > next[columnName] ? -1 : 1
                }
            }else{
                let dateA : any = new Date(prev[columnName])
                let dateB : any = new Date(next[columnName])
                return order === 'asc' ? dateA - dateB : dateB - dateA
            } 
        })
        setLogData([].concat(sortedData))
    }

    // setting pagination records data
    let indexOfLastRecord = currentPage * recordsPerPage;
    let indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    let currentRecords = logData.slice(indexOfFirstRecord, indexOfLastRecord);
    let nPages = Math.ceil(logData.length / recordsPerPage)

    useEffect(() => {
        if(logData.length > 0){
            nPages = Math.ceil(logData.length / recordsPerPage)
            if(currentPage > nPages) setCurrentPage(nPages)
            indexOfLastRecord = currentPage * recordsPerPage;
            indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
            currentRecords = logData.slice(indexOfFirstRecord, indexOfLastRecord);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logData])

    return (
        <div className='container-fluid'>
            <FormInputs />
            {logData?.length > 0 ? (
                <>
                    <TableLayout loggerData={currentRecords} sortData={sortLoggerData}/>
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            ) : 
            <Alert variant='secondary'>
                Data not available !!!
            </Alert>
        }
        </div>
    )
}

export default Dashboard
