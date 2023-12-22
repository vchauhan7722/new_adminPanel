// import {useEffect, useRef, useState} from 'react'
// import {KTIcon} from '../../../../../../../../_metronic/helpers' //'../../../../_metronic/helpers'
// import {Step2} from './steps/Step2'
// import {Step3} from './steps/Step3'
// import {StepperComponent} from '../../../../../../../../_metronic/assets/ts/components'
// import clsx from 'clsx'
// import {getCitiesBYSearch} from '../../../../../../../../API/api-endpoint'

// const Vertical = () => {
//   const stepperRef = useRef<HTMLDivElement | null>(null)
//   const stepper = useRef<StepperComponent | null>(null)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [suggestions, setSuggestions] = useState([])
//   const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)
//   const [step1Details, setStep1Details] = useState<any>({
//     fullName: '',
//     userName: '',
//     genderId: '1',
//     birthDate: new Date().toLocaleDateString('en-CA'),
//     country: '',
//     state: '',
//     city: '',
//     bio: '',
//   })

//   const loadStepper = () => {
//     stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
//   }

//   const prevStep = () => {
//     if (!stepper.current) {
//       return
//     }

//     stepper.current.goPrev()

//     //setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
//   }

//   const submitStep = (values: any, actions: any) => {
//     console.log('submitted')
//     if (!stepper.current) {
//       return
//     }

//     if (stepper.current.currentStepIndex !== stepper.current.totalStepsNumber) {
//       stepper.current.goNext()
//     } else {
//       stepper.current.goto(1)
//       actions.resetForm()
//     }

//     //setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
//   }

//   useEffect(() => {
//     if (!stepperRef.current) {
//       return
//     }

//     loadStepper()
//   }, [stepperRef])

//   const handleStep1Change = (e) => {
//     let name = e.target.name
//     let value = e.target.value

//     setStep1Details({...step1Details, [name]: value})
//   }

//   const handleSearchChange = async (event) => {
//     console.log(event.target.value)
//     const inputValue = event.target.value

//     let spiltData = inputValue.split(',')
//     setStep1Details({
//       ...step1Details,
//       city: spiltData[0],
//       state: spiltData[1],
//       country: spiltData[2],
//     })

//     setSearchTerm(inputValue)

//     if (inputValue.length > 3) {
//       const filteredSuggestions = await getCitiesBYSearch(inputValue)

//       setSuggestions(filteredSuggestions.data)
//       setActiveSuggestionIndex(-1)
//     } else if (inputValue.length === 0) {
//       setSuggestions([])
//     }
//   }

//   return (
//     <div
//       ref={stepperRef}
//       className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
//       id='kt_create_account_stepper'
//     >
//       {/* begin::Aside*/}
//       <div className='card d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9'>
//         {/* begin::Wrapper*/}
//         <div className='card-body px-6 px-lg-10 px-xxl-15 py-20'>
//           {/* begin::Nav*/}
//           <div className='stepper-nav'>
//             {/* begin::Step 1*/}
//             <div className='stepper-item current' data-kt-stepper-element='nav'>
//               {/* begin::Wrapper*/}
//               <div className='stepper-wrapper'>
//                 {/* begin::Icon*/}
//                 <div className='stepper-icon w-40px h-40px'>
//                   <i className='stepper-check fas fa-check'></i>
//                   <span className='stepper-number'>1</span>
//                 </div>
//                 {/* end::Icon*/}

//                 {/* begin::Label*/}
//                 <div className='stepper-label'>
//                   <h3 className='stepper-title'>Basic Account Details</h3>

//                   <div className='stepper-desc fw-semibold'>Setup Your Basic Account Details</div>
//                 </div>
//                 {/* end::Label*/}
//               </div>
//               {/* end::Wrapper*/}

//               {/* begin::Line*/}
//               <div className='stepper-line h-40px'></div>
//               {/* end::Line*/}
//             </div>
//             {/* end::Step 1*/}

//             {/* begin::Step 2*/}
//             <div className='stepper-item' data-kt-stepper-element='nav'>
//               {/* begin::Wrapper*/}
//               <div className='stepper-wrapper'>
//                 {/* begin::Icon*/}
//                 <div className='stepper-icon w-40px h-40px'>
//                   <i className='stepper-check fas fa-check'></i>
//                   <span className='stepper-number'>2</span>
//                 </div>
//                 {/* end::Icon*/}

