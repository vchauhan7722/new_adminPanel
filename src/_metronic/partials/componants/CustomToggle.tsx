import React from 'react'

export const CustomToggle = React.forwardRef(({children, onClick}: any, ref: any) => (
  <button
    ref={ref}
    className='btn'
    onClick={(e) => {
      e.preventDefault()
      onClick(e)
    }}
  >
    {children}
    <i className='fa-solid fa-ellipsis-vertical'></i>
  </button>
))
