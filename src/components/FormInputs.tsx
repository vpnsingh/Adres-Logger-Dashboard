import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { actionTypeData, applicationTypeData } from '../core/masterdata';

const FormInputs = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // filter input states object
    const [filterInput, setInputFilter] = useState({
        logId: '',
        actionType: '',
        applicationType: '',
        fromDate: '',
        toDate: '',
        applicationId: ''
    })
    // destructuring state object
    const {logId, actionType, applicationType, fromDate, toDate, applicationId} = filterInput
    // updating state object on change event
    const handleInputChange = (name:string, event:any) => setInputFilter({...filterInput, [name]: event.target.value})

    //empty object type for filter input object
    const emptyFilterData = {
        logId: '',
        actionType: '',
        applicationType: '',
        fromDate: '',
        toDate: '',
        applicationId: ''
    }

    // on search logger button calling api
    const filterData = (e:any) => {
        e.preventDefault()
        console.log(filterInput)
        let notEmptyFieldsObj = Object.fromEntries(Object.entries(filterInput).filter(([_, v]) => v !== ''));
        const options = {
            pathname: '/home',
            search: `?${createSearchParams(notEmptyFieldsObj)}`,
          };
        navigate(options, { replace: false });
    }

    // fetching prefilled values of url params
    useEffect(()=> {
        if(location.search !== ''){
            setInputFilter(emptyFilterData)
            var search = location.search.substring(1);
            let searchParamsObj = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
            // setting input fields values through url params
            for (let key in searchParamsObj){
                setInputFilter(filterInput => ({...filterInput, [key] : searchParamsObj[key]}))
            }
        }else{
            setInputFilter(emptyFilterData)
        }
    }, [location])

    const clearFilters = () => {
        setInputFilter(emptyFilterData)
        const options = { pathname: '/home', search: ``,};
        navigate(options, { replace: false });
    }

    return (
        <div className='inputs-filters my-4'>
            <Form onSubmit={(e) => filterData(e)} className="mb-5">
                <Row>
                    <Col>
                        <Form.Group controlId="formEmpName">
                            <Form.Label className='label'>Log ID</Form.Label>
                            <Form.Control type="text" placeholder="Log ID" 
                                onChange={(e) => handleInputChange('logId', e)} value={logId} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Action Type</Form.Label>
                            <Form.Select onChange={(e) => handleInputChange('actionType', e)} value={actionType}>
                                <option></option>
                                {
                                    actionTypeData.map((data, i) => {
                                        return <option key={i} value={data}>{data}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Application Type</Form.Label>
                            <Form.Select onChange={(e) => handleInputChange('applicationType', e)} value={applicationType}>
                                <option></option>
                                {
                                    applicationTypeData.map((data, i) => {
                                        return <option key={i} value={data}>{data}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formFromDate">
                            <Form.Label className='label'>From Date</Form.Label>
                            <Form.Control type="date" placeholder="Select date" 
                                onChange={(e) => handleInputChange('fromDate', e)} value={fromDate} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formToDate">
                            <Form.Label className='label'>To Date</Form.Label>
                            <Form.Control type="date" placeholder="Select date" 
                                onChange={(e) => handleInputChange('toDate', e)} value={toDate} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formAppID">
                            <Form.Label className='label'>Application ID</Form.Label>
                            <Form.Control type="text" placeholder="e.g. 219841/2021" 
                                onChange={(e) => handleInputChange('applicationId', e)} value={applicationId} />
                        </Form.Group>
                    </Col>
                    <Col className='align-self-end'>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">Search Logger</Button>
                        </div>
                    </Col>
                </Row>
                <Button variant="light float-end" size="sm" className='mt-1' onClick={clearFilters}>
                    Clear Filters <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
            </Form>
        </div>
    )
}

export default FormInputs;