//                 {/* begin::Label*/}
//                 <div className='stepper-label'>
//                   <h3 className='stepper-title'>Question Answer Details</h3>
//                   <div className='stepper-desc fw-semibold'>
//                     Select Question Answer and Interest
//                   </div>
//                 </div>
//                 {/* end::Label*/}
//               </div>
//               {/* end::Wrapper*/}

//               {/* begin::Line*/}
//               <div className='stepper-line h-40px'></div>
//               {/* end::Line*/}
//             </div>
//             {/* end::Step 2*/}

//             {/* begin::Step 3*/}
//             <div className='stepper-item' data-kt-stepper-element='nav'>
//               {/* begin::Wrapper*/}
//               <div className='stepper-wrapper'>
//                 {/* begin::Icon*/}
//                 <div className='stepper-icon w-40px h-40px'>
//                   <i className='stepper-check fas fa-check'></i>
//                   <span className='stepper-number'>3</span>
//                 </div>
//                 {/* end::Icon*/}

//                 {/* begin::Label*/}
//                 <div className='stepper-label'>
//                   <h3 className='stepper-title'>Media Details</h3>
//                   <div className='stepper-desc fw-semibold'>
//                     Select Your Profile Photo and Another Media
//                   </div>
//                 </div>
//                 {/* end::Label*/}
//               </div>
//               {/* end::Wrapper*/}
//             </div>
//             {/* end::Step 3*/}
//           </div>
//           {/* end::Nav*/}
//         </div>
//         {/* end::Wrapper*/}
//       </div>
//       {/* begin::Aside*/}

//       <div className='d-flex flex-row-fluid flex-center bg-body rounded'>
//         <div className='current' data-kt-stepper-element='content'>
//           <div className='w-100'>
//             <div className='pb-10 pb-lg-12'>
//               <h2 className='fw-bolder text-dark'>Basic Account Details</h2>

//               <div className='text-gray-400 fw-bold fs-6'>Fill The Basic Details .</div>
//             </div>

//             <div className='fv-row mb-10'>
//               <label className='form-label required'>Full Name</label>

//               <input
//                 type='text'
//                 name='fullName'
//                 className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
//                 autoComplete='off'
//                 value={step1Details?.fullName}
//                 onChange={(e) => handleStep1Change(e)}
//               />
//             </div>

//             <div className='fv-row mb-10'>
//               <label className='d-flex align-items-center form-label'>
//                 <span className='required'>User Name</span>
//               </label>
//               <input
//                 type='text'
//                 name='userName'
//                 className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
//                 autoComplete='off'
//                 value={step1Details?.userName}
//                 onChange={(e) => handleStep1Change(e)}
//               />
//             </div>

//             <div className='fv-row mb-10'>
//               <label className='form-label required'>Location</label>

//               <input
//                 id='search-input'
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 className={clsx('form-control form-control-solid ')}
//               />
//               <div className={suggestions.length > 3 ? clsx('h-200px scroll-y') : ''}>
//                 <ul
//                   className='list-group suggestions'
//                   style={{
//                     display: suggestions.length > 0 ? 'block' : 'none',
//                   }}
//                 >
//                   {suggestions.map((suggestion: any, index: any) => {
//                     const isActive = index === activeSuggestionIndex
//                     return (
//                       <li
//                         key={index}
//                         className={`list-group-item ${isActive ? 'active' : ''}`}
//                         onClick={() => {
//                           setSearchTerm(
//                             `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
//                           )
//                           setStep1Details({
//                             ...step1Details,
//                             city: suggestion.name,
//                             state: suggestion.state,
//                             country: suggestion.country,
//                           })
//                           setActiveSuggestionIndex(-1)
//                           setSuggestions([])
//                         }}
//                       >
//                         {`${suggestion.name}, ${suggestion.state}, ${suggestion.country}`}
//                       </li>
//                     )
//                   })}
//                 </ul>
//               </div>
//             </div>

//             <div className='fv-row mb-10'>
//               <label className='form-label required'>BirthDate</label>

//               <input
//                 placeholder='Birthdate'
//                 type='date'
//                 name='birthDate'
//                 className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
//                 autoComplete='off'
//                 value={new Date(step1Details?.birthDate).toLocaleDateString('en-CA')}
//                 onChange={(e) => handleStep1Change(e)}
//               />
//             </div>

//             <div className='fv-row mb-10'>
//               <label className='form-label required'>Gender</label>

