import React, {useEffect, useState} from 'react'
import Pagination from 'react-bootstrap/Pagination'

const CustomPagination = (props) => {
  const {pageSize, setPageSize, totalPage, setTotalPage, activePage, setActivePage, cb} = props

  const [startpageToshow, setStartPagetoShow] = useState(1)
  const [endpageToshow, setEndPagetoShow] = useState(5)
  const [pageLimit, setPageLimit] = useState(5)
  const [activePageNumber, setActivePageNumber] = useState(activePage)

  useEffect(() => {
    if (totalPage < 5) {
      setEndPagetoShow(totalPage)
      setPageLimit(totalPage)
    } else {
      setPageLimit(5)
    }
  }, [totalPage])

  const updatePage = (page) => {
    setActivePageNumber(page)
    cb(parseInt(page), pageSize)
  }

  const updatePreviousPageNumber = () => {
    console.log(totalPage >= startpageToshow, totalPage, startpageToshow, endpageToshow)
    if (totalPage >= startpageToshow && startpageToshow !== 1) {
      setPageLimit(5)
      setStartPagetoShow(startpageToshow - 5)
      setEndPagetoShow(endpageToshow - 5)
    }
  }

  const updateNextPageNumber = () => {
    if (totalPage >= endpageToshow) {
      let endPageNumber = totalPage - endpageToshow
      if (endPageNumber > 5) {
        setPageLimit(5)
        setStartPagetoShow(endpageToshow + 1)
        setEndPagetoShow(endpageToshow + 5)
      } else {
        setPageLimit(endPageNumber)
        setStartPagetoShow(endpageToshow + 1)
        setEndPagetoShow(endpageToshow + endPageNumber)
      }
    }
  }

  const gotoFirstPage = (page: any) => {
    setStartPagetoShow(1)
    setEndPagetoShow(5)
    setActivePageNumber(page)
    cb(parseInt(page), pageSize)
  }

  const gotoLastPage = (page: any) => {
    let endPageNumber = totalPage - endpageToshow
    if (endPageNumber > 5) {
      setStartPagetoShow(totalPage - 5)
      setEndPagetoShow(totalPage)
      setPageLimit(5)
      setActivePageNumber(page)
      cb(parseInt(page), pageSize)
    } else {
      setStartPagetoShow(endPageNumber)
      setEndPagetoShow(endPageNumber + 5)
      setPageLimit(endPageNumber)
      setActivePageNumber(page)
      cb(parseInt(page), pageSize)
    }
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => gotoFirstPage(1)} />
      {startpageToshow !== 1 && (
        <>
          <Pagination.Ellipsis onClick={() => updatePreviousPageNumber()} />
        </>
      )}

      {Array.from({length: pageLimit}).map((page: any, index: any) => {
        return (
          <Pagination.Item
            key={index}
            active={activePageNumber === index + startpageToshow}
            onClick={() => updatePage(index + startpageToshow)}
          >
            {index + startpageToshow}
          </Pagination.Item>
        )
      })}

      {endpageToshow !== totalPage && (
        <>
          <Pagination.Ellipsis onClick={() => updateNextPageNumber()} />
        </>
      )}
      <Pagination.Last onClick={() => gotoLastPage(totalPage)} />
    </Pagination>
  )
}

export default CustomPagination
