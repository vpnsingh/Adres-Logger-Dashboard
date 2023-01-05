import React from 'react'

interface PaginationProps {
    nPages: number,
    currentPage: number,
    setCurrentPage: (currentPage: number) => void;
}

const Pagination = (props: PaginationProps) => {

    const { nPages, currentPage, setCurrentPage } = props
    const pageNumbers = Array.from(Array(nPages + 1).keys()).slice(1)
    const nextPage = () => {
        if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }

    return (
        <nav>
            <ul className='pagination justify-content-center'>
                <li className="page-item">
                    <button className="page-link" onClick={prevPage} >
                        Previous
                    </button>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} 
                        className= {`page-item ${currentPage === pgNumber ? 'active' : ''} `} >
                        <button onClick={() => setCurrentPage(pgNumber)} className='page-link' >
                            {pgNumber}
                        </button>
                    </li>
                ))}
                <li className="page-item">
                    <button className="page-link" onClick={nextPage}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;
