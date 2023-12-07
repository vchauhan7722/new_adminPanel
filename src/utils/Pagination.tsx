import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import Pagination from 'react-bootstrap/Pagination'
import ReactPaginate from 'react-paginate'

const datatablefooter = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const datatableshowing = {
  color: '#6b6c72',
}

const pagination = {
  display: 'flex',
  justifyContent: 'space-between',
  listStyle: 'none',
  cursor: 'pointer',

  padding: '10px',
  border: '1px solid transparent',
  color: '#505050',
}

const paginationLink = {
  fontWeight: 'bold',
}

const paginationActive = {
  color: '#505050',
  border: '1px solid #cacaca',
  background: 'linear-gradient(to bottom,#fff 0,#eaeaea 100%)',
}

const paginationDisabled = {
  color: '#cacaca',
}

const CustomPagination = (props) => {
  const {pageSize, setPageSize, totalPage, cb} = props

  const [page, setPage] = useState<any>(1)

  // const [startpageToshow, setStartPagetoShow] = useState(1)
  // const [endpageToshow, setEndPagetoShow] = useState(5)
  // const [pageLimit, setPageLimit] = useState(5)
  // const [activePageNumber, setActivePageNumber] = useState(activePage)

  // useEffect(() => {
  //   if (totalPage < 5) {
  //     setEndPagetoShow(totalPage)
  //     setPageLimit(totalPage)
  //   } else {
  //     setPageLimit(5)
  //   }
  // }, [totalPage])

  const updatePage = ({selected: selectedPage}) => {
    //setActivePageNumber(selectedPage)
    setPage(parseInt(selectedPage))
    cb(parseInt(selectedPage), pageSize)
  }

  const updatePageSize = (e) => {
    setPageSize(e.target.value)
    cb(page, e.target.value)
  }

  const pageJump = (page) => {
    setPage(parseInt(page))
    cb(parseInt(page), pageSize)
  }

  return (
    <div className='d-flex justify-content-between'>
      <div>
        <select
          className='form-select h-30px mt-2'
          data-kt-select2='true'
          data-allow-clear='true'
          defaultValue='100'
          style={{padding: '0.5rem 2rem 0.5rem 1rem'}}
          onChange={(e) => updatePageSize(e)}
        >
          <option value='10'>10</option>
          <option value='30'>30</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
        </select>
      </div>
      <div className='d-flex mt-2'>
        {/* <div className='w-25 me-5'>
          <input
            //placeholder='Birthdate'
            type='number'
            name='pageJump'
            className={clsx('form-control h-30px ms-2 ')}
            autoComplete='off'
            onChange={(e) => pageJump(e.target.value)}
            defaultValue={1}
          />
        </div> */}
        <div>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={totalPage}
            onPageChange={updatePage}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakLabel='...'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            activeClassName='active'
          />
        </div>
      </div>
    </div>
  )
}

export default CustomPagination
