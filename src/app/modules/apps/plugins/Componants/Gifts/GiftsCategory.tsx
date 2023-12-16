import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import {CreateGiftsCategory, getAllGiftCategory} from '../../../../../../API/api-endpoint'
import ToastUtils from '../../../../../../utils/ToastUtils'

const GiftsCategory = () => {
  const [giftCategoryList, setGiftCategoryList] = useState([])
  const [categoryName, setcategoryName] = useState('')

  useEffect(() => {
    getGiftCateGories()
  }, [])

  const getGiftCateGories = async () => {
    let result = await getAllGiftCategory()
    if (result.status === 200) {
      setGiftCategoryList(result.data)
    }
  }

  const createGiftcategory = async () => {
    if (categoryName.trim().length === 0) {
      ToastUtils({type: 'error', message: 'Please Enter Category Name'})
    } else {
      let result = await CreateGiftsCategory(categoryName)
      if (result.status === 200) {
        getGiftCateGories()
        ToastUtils({type: 'success', message: 'Gift Category Is Created'})
      } else {
        ToastUtils({type: 'error', message: 'Something Went Wrong'})
      }
    }
  }

  return (
    <div className='card'>
      <div className='card-title d-flex justify-content-between p-4'>
        <div>
          <h4>Gifts Category</h4>
        </div>
        <div>
          <button className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#kt_modal_1'>
            Add Gift Category
          </button>
        </div>
      </div>
      <div className='card-body'>
        {giftCategoryList.map((category: any, index: number) => {
          return (
            <div
              key={index}
              className='badge badge-light text-center me-3 mb-5 fs-6 fw-bold'
              //   data-bs-toggle='modal'
              //   data-bs-target='#kt_modal_2'
              //   onClick={() => {
              //     setInterest(interest?.name)
              //     setInterestID(interest?.interestId)
              //   }}
            >
              {category?.name}
            </div>
          )
        })}
      </div>
      <div className='modal fade' tabIndex={-1} id='kt_modal_1'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add Gift Category</h5>
              <div
                className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <i className='fa-solid fa-xmark'></i>
              </div>
            </div>
            <div className='modal-body'>
              <input
                placeholder='Enter Gift Category'
                type='text'
                name='gift_category'
                className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                autoComplete='off'
                value={categoryName}
                onChange={(e) => setcategoryName(e.target.value)}
              />
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                onClick={createGiftcategory}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GiftsCategory
