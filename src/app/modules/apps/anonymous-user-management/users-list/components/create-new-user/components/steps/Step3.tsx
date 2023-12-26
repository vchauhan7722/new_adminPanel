import React, {FC, useEffect, useRef, useState} from 'react'
import {Field, ErrorMessage} from 'formik'
import {KTIcon} from '../../../../../../../../../_metronic/helpers'
import {
  UpdateUserProfilePicture,
  createMediaActionForUserMedia,
  getUserMediaImages,
} from '../../../../../../../../../API/api-endpoint'
import ToastUtils from '../../../../../../../../../utils/ToastUtils'
import {Link} from 'react-router-dom'

const Step3 = (props: any) => {
  const {submitStep, prevStep, userID = 564} = props

  const hiddenFileInput = useRef<HTMLInputElement>(document.createElement('input'))
  const hiddenMediaInput = useRef<HTMLInputElement>(document.createElement('input'))

  const [isImageUploaded, setisImageUploaded] = useState<any>(false)
  const [isMediaImageUploaded, setMediaisImageUploaded] = useState<any>(false)
  const [userProfileMedia, setUserProfileMedia] = useState<any>(undefined)

  const [file, setFile] = useState('')

  useEffect(() => {
    getMediaImageList()
  }, [])

  const getMediaImageList = async () => {
    let result = await getUserMediaImages(564)

    if (result.status === 200) {
      setUserProfileMedia(result.data)
    }
  }

  const handleClick = (e: any) => {
    e.preventDefault()
    const fileInput = document.getElementById(`fileInput`)
    fileInput?.click()
  }

  const handleMediaClick = (e: any) => {
    e.preventDefault()
    const fileInput = document.getElementById(`mediaInput`)
    fileInput?.click()
  }

  const handleIconChange = async (event: any) => {
    const fileUploaded = event.target.files[0]
    var tmppath = URL.createObjectURL(event.target.files[0])
    setFile(tmppath)
    let result = await UpdateUserProfilePicture(userID, fileUploaded)
    if (result.status === 200) {
      setisImageUploaded(true)
      ToastUtils({type: 'success', message: 'Your Profile Picture Updated'})
    } else {
      ToastUtils({type: 'error', message: 'Something Went Wrong'})
    }
  }

  const handleMediaChange = async (event: any) => {
    setMediaisImageUploaded(true)
    if (event.target.files[0]) {
      let result = await createMediaActionForUserMedia(event.target.files[0], userID)
      if (result.status === 200) {
        let oldmedia = [...userProfileMedia]

        oldmedia.push(result.data[0])
        setUserProfileMedia(oldmedia)
        ToastUtils({type: 'success', message: 'Your Media has Uploaded'})
        setMediaisImageUploaded(false)
      } else {
        ToastUtils({type: 'error', message: 'Error in Media Upload'})
        setMediaisImageUploaded(false)
      }
    }
  }

  const onSubmitStep3 = async () => {
    if (isImageUploaded) {
      submitStep()
    } else {
      ToastUtils({type: 'error', message: 'Please Update Profile Picture'})
    }
  }

  return (
    <div className='w-100'>
      <h3 className='mb-5'>Profile Picture</h3>
      <div className='symbol symbol-70px overflow-visible me-3'>
        <img
          src={
            `${file}` ||
            `https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`
          }
          alt='icon'
        />
        {!isImageUploaded && (
          <button
            className='ms-4 btn btn-primary'
            onClick={(e) => {
              handleClick(e)
              setisImageUploaded(false)
            }}
          >
            Choose Profile Picture
          </button>
        )}

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

      <hr />
      <div>
        <h3>Profile Media</h3>
        <div className='d-flex flex-end'>
          <button
            className='ms-4 btn btn-primary'
            onClick={(e) => {
              handleMediaClick(e)
              setisImageUploaded(false)
            }}
          >
            Upload Media
          </button>

          <input
            type='file'
            name='icon'
            id={`mediaInput`}
            onChange={(e) => handleMediaChange(e)}
            ref={hiddenMediaInput}
            style={{display: 'none'}} // Make the file input element invisible
            accept='image/*'
          />
        </div>
        <div className='row'>
          {userProfileMedia !== undefined &&
            userProfileMedia
              .filter((media) => media.status === true)
              .map((userMedia: any, index: any) => {
                return (
                  <div
                    className={userProfileMedia.length >= 6 ? 'col-lg-1' : 'col-lg-2'}
                    key={index}
                  >
                    <div
                      className='position-relative'
                      // onClick={() => {
                      //   setSelectedImage(userMedia.media)
                      // }}

                      // data-bs-toggle='modal'
                      // data-bs-target='#full_width_image_modal'
                    >
                      <img
                        alt='Pic'
                        src={`${process.env.REACT_APP_SERVER_URL}/${userMedia.media}`}
                        width={userProfileMedia.length >= 6 ? '50' : '100'}
                        height={userProfileMedia.length >= 6 ? '49' : '99'}
                        // width='192'
                        // height='189'
                        className='rounded'
                      />
                    </div>
                  </div>
                )
              })}
        </div>
      </div>

      <div className='d-flex flex-end pt-10'>
        {/* <div className='mr-2'>
          <button
            onClick={prevStep}
            type='button'
            className='btn btn-lg btn-light-primary me-3'
            data-kt-stepper-action='previous'
          >
            <KTIcon iconName='arrow-left' className='fs-4 me-1' />
            Back
          </button>
        </div> */}

        <div>
          <Link to='/apps/anonymous-user-management/users'>
            <button type='button' className='btn btn-sm btn-primary me-3' onClick={onSubmitStep3}>
              <span className='indicator-label'>
                Submit
                <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export {Step3}
