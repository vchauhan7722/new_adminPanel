import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import {
  CreateGiftsCategory,
  deleteGiftsCategory,
  getAllGiftCategory,
  updateGiftsCategory,
} from '../../../../../../API/api-endpoint'
import ToastUtils from '../../../../../../utils/ToastUtils'

const GiftsCategory = (props) => {
  const {setGetGiftsOnCategoryChange, getGiftsOnCategoryChange} = props
  const [giftCategoryList, setGiftCategoryList] = useState([])
  const [categoryName, setcategoryName] = useState('')
  const [categoryId, setcategoryID] = useState('')
  const [IsEditCategory, setIsEditCategory] = useState(false)

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
        setGetGiftsOnCategoryChange(getGiftsOnCategoryChange + 1)
        ToastUtils({type: 'success', message: 'Gift Category Is Created'})
      } else {
        ToastUtils({type: 'error', message: 'Something Went Wrong'})
      }
    }
  }

  const updateGiftcategory = async () => {
    if (categoryName.trim().length === 0) {
      ToastUtils({type: 'error', message: 'Please Enter Category Name'})
    } else {
      let result = await updateGiftsCategory(categoryName, categoryId)
      if (result.status === 200) {
        getGiftCateGories()
        setGetGiftsOnCategoryChange(getGiftsOnCategoryChange + 1)
        setIsEditCategory(false)
        ToastUtils({type: 'success', message: 'Gift Category Is Updated'})
      } else {
        ToastUtils({type: 'error', message: 'Something Went Wrong'})
      }
    }
  }

  const deleteGiftcategory = async () => {
    let result = await deleteGiftsCategory(categoryId)
    if (result.status === 200) {
      getGiftCateGories()
      setGetGiftsOnCategoryChange(getGiftsOnCategoryChange + 1)
      ToastUtils({type: 'success', message: 'Gift Category Is Deleted'})
    } else {
      ToastUtils({type: 'error', message: 'Something Went Wrong'})
    }
  }

  return (
    <div className='card'>
      <div className='card-title d-flex justify-content-between p-4'>
        <div>
          <h4>Gifts Category</h4>
        </div>
        <div>
          <button
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#gift_add_update'
          >
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
              data-bs-toggle='modal'
              data-bs-target='#gift_add_update'
              onClick={() => {
                setcategoryID(category?.giftCategoryId)
                setcategoryName(category?.name)
                setIsEditCategory(true)
              }}
            >
              {category?.name}
            </div>
          )
        })}
      </div>
      <div className='modal fade' tabIndex={-1} id='gift_add_update'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>
                {IsEditCategory ? 'Update Gift Category' : 'Add Gift Category'}
              </h5>
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
              <button
                type='button'
                className='btn btn-light'
                data-bs-dismiss='modal'
                onClick={() => {
                  setIsEditCategory(false)
                  setcategoryName('')
                  setcategoryID('')
                }}
              >
                Close
              </button>
              {IsEditCategory && (
                <button
                  type='button'
                  className='btn btn-danger'
                  data-bs-dismiss='modal'
                  onClick={() => {
                    deleteGiftcategory()
                  }}
                >
                  Delete Category
                </button>
              )}
              <button
                type='button'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                onClick={() => {
                  IsEditCategory ? updateGiftcategory() : createGiftcategory()
                }}
              >
                {IsEditCategory ? 'Update Category' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GiftsCategory
