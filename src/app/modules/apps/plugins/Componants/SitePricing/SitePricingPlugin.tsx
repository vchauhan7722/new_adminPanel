import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import {FormControl, InputGroup, Table} from 'react-bootstrap'
import {
  CreateCreditPackageAmountPlan,
  CreatePremiumPackageAmountPlan,
  getCreditPackageAmountPlans,
  getPremiumPackageAmountPlans,
  updateCreditPackageAmountPlan,
  updatePremiumPackageAmountPlan,
} from '../../../../../../API/api-endpoint'
import ToastUtils from '../../../../../../utils/ToastUtils'

const SitePricingPlugin = () => {
  const [creditAmountPackages, setCreditAmountPackages] = useState<any>([])
  const [CreditPackageAmount, setCreditPackageAmount] = useState<any>('')
  const [CreditPackageCredits, setCreditPackageCredits] = useState<any>('')

  const [premiumAmountPackages, setPremiumAmountPackages] = useState<any>([])
  const [PremiumPackageAmount, setPremiumPackageAmount] = useState<any>('')
  const [PremiumPackageCredits, setPremiumPackageCredits] = useState<any>('')
  const [PremiumPackageName, setPremiumPackageName] = useState<any>('')

  useEffect(() => {
    getCreditAmountpackages()
    getPremiumAmountpackages()
  }, [])

  const getCreditAmountpackages = async () => {
    let result = await getCreditPackageAmountPlans()
    if (result.status === 200) {
      setCreditAmountPackages(result.data)
    }
  }

  const createCreditAmountPackages = async () => {
    let result = await CreateCreditPackageAmountPlan(CreditPackageCredits, CreditPackageAmount)
    if (result.status === 200) {
      ToastUtils({type: 'success', message: 'Credit Amount Package is Created'})
      getCreditAmountpackages()
      setCreditPackageAmount('')
      setCreditPackageCredits('')
    } else {
      ToastUtils({type: 'error', message: 'Something Went Wrong'})
    }
  }

  const getPremiumAmountpackages = async () => {
    let result = await getPremiumPackageAmountPlans()
    if (result.status === 200) {
      setPremiumAmountPackages(result.data)
    }
  }

  const createPremiumAmountPackages = async () => {
    let result = await CreatePremiumPackageAmountPlan(
      PremiumPackageCredits,
      PremiumPackageAmount,
      PremiumPackageName
    )
    if (result.status === 200) {
      ToastUtils({type: 'success', message: 'Premium Amount Package is Created'})
      getPremiumAmountpackages()
      setPremiumPackageAmount('')
      setPremiumPackageCredits('')
      setPremiumPackageName('')
    } else {
      ToastUtils({type: 'error', message: 'Something Went Wrong'})
    }
  }

  const handleCreditAmountPackagesInputChange = (event: any, index: any) => {
    const updatedcreditAmountPackages = [...creditAmountPackages]
    updatedcreditAmountPackages[index][event.target.name] = event.target.value
    setCreditAmountPackages(updatedcreditAmountPackages)
    let creditAmountPackagesID = updatedcreditAmountPackages[index].creditPackageAmountId
    let credit: any, amount: any
    if (event.target.name === 'credit') {
      credit = event.target.value
      amount = updatedcreditAmountPackages[index].amount
    } else {
      credit = updatedcreditAmountPackages[index].credit
      amount = event.target.value
    }
    updateCreditAmountPackages(creditAmountPackagesID, credit, amount)
  }

  const updateCreditAmountPackages = async (pkgId: any, credit: any, amount: any) => {
    let result = await updateCreditPackageAmountPlan(pkgId, credit, amount)
    if (result.status === 200) {
      ToastUtils({type: 'success', message: 'Credit Amount Package is Updated'})
    } else {
      ToastUtils({type: 'error', message: 'Something Went Wrong'})
    }
  }

  const handlePremiumAmountPackagesInputChange = (event: any, index: any) => {
    const updatedpremiumAmountPackages = [...premiumAmountPackages]
    updatedpremiumAmountPackages[index][event.target.name] = event.target.value
    setPremiumAmountPackages(updatedpremiumAmountPackages)
    let premiumPackageAmountId = updatedpremiumAmountPackages[index].premiumPackageAmountId
    let days: any, amount: any, pkgName: any
    if (event.target.name === 'days') {
      days = event.target.value
      amount = updatedpremiumAmountPackages[index].amount
      pkgName = updatedpremiumAmountPackages[index].premiumPackageName
    } else if (event.target.name === 'amount') {
      days = updatedpremiumAmountPackages[index].days
      amount = event.target.value
      pkgName = updatedpremiumAmountPackages[index].premiumPackageName
    } else {
      amount = updatedpremiumAmountPackages[index].amount
      days = updatedpremiumAmountPackages[index].days
      pkgName = event.target.value
    }
    updatePremiumAmountPackages(premiumPackageAmountId, days, amount, pkgName)
  }

  const updatePremiumAmountPackages = async (pkgId: any, days: any, amount: any, pkgName: any) => {
    let result = await updatePremiumPackageAmountPlan(pkgId, days, amount, pkgName)
    if (result.status === 200) {
      ToastUtils({type: 'success', message: 'Premium Amount Package is Updated'})
    } else {
      ToastUtils({type: 'error', message: 'Something Went Wrong'})
    }
  }

  return (
    <div className='row'>
      <div className='col-lg-6 '>
        <div className='card'>
          <div className='card-title p-4'>
            <div className='d-flex justify-content-between'>
              <h4 className='mt-4 '>Price in INR to buy credits</h4>
              <button
                className='btn btn-primary'
                data-bs-toggle='modal'
                data-bs-target='#add_credit_plan'
              >
                Add Plan
              </button>
            </div>
          </div>

          <div className='card-body'>
            <Table striped bordered hover className='mt-5'>
              <thead>
                <tr>
                  <th>Package Name</th>
                  <th>Credit</th>
                  <th>Price(Inr)</th>
                </tr>
              </thead>
              <tbody>
                {creditAmountPackages.length !== 0 &&
                  creditAmountPackages.map((creditAmountPackage: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>Credits package {creditAmountPackage?.creditPackageAmountId}</td>
                        <td>
                          <InputGroup>
                            <FormControl
                              placeholder='credits'
                              name='credit'
                              value={creditAmountPackage?.credit}
                              onChange={(event) =>
                                handleCreditAmountPackagesInputChange(event, index)
                              }
                            />
                          </InputGroup>
                        </td>
                        <td>
                          <InputGroup>
                            <FormControl
                              placeholder='Amount'
                              name='amount'
                              value={creditAmountPackage?.amount}
                              onChange={(event) =>
                                handleCreditAmountPackagesInputChange(event, index)
                              }
                            />
                          </InputGroup>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <div className='col-lg-6'>
        <div className='card'>
          <div className='card-title p-4'>
            <div className='d-flex justify-content-between'>
              <h4 className='mt-4'>Price in INR to buy Premium</h4>
              <button className='btn btn-primary'>Add Plan</button>
            </div>
          </div>
          <div className='card-body'>
            <Table striped bordered hover className='mt-5'>
              <thead>
                <tr>
                  <th>Package Name</th>
                  <th>Credit</th>
                  <th>Price(Inr)</th>
                </tr>
              </thead>
              <tbody>
                {premiumAmountPackages.length !== 0 &&
                  premiumAmountPackages.map((premiumAmountPackage: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          <InputGroup>
                            <FormControl
                              placeholder='premiumPackageName'
                              name='premiumPackageName'
                              value={premiumAmountPackage?.premiumPackageName}
                              onChange={(event) =>
                                handlePremiumAmountPackagesInputChange(event, index)
                              }
                            />
                          </InputGroup>
                        </td>
                        <td>
                          <InputGroup>
                            <FormControl
                              placeholder='days'
                              name='days'
                              value={premiumAmountPackage?.days}
                              onChange={(event) =>
                                handlePremiumAmountPackagesInputChange(event, index)
                              }
                            />
                          </InputGroup>
                        </td>
                        <td>
                          <InputGroup>
                            <FormControl
                              placeholder='amount'
                              name='amount'
                              value={premiumAmountPackage?.amount}
                              onChange={(event) =>
                                handlePremiumAmountPackagesInputChange(event, index)
                              }
                            />
                          </InputGroup>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <div className='col-lg-12 mt-4'>
        <div className='card'>
          <div className='card-title p-4'>
            <div className='d-flex justify-content-between'>
              <h2 className='mt-4'>Premium Packages Configuration</h2>
              {/* <button className='btn btn-primary'>Add Plan</button> */}
            </div>
          </div>
          <div className='card-body'>
            <div className='row'>
              <div className='col-lg-4 fw-bold fs-6'></div>
              <div className='col-lg-2'>
                <div className=' fw-bold fs-4'>Premium Package 1</div>
              </div>
              <div className='col-lg-2'>
                <div className=' fw-bold fs-4'>Premium Package 2</div>
              </div>
              <div className='col-lg-2'>
                <div className=' fw-bold fs-4'>Premium Package 3</div>
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-lg-4 fw-bold fs-6'>Chat/day</div>
              <div className='col-lg-2'>
                <input
                  placeholder='0'
                  type='number'
                  name='package_credit'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  // value={CreditPackageCredits}
                  // onChange={(e) => setCreditPackageCredits(Math.abs(parseInt(e.target.value)))}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  placeholder='0'
                  type='number'
                  name='package_credit'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  // value={CreditPackageCredits}
                  // onChange={(e) => setCreditPackageCredits(Math.abs(parseInt(e.target.value)))}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  placeholder='0'
                  type='number'
                  name='package_credit'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  // value={CreditPackageCredits}
                  // onChange={(e) => setCreditPackageCredits(Math.abs(parseInt(e.target.value)))}
                />
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-lg-4 fw-bold fs-6'>See who likes you</div>
              <div className='col-lg-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='onlinenow'
                  name='isOnline'

                  // onChange={(e) => handleChange(e)}
                  // checked={formValue.isOnline}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='onlinenow'
                  name='isOnline'
                  // onChange={(e) => handleChange(e)}
                  // checked={formValue.isOnline}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='onlinenow'
                  name='isOnline'
                  // onChange={(e) => handleChange(e)}
                  // checked={formValue.isOnline}
                />
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-lg-4 fw-bold fs-6'>See who visit you</div>
              <div className='col-lg-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='onlinenow'
                  name='isOnline'
                  // onChange={(e) => handleChange(e)}
                  // checked={formValue.isOnline}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='onlinenow'
                  name='isOnline'
                  // onChange={(e) => handleChange(e)}
                  // checked={formValue.isOnline}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='onlinenow'
                  name='isOnline'
                  // onChange={(e) => handleChange(e)}
                  // checked={formValue.isOnline}
                />
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-lg-4 fw-bold fs-6'>Video call</div>
              <div className='col-lg-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='onlinenow'
                  name='isOnline'
                  // onChange={(e) => handleChange(e)}
                  // checked={formValue.isOnline}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='onlinenow'
                  name='isOnline'
                  // onChange={(e) => handleChange(e)}
                  // checked={formValue.isOnline}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='onlinenow'
                  name='isOnline'
                  // onChange={(e) => handleChange(e)}
                  // checked={formValue.isOnline}
                />
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-lg-4 fw-bold fs-6'>Undo profile/day</div>
              <div className='col-lg-2'>
                <input
                  placeholder='0'
                  type='number'
                  name='package_credit'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  // value={CreditPackageCredits}
                  // onChange={(e) => setCreditPackageCredits(Math.abs(parseInt(e.target.value)))}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  placeholder='0'
                  type='number'
                  name='package_credit'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  // value={CreditPackageCredits}
                  // onChange={(e) => setCreditPackageCredits(Math.abs(parseInt(e.target.value)))}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  placeholder='0'
                  type='number'
                  name='package_credit'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  // value={CreditPackageCredits}
                  // onChange={(e) => setCreditPackageCredits(Math.abs(parseInt(e.target.value)))}
                />
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-lg-4 fw-bold fs-6'>Private photo</div>
              <div className='col-lg-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='onlinenow'
                  name='isOnline'
                  // onChange={(e) => handleChange(e)}
                  // checked={formValue.isOnline}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='onlinenow'
                  name='isOnline'
                  // onChange={(e) => handleChange(e)}
                  // checked={formValue.isOnline}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='onlinenow'
                  name='isOnline'
                  // onChange={(e) => handleChange(e)}
                  // checked={formValue.isOnline}
                />
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-lg-4 fw-bold fs-6'>Live stream</div>
              <div className='col-lg-2'>
                <input
                  placeholder='0'
                  type='text'
                  name='package_credit'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  // value={CreditPackageCredits}
                  // onChange={(e) => setCreditPackageCredits(Math.abs(parseInt(e.target.value)))}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  placeholder='0'
                  type='text'
                  name='package_credit'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  // value={CreditPackageCredits}
                  // onChange={(e) => setCreditPackageCredits(Math.abs(parseInt(e.target.value)))}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  placeholder='0'
                  type='text'
                  name='package_credit'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  // value={CreditPackageCredits}
                  // onChange={(e) => setCreditPackageCredits(Math.abs(parseInt(e.target.value)))}
                />
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-lg-4 fw-bold fs-6'>Upload reels</div>
              <div className='col-lg-2'>
                <input
                  placeholder='0'
                  type='number'
                  name='package_credit'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  // value={CreditPackageCredits}
                  // onChange={(e) => setCreditPackageCredits(Math.abs(parseInt(e.target.value)))}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  placeholder='0'
                  type='number'
                  name='package_credit'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  // value={CreditPackageCredits}
                  // onChange={(e) => setCreditPackageCredits(Math.abs(parseInt(e.target.value)))}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  placeholder='0'
                  type='number'
                  name='package_credit'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  // value={CreditPackageCredits}
                  // onChange={(e) => setCreditPackageCredits(Math.abs(parseInt(e.target.value)))}
                />
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-lg-4 fw-bold fs-6'>Free Credits</div>
              <div className='col-lg-2'>
                <input
                  placeholder='0'
                  type='number'
                  name='package_credit'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  // value={CreditPackageCredits}
                  // onChange={(e) => setCreditPackageCredits(Math.abs(parseInt(e.target.value)))}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  placeholder='0'
                  type='number'
                  name='package_credit'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  // value={CreditPackageCredits}
                  // onChange={(e) => setCreditPackageCredits(Math.abs(parseInt(e.target.value)))}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  placeholder='0'
                  type='number'
                  name='package_credit'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  // value={CreditPackageCredits}
                  // onChange={(e) => setCreditPackageCredits(Math.abs(parseInt(e.target.value)))}
                />
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-lg-4 fw-bold fs-6'>Spotlight</div>
              <div className='col-lg-2'>
                <select
                  className='form-select form-select-solid fw-bolder'
                  data-kt-select2='true'
                  data-placeholder='Select option'
                  data-allow-clear='true'
                  data-kt-user-table-filter='spotlight'
                  data-hide-search='true'
                  name='spotlight'
                  // value={formValue.city}
                  // onChange={(e) => handleChange(e)}
                >
                  <option value=''>Free</option>
                  <option value={'1'}>1 Days</option>
                  <option value={'7'}>1 Week</option>
                  <option value={'30'}>1 Month</option>
                </select>
              </div>
              <div className='col-lg-2'>
                <select
                  className='form-select form-select-solid fw-bolder'
                  data-kt-select2='true'
                  data-placeholder='Select option'
                  data-allow-clear='true'
                  data-kt-user-table-filter='spotlight'
                  data-hide-search='true'
                  name='spotlight'
                  // value={formValue.city}
                  // onChange={(e) => handleChange(e)}
                >
                  <option value=''>Free</option>
                  <option value={'1'}>1 Days</option>
                  <option value={'7'}>1 Week</option>
                  <option value={'30'}>1 Month</option>
                </select>
              </div>
              <div className='col-lg-2'>
                <select
                  className='form-select form-select-solid fw-bolder'
                  data-kt-select2='true'
                  data-placeholder='Select option'
                  data-allow-clear='true'
                  data-kt-user-table-filter='spotlight'
                  data-hide-search='true'
                  name='spotlight'
                  // value={formValue.city}
                  // onChange={(e) => handleChange(e)}
                >
                  <option value=''>Free</option>
                  <option value={'1'}>1 Days</option>
                  <option value={'7'}>1 Week</option>
                  <option value={'30'}>1 Month</option>
                </select>
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-lg-4 fw-bold fs-6'>Global online</div>
              <div className='col-lg-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='onlinenow'
                  name='isOnline'
                  // onChange={(e) => handleChange(e)}
                  // checked={formValue.isOnline}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='onlinenow'
                  name='isOnline'
                  // onChange={(e) => handleChange(e)}
                  // checked={formValue.isOnline}
                />
              </div>
              <div className='col-lg-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='onlinenow'
                  name='isOnline'
                  // onChange={(e) => handleChange(e)}
                  // checked={formValue.isOnline}
                />
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>

      <div className='modal fade' tabIndex={-1} id='add_credit_plan'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add Credit Plan</h5>
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
                placeholder='0'
                type='number'
                name='package_credit'
                className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                autoComplete='off'
                value={CreditPackageCredits}
                onChange={(e) => setCreditPackageCredits(Math.abs(parseInt(e.target.value)))}
              />
              &nbsp;&nbsp;&nbsp;
              <input
                placeholder='Enter Package Amount'
                type='number'
                name='package_amount'
                className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                autoComplete='off'
                value={CreditPackageAmount}
                onChange={(e) => setCreditPackageAmount(Math.abs(parseInt(e.target.value)))}
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
                onClick={createCreditAmountPackages}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='modal fade' tabIndex={-1} id='add_premium_plan'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add Premium Plan</h5>
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
                placeholder='Package Name'
                type='text'
                name='package_name'
                className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                autoComplete='off'
                value={PremiumPackageName}
                onChange={(e) => setPremiumPackageName(e.target.value)}
              />
              &nbsp;&nbsp;&nbsp;
              <input
                placeholder='0'
                type='number'
                name='package_credit'
                className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                autoComplete='off'
                value={PremiumPackageCredits}
                onChange={(e) => setPremiumPackageCredits(Math.abs(parseInt(e.target.value)))}
              />
              &nbsp;&nbsp;&nbsp;
              <input
                placeholder='Enter Package Amount'
                type='number'
                name='package_amount'
                className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                autoComplete='off'
                value={PremiumPackageAmount}
                onChange={(e) => setPremiumPackageAmount(Math.abs(parseInt(e.target.value)))}
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
                onClick={createPremiumAmountPackages}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SitePricingPlugin