//               <select
//                 className='form-select form-select-solid fw-bolder'
//                 data-kt-select2='true'
//                 data-placeholder='Select option'
//                 data-allow-clear='true'
//                 data-kt-user-table-filter='gender'
//                 data-hide-search='true'
//                 name='gender'
//                 defaultValue={step1Details?.genderId}
//                 //value={profileDetailsFormValue?.gender}
//                 onChange={(e) => handleStep1Change(e)}
//               >
//                 <option value='1'>Male</option>
//                 <option value='2'>Female</option>
//               </select>
//             </div>

//             <div className='fv-row mb-10'>
//               <label className='form-label required'>Bio</label>

//               <textarea
//                 name='bio'
//                 className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
//                 autoComplete='off'
//                 rows={5}
//                 value={step1Details?.bio}
//                 onChange={(e) => handleStep1Change(e)}
//               />
//             </div>
//           </div>
//         </div>

//         <div data-kt-stepper-element='content'>
//           <Step2 />
//         </div>

//         <div data-kt-stepper-element='content'>
//           <Step3 />
//         </div>

//         <div className='d-flex flex-stack pt-10'>
//           <div className='mr-2'>
//             <button
//               onClick={prevStep}
//               type='button'
//               className='btn btn-lg btn-light-primary me-3'
//               data-kt-stepper-action='previous'
//             >
//               <KTIcon iconName='arrow-left' className='fs-4 me-1' />
//               Back
//             </button>
//           </div>

//           <div>
//             <button type='submit' className='btn btn-lg btn-primary me-3'>
//               <span className='indicator-label'>
//                 {stepper.current?.currentStepIndex !== stepper.current?.totalStepsNumber &&
//                   'Submit'}
//                 {stepper.current?.currentStepIndex === stepper.current?.totalStepsNumber &&
//                   'Submit'}
//                 <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export {Vertical}

import {useEffect, useRef, useState} from 'react'
import {KTIcon} from '../../../../../../../../_metronic/helpers'
import {Step1} from './steps/Step1'
import {Step2} from './steps/Step2'
import {Step3} from './steps/Step3'
import {StepperComponent} from '../../../../../../../../_metronic/assets/ts/components'
import {Form, Formik, FormikValues} from 'formik'
import {createAccountSchemas, ICreateAccount, inits} from './CreateAccountWizardHelper'

const Vertical = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [initValues] = useState<ICreateAccount>(inits)

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()

    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
  }

  const submitStep = (values: ICreateAccount, actions: FormikValues) => {
    if (!stepper.current) {
      return
    }

    if (stepper.current.currentStepIndex !== stepper.current.totalStepsNumber) {
      stepper.current.goNext()
    } else {
      stepper.current.goto(1)
      actions.resetForm()
    }

    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
  }

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

  return (
    <div
      ref={stepperRef}
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
            <div className='stepper-item current' data-kt-stepper-element='nav'>
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
            <div className='stepper-item' data-kt-stepper-element='nav'>
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
            <div className='stepper-item' data-kt-stepper-element='nav'>
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

      <div className='d-flex flex-row-fluid flex-center bg-body rounded'>
        <Formik validationSchema={currentSchema} initialValues={initValues} onSubmit={submitStep}>
          {() => (
            <Form className='py-20 w-100 w-xl-700px px-9' noValidate id='kt_create_account_form'>
              <div className='current' data-kt-stepper-element='content'>
                <Step1 />
              </div>

              <div data-kt-stepper-element='content'>
                <Step2 />
              </div>

              <div data-kt-stepper-element='content'>
                <Step3 />
              </div>

              <div className='d-flex flex-stack pt-10'>
                <div className='mr-2'>
                  <button
                    onClick={prevStep}
                    type='button'
                    className='btn btn-lg btn-light-primary me-3'
                    data-kt-stepper-action='previous'
                  >
                    <KTIcon iconName='arrow-left' className='fs-4 me-1' />
                    Back
                  </button>
                </div>

                <div>
                  <button type='submit' className='btn btn-lg btn-primary me-3'>
                    <span className='indicator-label'>
                      {stepper.current?.currentStepIndex !==
                        stepper.current?.totalStepsNumber! - 1 && 'Continue'}
                      {stepper.current?.currentStepIndex ===
                        stepper.current?.totalStepsNumber! - 1 && 'Submit'}
                      <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
                    </span>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export {Vertical}
