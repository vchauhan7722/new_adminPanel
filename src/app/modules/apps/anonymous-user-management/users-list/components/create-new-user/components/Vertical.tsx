import {useEffect, useRef, useState} from 'react'
import {Step1} from './steps/Step1'
import {Step2} from './steps/Step2'
import {Step3} from './steps/Step3'

import clsx from 'clsx'

const Vertical = () => {
  const [stepValue, setStepValue] = useState(1)
  const [currentUserId, setCurrentUserId] = useState(1)

  const prevStep = () => {
    // if (!stepper.current) {
    //   return
    // }

    // stepper.current.goPrev()

    // setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
    if (stepValue !== 1) {
      setStepValue((prev) => prev - 1)
    }
  }

  const submitStep = () => {
    if (stepValue !== 3) {
      setStepValue(stepValue + 1)
    }
    // actions.preventDefault()
    // if (!stepper.current) {
    //   return
    // }

    // if (stepper.current.currentStepIndex !== stepper.current.totalStepsNumber) {
    //   stepper.current.goNext()
    // } else {
    //   stepper.current.goto(1)
    //   actions.resetForm()
    // }
  }

  const renderStep = () => {
    switch (stepValue) {
      case 1:
        return (
          <div className='d-flex flex-row-fluid flex-center bg-body rounded'>
            <form className='py-3 w-100 px-9' noValidate id='kt_create_account_form'>
              <div className='current' data-kt-stepper-element='content'>
                <Step1 submitStep={submitStep} prevStep={prevStep} />
              </div>
            </form>
          </div>
        )

      case 2:
        return (
          <div className='d-flex flex-row-fluid flex-center bg-body rounded h-100vh'>
            <div className='py-20 w-100 w-xl-700px px-9'>
              <div className='current' data-kt-stepper-element='content'>
                <Step2 submitStep={submitStep} prevStep={prevStep} />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className='d-flex flex-row-fluid flex-center bg-body rounded h-100vh'>
            <div className='py-20 w-100 w-xl-700px px-9'>
              <div className='current' data-kt-stepper-element='content'>
                <Step3 submitStep={submitStep} prevStep={prevStep} />
              </div>
            </div>
          </div>
        )

      default:
        break
    }
  }

  return (
    <div
      //ref={stepperRef}
      className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
      id='kt_create_account_stepper'
    >
      {/* begin::Aside*/}
      <div className='card d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9'>
        {/* begin::Wrapper*/}
        <div className='card-body px-6 px-lg-10 px-xxl-15 py-20'>
          {/* begin::Nav*/}
          <div className='stepper-nav'>
            {/* begin::Step 1*/}
            <div
              className={clsx('stepper-item', stepValue === 1 && 'current')}
              data-kt-stepper-element='nav'
            >
              {/* begin::Wrapper*/}
              <div className='stepper-wrapper'>
                {/* begin::Icon*/}
                <div className='stepper-icon w-40px h-40px'>
                  <i className='stepper-check fas fa-check'></i>
                  <span className='stepper-number'>1</span>
                </div>
                {/* end::Icon*/}

                {/* begin::Label*/}
                <div className='stepper-label'>
                  <h3 className='stepper-title'>Basic Account Details</h3>

                  <div className='stepper-desc fw-semibold'>Setup Your Basic Account Details</div>
                </div>
                {/* end::Label*/}
              </div>
              {/* end::Wrapper*/}

              {/* begin::Line*/}
              <div className='stepper-line h-40px'></div>
              {/* end::Line*/}
            </div>
            {/* end::Step 1*/}

            {/* begin::Step 2*/}
            <div
              className={clsx('stepper-item', stepValue === 2 && 'current')}
              data-kt-stepper-element='nav'
            >
              {/* begin::Wrapper*/}
              <div className='stepper-wrapper'>
                {/* begin::Icon*/}
                <div className='stepper-icon w-40px h-40px'>
                  <i className='stepper-check fas fa-check'></i>
                  <span className='stepper-number'>2</span>
                </div>
                {/* end::Icon*/}

                {/* begin::Label*/}
                <div className='stepper-label'>
                  <h3 className='stepper-title'>Questions and Answers Settings</h3>
                  <div className='stepper-desc fw-semibold'>
                    Select Your Interest With Question Answer
                  </div>
                </div>
                {/* end::Label*/}
              </div>
              {/* end::Wrapper*/}

              {/* begin::Line*/}
              <div className='stepper-line h-40px'></div>
              {/* end::Line*/}
            </div>
            {/* end::Step 2*/}

            {/* begin::Step 3*/}
            <div
              className={clsx('stepper-item', stepValue === 3 && 'current')}
              data-kt-stepper-element='nav'
            >
              {/* begin::Wrapper*/}
              <div className='stepper-wrapper'>
                {/* begin::Icon*/}
                <div className='stepper-icon w-40px h-40px'>
                  <i className='stepper-check fas fa-check'></i>
                  <span className='stepper-number'>3</span>
                </div>
                {/* end::Icon*/}

                {/* begin::Label*/}
                <div className='stepper-label'>
                  <h3 className='stepper-title'>Media Details</h3>
                  <div className='stepper-desc fw-semibold'>
                    Select Your Profile Picture and another media
                  </div>
                </div>
                {/* end::Label*/}
              </div>
              {/* end::Wrapper*/}
            </div>
            {/* end::Step 3*/}
          </div>
          {/* end::Nav*/}
        </div>
        {/* end::Wrapper*/}
      </div>
      {/* begin::Aside*/}

      {renderStep()}
    </div>
  )
}

export {Vertical}
