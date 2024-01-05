import React, {FC, useEffect, useState} from 'react'
import {ErrorMessage, Field} from 'formik'
import {KTIcon} from '../../../../../../../../../_metronic/helpers'
import {
  UpdateUserInterestAndQuestions,
  addUserInterest,
  getAllInterest,
  getUserQuestionAnswerForProfile,
  removeUserInterest,
} from '../../../../../../../../../API/api-endpoint'
import ToastUtils, {ErrorToastUtils} from '../../../../../../../../../utils/ToastUtils'

const Step2 = (props: any) => {
  const {submitStep, prevStep, userID} = props

  const [questionList, setQuestionList] = useState<any>([])
  const [allInterestList, setallInterestList] = useState<any>([])
  const [selectedInterestList, setselectedInterestList] = useState<any>([])
  const [selectedInterestListWithId, setselectedInterestListWithId] = useState<any>([])
  const [selectedQuestionList, setSelectedQuestionList] = useState<any>([])

  useEffect(() => {
    getAllQuestionAnswer()
    getAllInterestList()
  }, [])

  const getAllQuestionAnswer = async () => {
    let result = await getUserQuestionAnswerForProfile(userID)
    setQuestionList(result)
  }

  const getAllInterestList = async () => {
    let result = await getAllInterest()
    setallInterestList(result)
  }

  //for Interest

  const addUserInterestInList = async (interestID: any, interestName: any) => {
    let oldSelectedInterest = [...selectedInterestList]
    let interestObject = {
      interestId: interestID,
      interests: {
        name: interestName,
      },
    }
    oldSelectedInterest.push(interestObject)
    setselectedInterestList(oldSelectedInterest)

    let oldSelectedInterest1 = [...selectedInterestListWithId]
    let interestObject1 = {
      interestId: interestID,
    }
    oldSelectedInterest1.push(interestObject1)
    setselectedInterestListWithId(oldSelectedInterest1)
  }

  const removeUserInterestInList = async (interestID: any) => {
    let index = selectedInterestList.findIndex((item: any) => item.interestId === interestID)
    let oldSelectedInterest = [...selectedInterestList]
    oldSelectedInterest.splice(index, 1)
    setselectedInterestList(oldSelectedInterest)

    let index1 = selectedInterestListWithId.findIndex((item: any) => item.interestId === interestID)
    let oldSelectedInterest1 = [...selectedInterestListWithId]
    oldSelectedInterest.splice(index1, 1)
    setselectedInterestListWithId(oldSelectedInterest1)
  }

  //for questions

  const handleChangeQuestions = async (e: any, questionID: any) => {
    const matchedAnswerIds = selectedQuestionList.filter((item) => item.questionId === questionID)
    if (matchedAnswerIds.length !== 0) {
      let index = selectedQuestionList.findIndex((item: any) => item.questionId === questionID)
      let oldSelectedQuestionList = [...selectedQuestionList]
      let questionObject = {
        questionId: questionID,
        answerId: e.target.value,
      }
      oldSelectedQuestionList.splice(index, 1, questionObject)
      setSelectedQuestionList(oldSelectedQuestionList)
    } else {
      let oldSelectedQuestionList = [...selectedQuestionList]
      let questionObject = {
        questionId: questionID,
        answerId: e.target.value,
      }
      oldSelectedQuestionList.push(questionObject)
      setSelectedQuestionList(oldSelectedQuestionList)
    }
  }

  const onSubmitStep2 = async () => {
    // store data in local and add useEffect for assign data

    if (selectedInterestListWithId.length !== 0 && selectedQuestionList.length !== 0) {
      let result = await UpdateUserInterestAndQuestions(
        userID,
        selectedInterestListWithId,
        selectedQuestionList
      )
      if (result.status === 200) {
        ToastUtils({type: 'success', message: 'Details Saved SuccessFully'})
        submitStep(userID)
      } else {
        ErrorToastUtils()
      }
    } else {
      submitStep(userID)
    }
  }

  return (
    <div className='w-100'>
      {/*question Div start*/}

      <div className='row'>
        <h3 className='mb-3'>Profile Questions</h3>
        {questionList.map((q: any, index: any) => {
          return (
            <div key={index} className='row mb-3 col-lg-6'>
              <label className='col-lg-6 form-label fs-6 fw-bold'>{q.question}</label>
              <div className='col-lg-6'>
                <select
                  className='form-select-anonymous form-select-solid fw-bolder'
                  data-kt-select2='true'
                  data-placeholder='Select option'
                  data-allow-clear='true'
                  name='question'
                  data-hide-search='true'
                  //defaultValue={getDefaultValueOfAnswer(q.questionId)}
                  onChange={(e) => handleChangeQuestions(e, q.questionId)}
                >
                  <option value=''>select Option</option>
                  {q.answers.map((a: any, index: any) => {
                    return (
                      <option key={index} value={a.answerId}>
                        {a.answer}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          )
        })}
      </div>

      {/*question Div end*/}

      {/*Interest Div start*/}

      <div>
        <h3 className='mb-3'>Profile Interest</h3>
        {selectedInterestList.length !== 0 &&
          selectedInterestList.map((interest: any, index: any) => {
            return (
              <div
                key={index}
                className='badge bg-primary text-center text-white me-3 mb-2 fs-6  fw-bold pointer'
                onClick={() => removeUserInterestInList(interest.interestId)}
              >
                {interest?.interests?.name}
              </div>
            )
          })}
        {allInterestList
          .filter((item) => {
            return !selectedInterestList.some(
              (profileItem: any) => profileItem.interestId === item.interestId
            )
          })
          .map((interest: any, index: any) => {
            return (
              <>
                <div
                  key={index}
                  className='text-center me-3 mb-2 fs-6 fw-bold badge badge-light pointer'
                  onClick={() => addUserInterestInList(interest.interestId, interest.name)}
                >
                  {interest.name}
                </div>
              </>
            )
          })}
      </div>

      {/*Interest Div end*/}

      <div className='d-flex flex-end pt-10'>
        <div className='mr-2'>
          <button type='button' className='btn btn-sm btn-primary me-3' onClick={prevStep}>
            <span className='indicator-label'>
              <KTIcon iconName='arrow-left' className='fs-4 me-1' />
              Back
            </span>
          </button>
        </div>

        <div>
          <button type='button' className='btn btn-sm btn-primary me-3' onClick={onSubmitStep2}>
            <span className='indicator-label'>
              Continue
              <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export {Step2}
