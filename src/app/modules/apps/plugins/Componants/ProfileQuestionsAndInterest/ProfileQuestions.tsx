/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react'
import Table from 'react-bootstrap/Table'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {
  addAnswer,
  addQuestions,
  getUserQuestionAnswerForProfile,
  updateAnswers,
  updateQuestions,
} from '../../../../../../API/api-endpoint'
import {Form} from 'react-bootstrap'
import {KTCardBody} from '../../../../../../_metronic/helpers'
import {StatisticsWidget1} from '../../../../../../_metronic/partials/widgets'
import ToastUtils from '../../../../../../utils/ToastUtils'

const genders = [
  {name: 'All Genders', value: 0},
  {name: 'Male', value: 1},
  {name: 'Female', value: 2},
  {name: 'Lesbian', value: 3},
  {name: 'Gay', value: 4},
]

const Questions = () => {
  const userID = localStorage.getItem('userId')
  const [tableData, setTableData] = useState<any>([])
  const [file, setFile] = useState('')
  const [currentFile, setCurrentFile] = useState('')
  const [getQuestionFlag, setGetQuestionFlag] = useState(1)
  const [currentAnswer, setCurrentAnswer] = useState<any>([])
  const [questionFormValue, setQuetionFormValue] = useState({
    question: '',
    order: 0,
    inputType: 'text',
    genderId: 0,
    answers: [],
    icon: '',
  })

  const hiddenFileInput = useRef<HTMLInputElement>(document.createElement('input'))
  const hiddenCurrentFileInput = useRef<HTMLInputElement>(document.createElement('input'))

  useEffect(() => {
    getAllQuestionWithAnswer()
  }, [getQuestionFlag])

  const getAllQuestionWithAnswer = async () => {
    let result = await getUserQuestionAnswerForProfile(userID)
    setTableData(result)
  }

  const handleAddRow = async () => {
    let oldTableData = [...tableData]
    oldTableData.splice(0, 0, questionFormValue)
    setTableData(oldTableData)

    //create questions api
    let result = await addQuestions(
      questionFormValue.question,
      questionFormValue.order,
      questionFormValue.inputType,
      questionFormValue.genderId,
      file
    )
    if (result.status === 200) {
      setQuetionFormValue({
        question: '',
        order: 1,
        inputType: 'text',
        genderId: 0,
        answers: [],
        icon: '',
      })
      //setFile('')
      setCurrentFile('')
      setGetQuestionFlag(getQuestionFlag + 1)
      ToastUtils({type: 'success', message: 'Questions Was Added'})
    } else {
      ToastUtils({type: 'error', message: 'Questions Was Not Added'})
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
      setQuetionFormValue({...questionFormValue, [event.target.name]: event.target.value})
    } else if (event.target.name === 'genderId') {
      setQuetionFormValue({...questionFormValue, [event.target.name]: parseInt(event.target.value)})
    } else {
      console.log([event.target.name], event.target.files[0])
      setQuetionFormValue({...questionFormValue, [event.target.name]: event.target.files[0]})
    }
  }

  const handleRemoveQuestion = (index: any) => {
    //delete questions api
    const updatedTableData = [...tableData]
    updatedTableData.splice(index, 1)
    setTableData(updatedTableData)
  }

  const handleUpdateQuestion = async (questionId) => {
    //update questions api
    let updatedData = tableData.filter((question) => question.questionId === questionId)
    let result = await updateQuestions(updatedData[0], file)
    if (result.status === 200) {
      setQuetionFormValue({
        question: '',
        order: 1,
        inputType: 'text',
        genderId: 0,
        answers: [],
        icon: '',
      })
      setFile('')
      setCurrentFile('')
      setGetQuestionFlag(getQuestionFlag + 1)
      ToastUtils({type: 'success', message: 'Questions Was Updated'})
    } else {
      ToastUtils({type: 'error', message: 'Questions Was Not Updated'})
    }
  }

  const handleIconChange = (event: any) => {
    //console.log('index', index)
    const fileUploaded = event.target.files[0]
    console.log('fileUploaded', fileUploaded)
    // const updatedTableData = [...tableData]
    // updatedTableData[index]['icon'] = fileUploaded
    // setTableData(updatedTableData)
    setFile(fileUploaded)
  }

  const handleCurrentIconChange = (event: any) => {
    const fileUploaded = event.target.files[0]
    console.log(fileUploaded)
    setCurrentFile(fileUploaded)
  }

  const handleClick = (index: any) => {
    const fileInput = document.getElementById(`fileInput${index}`)
    fileInput?.click()
  }

  const handleCurrentAnswerChange = (event: any, questionId: any, questionIndex: any) => {
    const currentAnswerData = [...currentAnswer]
    currentAnswerData[questionIndex] = event.target.value
    setCurrentAnswer(currentAnswerData)
  }

  const handleUpdateAnswer = async (questionIndex: any, questionId: any) => {
    const updatedTableData = [...tableData]
    let answerArray = updatedTableData[questionIndex].answers
    console.log('answerArray', answerArray)
    //let answerText = currentAnswer[questionIndex]
    // let answerObject = {
    //   answer: answerText,
    //   questionId: questionIndex + 1,
    //   status: true,
    // }
    // answerArray.push(answerObject)
    let answerText = currentAnswer[questionIndex]
    if (answerText !== undefined) {
      //here call a add a answer api
      let result = await addAnswer(answerText, questionId)
      if (result.status === 200) {
        let oldAnswerDetails = [...currentAnswer]
        oldAnswerDetails[questionIndex] = ''
        setCurrentAnswer(oldAnswerDetails)
        setGetQuestionFlag(getQuestionFlag + 1)
      }
    }

    if (answerArray.length !== 0) {
      let response = await updateAnswers(answerArray)
      if (response.status === 200) {
        setGetQuestionFlag(getQuestionFlag + 1)
        ToastUtils({type: 'success', message: 'Answer Was Updated'})
      } else {
        ToastUtils({type: 'error', message: 'Answer Was Not Updated'})
      }
    }

    // updatedTableData[questionIndex].answers = answerArray
    // setTableData(updatedTableData)
  }

  const handleExitingAnswer = (questionIndex: any, answerIndex: any, event: any) => {
    const updatedTableData = [...tableData]
    console.log(updatedTableData[questionIndex].answers[answerIndex].answer)
    updatedTableData[questionIndex].answers[answerIndex].answer = event.target.value
    setTableData(updatedTableData)
  }

  return (
    <KTCardBody className='py-4 '>
      {/* <span className='fs-3 fw-bold '>Questions</span> */}
      <Table striped bordered hover className='mt-5'>
        <thead>
          <tr>
            <th>Icon</th>
            <th>Question</th>
            <th>Type</th>
            <th>Gender</th>
            <th>Order</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
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
                  <div className='symbol symbol-50px overflow-visible me-3'>
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}/${row.icon}`}
                      alt='Icon'
                      width='50px'
                      height='50px'
                    />
                  </div>
                )}
              </td>
              <td>
                <InputGroup>
                  <FormControl
                    placeholder='Enter Questions'
                    name='question'
                    value={row.question}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                </InputGroup>
              </td>
              <td>
                <Form.Select
                  name='type'
                  value={row.inputType}
                  onChange={(event) => handleInputChange(event, index)}
                >
                  <option value='text'>Text</option>
                  <option value='select'>Select</option>
                </Form.Select>
              </td>
              <td>
                <Form.Select
                  name='genderId'
                  defaultValue={row.genderId}
                  onChange={(event) => handleInputChange(event, index)}
                >
                  {genders.map((gender, optionIndex) => (
                    <option key={optionIndex} value={gender.value}>
                      {gender.name}
                    </option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <InputGroup>
                  <FormControl
                    placeholder='Order'
                    name='order'
                    value={row.order}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                </InputGroup>
              </td>
              <td>
                <Button
                  size='sm'
                  variant='primary'
                  onClick={() => handleUpdateQuestion(row.questionId)}
                >
                  <i className='fa-solid fa-circle-check'></i>
                </Button>{' '}
                <Button
                  size='sm'
                  variant='danger'
                  //onClick={() => handleRemoveQuestion(row.questionId)}
                >
                  <i className='fa-solid fa-trash'></i>
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
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
                  placeholder='Enter Questions'
                  name='question'
                  value={questionFormValue.question}
                  onChange={(event) => handleCurrentInputChange(event)}
                />
              </InputGroup>
            </td>
            <td>
              <Form.Select
                name='inputType'
                value={questionFormValue.inputType}
                onChange={(event) => handleCurrentInputChange(event)}
              >
                <option value='text'>Text</option>
                <option value='select'>Select</option>
              </Form.Select>
            </td>
            <td>
              <Form.Select
                name='genderId'
                value={questionFormValue.genderId}
                onChange={(event) => handleCurrentInputChange(event)}
              >
                {genders.map((gender, optionIndex) => (
                  <option key={optionIndex} value={gender.value}>
                    {gender.name}
                  </option>
                ))}
              </Form.Select>
            </td>
            <td>
              <Button size='sm' variant='primary' onClick={handleAddRow}>
                <i className='fa-solid fa-plus'></i>
              </Button>{' '}
            </td>
          </tr>
        </tbody>
      </Table>
      <div className='card p-4 mb-4 fw-bold fs-6'>Possible answers for question type SELECT</div>
      <div>
        <div className='row g-5 g-xl-8'>
          {tableData !== undefined &&
            tableData.map((question: any, questionindex: number) => {
              return (
                <div className='col-xl-4' key={questionindex}>
                  <div className='card p-3' style={{height: '300px'}}>
                    <div className='d-flex justify-content-between'>
                      <h3 className='mt-3 fw-bold text-gray-800 fs-3'>{question.question}</h3>
                      <button
                        className='btn btn-light text-black'
                        onClick={() => handleUpdateAnswer(questionindex, question.questionId)}
                      >
                        Update
                      </button>
                    </div>
                    <hr></hr>
                    <div className='h-200px overflow-scroll'>
                      {question.answers.map((answer: any, answerindex: number) => {
                        return (
                          <FormControl
                            key={answerindex}
                            name='answer'
                            value={answer.answer}
                            onChange={(event) =>
                              handleExitingAnswer(questionindex, answerindex, event)
                            }
                            className='border border-0'
                          />
                        )
                      })}

                      <FormControl
                        placeholder='Add Answer'
                        name='answer'
                        value={currentAnswer[questionindex]}
                        onChange={(event) =>
                          handleCurrentAnswerChange(event, question.questionId, questionindex)
                        }
                        className='border border-0'
                      />
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </KTCardBody>
  )
}

export default Questions
