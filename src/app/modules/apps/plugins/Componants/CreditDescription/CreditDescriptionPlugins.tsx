/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState, useRef} from 'react'
import Table from 'react-bootstrap/Table'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {
  CreateCreditPackages,
  deleteCreditPackages,
  getCreditPackages,
  updateCreditPackages,
} from '../../../../../../API/api-endpoint'
import {KTCardBody} from '../../../../../../_metronic/helpers'
import ToastUtils from '../../../../../../utils/ToastUtils'

const CreditDescriptionPlugins = () => {
  const [tableData, setTableData] = useState<any>([])
  const [file, setFile] = useState('')
  const [getCreditPackageFlag, setGetCreditPackageFlag] = useState(1)
  const [currentImageTempPath, setCurrentImageTempPath] = useState<any>('')
  const [isImageUploaded, setisImageUploaded] = useState<any>(false)
  const [creditPackageFormValue, setCreditPackageFormValue] = useState({
    heading: '',
    description: '',
    icon: '',
  })

  const hiddenFileInput = useRef<HTMLInputElement>(document.createElement('input'))
  const hiddenCurrentFileInput = useRef<HTMLInputElement>(document.createElement('input'))

  useEffect(() => {
    getAllCreditPackages()
  }, [getCreditPackageFlag])

  const getAllCreditPackages = async () => {
    let result = await getCreditPackages()
    //console.log('result', result.data.description)
    setTableData(result.data.description)
  }

  const handleAddRow = async () => {
    let oldTableData = [...tableData]
    oldTableData.splice(0, 0, creditPackageFormValue)
    setTableData(oldTableData)

    //create questions api
    let result = await CreateCreditPackages(
      creditPackageFormValue.heading,
      creditPackageFormValue.description,
      file
    )
    if (result.status === 200) {
      setCreditPackageFormValue({
        heading: '',
        description: '',
        icon: '',
      })
      //setFile(''
      setGetCreditPackageFlag(getCreditPackageFlag + 1)
      ToastUtils({type: 'success', message: 'Package Was Added'})
      setisImageUploaded(false)
    } else {
      ToastUtils({type: 'error', message: 'Package Was Not Added'})
    }
  }

  const handleInputChange = (event: any, index: any) => {
    if (event.target.name !== 'icon') {
      const updatedTableData = [...tableData]
      updatedTableData[index][event.target.name] = event.target.value
      setTableData(updatedTableData)
    } else if (event.target.name === 'genderId') {
      const updatedTableData = [...tableData]
      updatedTableData[index][event.target.name] = parseInt(event.target.value)
      setTableData(updatedTableData)
    } else {
      const updatedTableData = [...tableData]
      updatedTableData[index][event.target.name] = event.target.files[0]
      setTableData(updatedTableData)
    }
  }

  const handleCurrentInputChange = (event: any) => {
    if (event.target.name !== 'icon') {
      setCreditPackageFormValue({
        ...creditPackageFormValue,
        [event.target.name]: event.target.value,
      })
    } else if (event.target.name === 'genderId') {
      setCreditPackageFormValue({
        ...creditPackageFormValue,
        [event.target.name]: parseInt(event.target.value),
      })
    } else {
      console.log([event.target.name], event.target.files[0])
      setCreditPackageFormValue({
        ...creditPackageFormValue,
        [event.target.name]: event.target.files[0],
      })
    }
  }

  const handleUpdateQuestion = async (creditPackageId: any) => {
    let updatedData = tableData.filter(
      (question: any) => question.creditPackageId === creditPackageId
    )

    let result = await updateCreditPackages(updatedData[0], file)
    if (result.status === 200) {
      setCreditPackageFormValue({
        heading: '',
        description: '',
        icon: '',
      })
      setFile('')
      setCurrentImageTempPath('')
      setGetCreditPackageFlag(getCreditPackageFlag + 1)
      ToastUtils({type: 'success', message: 'Package Was Updated'})
    } else {
      ToastUtils({type: 'error', message: 'Package Was Not Updated'})
    }
  }

  const handleIconChange = (event: any) => {
    setisImageUploaded(true)
    const fileUploaded = event.target.files[0]
    var tmppath = URL.createObjectURL(event.target.files[0])
    setCurrentImageTempPath(tmppath)
    // const updatedTableData = [...tableData]
    // updatedTableData[index]['icon'] = fileUploaded
    // setTableData(updatedTableData)
    setFile(fileUploaded)
  }

  const handleClick = (index: any) => {
    const fileInput = document.getElementById(`fileInput${index}`)
    fileInput?.click()
  }

  const removeCreditPackage = async (id: any) => {
    let result = await deleteCreditPackages(id)
    if (result.status === 200) {
      setGetCreditPackageFlag(getCreditPackageFlag + 1)
      ToastUtils({type: 'success', message: 'Package Was Deleted'})
    } else {
      ToastUtils({type: 'error', message: 'Package Was Not Deleted'})
    }
  }

  const handleChange = (index: any) => {
    let oldData = [...tableData]
    oldData[index].icon = null
    setTableData(oldData)
  }

  return (
    <KTCardBody className='py-4 '>
      {/* <span className='fs-3 fw-bold '>Questions</span> */}
      <Table striped bordered hover className='mt-5'>
        <thead>
          <tr>
            <th>Icon</th>
            <th>Heading</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row: any, index: any) => (
            <tr key={index}>
              <td>
                {row.icon === null ? (
                  <>
                    <button
                      className='btn btn-light'
                      type='button'
                      onClick={() => handleClick(index)}
                    >
                      <i className='fa-solid fa-upload'></i>
                    </button>
                    <input
                      type='file'
                      name='icon'
                      id={`fileInput${index}`}
                      onChange={(e) => handleIconChange(e)}
                      ref={hiddenFileInput}
                      style={{display: 'none'}} // Make the file input element invisible
                      accept='image/*'
                    />
                  </>
                ) : (
                  <div
                    className='symbol symbol-50px overflow-visible me-3'
                    onClick={() => handleChange(index)}
                  >
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}/${row.icon}`}
                      alt='Icon'
                      width='50px'
                      height='50px'
                      loading='lazy'
                    />
                  </div>
                )}
              </td>
              <td>
                <InputGroup>
                  <FormControl
                    placeholder='Enter Heading'
                    name='heading'
                    value={row.heading}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                </InputGroup>
              </td>
              <td>
                <InputGroup>
                  <FormControl
                    placeholder='Enter Description'
                    name='description'
                    value={row.description}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                </InputGroup>
              </td>
              <td>
                <Button
                  size='sm'
                  variant='primary'
                  onClick={() => handleUpdateQuestion(row.creditPackageId)}
                >
                  <i className='fa-solid fa-circle-check'></i>
                </Button>{' '}
                <Button
                  size='sm'
                  variant='danger'
                  onClick={() => removeCreditPackage(row.creditPackageId)}
                >
                  <i className='fa-solid fa-trash'></i>
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              {isImageUploaded ? (
                <div className='symbol symbol-50px overflow-visible me-3'>
                  <img
                    src={currentImageTempPath}
                    alt='Icon'
                    width='50px'
                    height='50px'
                    loading='lazy'
                  />
                </div>
              ) : (
                <>
                  <button
                    className='btn btn-light'
                    type='button'
                    onClick={() => hiddenCurrentFileInput.current.click()}
                  >
                    <i className='fa-solid fa-upload'></i>
                  </button>
                  <input
                    type='file'
                    name='icon'
                    onChange={(event) => handleIconChange(event)}
                    ref={hiddenCurrentFileInput}
                    style={{display: 'none'}}
                    accept='image/*'
                  />
                </>
              )}

              {/* <div className='symbol symbol-50px overflow-visible me-3'>
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}/${row.icon}`}
                  alt='Icon'
                  width='50px'
                  height='50px'
                />
              </div> */}
            </td>
            <td>
              <InputGroup>
                <FormControl
                  placeholder='Enter Heading'
                  name='heading'
                  value={creditPackageFormValue.heading}
                  onChange={(event) => handleCurrentInputChange(event)}
                />
              </InputGroup>
            </td>
            <td>
              <InputGroup>
                <FormControl
                  placeholder='Enter Description'
                  name='description'
                  value={creditPackageFormValue.description}
                  onChange={(event) => handleCurrentInputChange(event)}
                />
              </InputGroup>
            </td>
            <td>
              <Button size='sm' variant='primary' onClick={handleAddRow}>
                <i className='fa-solid fa-plus'></i>
              </Button>{' '}
            </td>
          </tr>
        </tbody>
      </Table>
    </KTCardBody>
  )
}

export default CreditDescriptionPlugins
