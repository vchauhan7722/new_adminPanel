import React, {useEffect, useRef, useState} from 'react'
import GiftsCategory from './GiftsCategory'
import {
  CreateGift,
  deleteGifts,
  getAllGift,
  getAllGiftCategory,
  updateGifts,
} from '../../../../../../API/api-endpoint'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'
import ToastUtils, {ErrorToastUtils} from '../../../../../../utils/ToastUtils'

const Gifts = () => {
  const hiddenFileInput = useRef<HTMLInputElement>(document.createElement('input'))

  const [giftList, setGiftList] = useState<any>([])
  const [currentImageTempPath, setCurrentImageTempPath] = useState<any>('')
  const [isImageUploaded, setisImageUploaded] = useState<any>(false)
  const [file, setFile] = useState('')
  const [giftName, setGiftName] = useState('')
  const [giftCredit, setGiftCredit] = useState(1)
  const [giftId, setGiftId] = useState('')
  const [selectedGiftCategoryID, setSelectedGiftCategoryID] = useState(0)
  const [selectedGiftCategoryName, setSelectedGiftCategoryName] = useState('')
  const [getGiftsOnCategoryChange, setGetGiftsOnCategoryChange] = useState(1)
  const [IsEditGift, setIsEditGift] = useState(false)

  useEffect(() => {
    getAllGiftsList()
  }, [getGiftsOnCategoryChange])

  const getAllGiftsList = async () => {
    let result = await getAllGift()
    console.log('result')
    if (result.status === 200) {
      //const groupedGifts: any = groupGiftsByCategoryId(result.data)
      setGiftList(result.data)
    }
  }

  const handleClick = () => {
    const fileInput = document.getElementById(`fileInput`)
    fileInput?.click()
  }

  const handleIconChange = (event: any) => {
    setisImageUploaded(true)
    const fileUploaded = event.target.files[0]
    var tmppath = URL.createObjectURL(event.target.files[0])
    setCurrentImageTempPath(tmppath)
    setFile(fileUploaded)
  }

  const createGift = async () => {
    if (giftName.trim().length === 0 || giftCredit === 0) {
      ToastUtils({type: 'error', message: 'Please Fill All Data'})
    } else {
      let result = await CreateGift(
        giftName,
        selectedGiftCategoryID,
        selectedGiftCategoryName,
        giftCredit,
        file
      )
      console.log('result', result)
      if (result.status === 200) {
        getAllGiftsList()
        ToastUtils({type: 'success', message: 'Gift Is Created'})
        setGiftCredit(1)
        setGiftName('')
        setFile('')
        setisImageUploaded(false)
      } else {
        ErrorToastUtils()
      }
    }
  }

  const deleteGift = async () => {
    let result = await deleteGifts(selectedGiftCategoryID, giftId)
    if (result.status === 200) {
      getAllGiftsList()
      ToastUtils({type: 'success', message: 'Gift Is Deleted'})
    } else {
      ErrorToastUtils()
    }
  }

  const updateGift = async () => {
    if (giftName.trim().length === 0 || giftCredit === 0) {
      ToastUtils({type: 'error', message: 'Please Fill All Data'})
    } else {
      let result = await updateGifts(
        giftName,
        selectedGiftCategoryID,
        selectedGiftCategoryName,
        giftCredit,
        file,
        giftId
      )
      if (result.status === 200) {
        getAllGiftsList()
        ToastUtils({type: 'success', message: 'Gift Is Updated'})
        setGiftCredit(1)
        setGiftName('')
        setFile('')
        setCurrentImageTempPath('')
        setisImageUploaded(false)
      } else {
        ErrorToastUtils()
      }
    }
  }

  return (
    <>
      <div className='mb-5'>
        <GiftsCategory
          setGetGiftsOnCategoryChange={setGetGiftsOnCategoryChange}
          getGiftsOnCategoryChange={getGiftsOnCategoryChange}
        />
      </div>
      {giftList.map((giftcategory: any, index: any) => {
        return (
          <div className='card mb-5' key={index}>
            <div className='card-title p-4'>
              <h4>{giftcategory?.name}</h4>
            </div>
            <div className='card-body row d-flex p-4 '>
              <div
                className='col-1'
                data-bs-toggle='modal'
                data-bs-target='#gift_model'
                onClick={() => {
                  setSelectedGiftCategoryID(giftcategory?.giftCategoryId)
                  setSelectedGiftCategoryName(giftcategory?.name)
                }}
              >
                <img
                  src={toAbsoluteUrl('/media/plugins/jstree/add.png')}
                  height={82}
                  width={82}
                  alt='icon'
                  loading='lazy'
                />
              </div>

              {giftcategory?.gifts.map((gift: any, index: any) => {
                return (
                  <>
                    <div
                      className='col-1'
                      data-bs-toggle='modal'
                      data-bs-target='#gift_model'
                      onClick={() => {
                        setIsEditGift(true)
                        setSelectedGiftCategoryID(giftcategory?.giftCategoryId)
                        setSelectedGiftCategoryName(giftcategory?.name)
                        setGiftId(gift?.giftId)
                        setGiftName(gift?.name)
                        setGiftCredit(gift?.credit)
                        setCurrentImageTempPath(`${process.env.REACT_APP_SERVER_URL}/${gift?.icon}`)
                        setisImageUploaded(true)
                      }}
                    >
                      <img
                        src={`${process.env.REACT_APP_SERVER_URL}/${gift.icon}`}
                        height={82}
                        width={82}
                        alt='icon'
                        loading='lazy'
                      />

                      <div>
                        <h4
                          className='text-center mt-2'
                          data-toggle='tooltip'
                          data-placement='top'
                          title={gift.name}
                        >
                          <img
                            alt='Pic'
                            src={toAbsoluteUrl(`/media/logos/Credits.png`)}
                            width='17px'
                            height='17px'
                            className='me-1'
                            loading='lazy'
                          />
                          {gift.credit}
                        </h4>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        )
      })}
      <div className='modal fade' tabIndex={-1} id='gift_model'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{IsEditGift ? 'Update Gift' : 'Add Gifts'}</h5>
            </div>
            <div className='modal-body'>
              <div className='d-flex align-items-center '>
                <div className='symbol symbol-50px overflow-visible me-3'>
                  <div
                    onClick={() => {
                      handleClick()
                      setisImageUploaded(false)
                    }}
                  >
                    <img
                      src={
                        !isImageUploaded
                          ? toAbsoluteUrl('/media/plugins/jstree/add.png')
                          : currentImageTempPath
                      }
                      height={82}
                      width={82}
                      alt='icon'
                      loading='lazy'
                    />
                  </div>

                  <input
                    type='file'
                    name='icon'
                    id={`fileInput`}
                    onChange={(e) => handleIconChange(e)}
                    ref={hiddenFileInput}
                    style={{display: 'none'}} // Make the file input element invisible
                    accept='image/*'
                  />
                </div>

                <div className='flex-grow-1'>
                  <input
                    placeholder='Enter Gift Name'
                    type='text'
                    name='gift_category'
                    className={clsx('form-control form-control-solid mb-3 mb-lg-0 me-3')}
                    autoComplete='off'
                    value={giftName}
                    onChange={(e) => setGiftName(e.target.value)}
                  />

                  <input
                    placeholder='Enter Gift Credit'
                    type='number'
                    name='gift-credit'
                    className={clsx('form-control form-control-solid mb-3 mb-lg-0 mt-4')}
                    autoComplete='off'
                    value={giftCredit}
                    onChange={(e) => setGiftCredit(Math.abs(parseInt(e.target.value)))}
                  />
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-light'
                data-bs-dismiss='modal'
                onClick={() => {
                  setIsEditGift(false)
                  setSelectedGiftCategoryID(0)
                  setGiftId('')
                  setGiftName('')
                  setGiftCredit(1)
                  setCurrentImageTempPath('')
                  setisImageUploaded(false)
                }}
              >
                Close
              </button>
              {IsEditGift && (
                <button
                  type='button'
                  className='btn btn-danger'
                  data-bs-dismiss='modal'
                  onClick={() => {
                    deleteGift()
                  }}
                >
                  Delete Gift
                </button>
              )}
              <button
                type='button'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                onClick={() => {
                  IsEditGift ? updateGift() : createGift()
                }}
              >
                {IsEditGift ? 'Update Gift' : 'Add Gifts'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Gifts
