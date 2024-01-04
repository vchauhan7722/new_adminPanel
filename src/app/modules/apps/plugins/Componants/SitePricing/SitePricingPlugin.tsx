import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import {FormControl, InputGroup, Table} from 'react-bootstrap'
import {
  CreateCreditPackageAmountPlan,
  CreatePremiumPackageAmountPlan,
  getCreditPackageAmountPlans,
  getPremiumPackageAmountPlans,
  updateCreditPackageAmountPlan,
  updatePremiumPackageAmountConfig,
  updatePremiumPackageAmountPlan,
} from '../../../../../../API/api-endpoint'
import ToastUtils, {ErrorToastUtils} from '../../../../../../utils/ToastUtils'

let configName = [
  {
    name: 'Chat/day',
  },
  {
    name: 'See who likes you',
  },
  {
    name: 'See who visit you',
  },
  {
    name: 'Video call',
  },
  {
    name: 'Undo profile/day',
  },
  {
    name: 'Private photo',
  },
  {
    name: 'Live stream',
  },
  {
    name: 'Upload reels',
  },
  {
    name: 'Free Credits',
  },
  {
    name: 'Spotlight',
  },
  {
    name: 'Global online',
  },
]

const SitePricingPlugin = () => {
  const [creditAmountPackages, setCreditAmountPackages] = useState<any>([])
  const [CreditPackageAmount, setCreditPackageAmount] = useState<any>('')
  const [CreditPackageCredits, setCreditPackageCredits] = useState<any>('')

  const [premiumAmountPackages, setPremiumAmountPackages] = useState<any>([])
  const [oldPremiumAmountPackages, setOldPremiumAmountPackages] = useState<any>([])
  const [PremiumPackageAmount, setPremiumPackageAmount] = useState<any>('')
  const [PremiumPackageDays, setPremiumPackageDays] = useState<any>('')
  const [PremiumPackageName, setPremiumPackageName] = useState<any>('')

  const [CreditAmountPackagesChanges, setCreditAmountPackagesChanges] = useState<any>({
    creditAmountPackagesID: 0,
    credit: 0,
    amount: 0,
  })
  const [PremiuimAmountPackagesChanges, setPremiuimAmountPackagesChanges] = useState<any>({
    PremiuimAmountPackagesID: 0,
    days: 0,
    amount: 0,
    pkgName: '',
  })

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
      ErrorToastUtils()
    }
  }

  const getPremiumAmountpackages = async () => {
    let result = await getPremiumPackageAmountPlans()
    if (result.status === 200) {
      setPremiumAmountPackages(result.data)
      setOldPremiumAmountPackages(result.data)
    }
  }

  const createPremiumAmountPackages = async () => {
    let result = await CreatePremiumPackageAmountPlan(
      PremiumPackageDays,
      PremiumPackageAmount,
      PremiumPackageName
    )
    if (result.status === 200) {
      ToastUtils({type: 'success', message: 'Premium Amount Package is Created'})
      getPremiumAmountpackages()
      setPremiumPackageAmount('')
      setPremiumPackageDays('')
      setPremiumPackageName('')
    } else {
      ErrorToastUtils()
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
    setCreditAmountPackagesChanges({
      creditAmountPackagesID: creditAmountPackagesID,
      credit: credit,
      amount: amount,
    })
    //updateCreditAmountPackages(creditAmountPackagesID, credit, amount)
  }

  const onBlurUpdateCreditAmountPackages = () => {
    updateCreditAmountPackages(
      CreditAmountPackagesChanges.creditAmountPackagesID,
      CreditAmountPackagesChanges.credit,
      CreditAmountPackagesChanges.amount
    )
  }

  const updateCreditAmountPackages = async (pkgId: any, credit: any, amount: any) => {
    let result = await updateCreditPackageAmountPlan(pkgId, credit, amount)
    if (result.status === 200) {
      ToastUtils({type: 'success', message: 'Credit Amount Package is Updated'})
    } else {
      ErrorToastUtils()
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

    setPremiuimAmountPackagesChanges({
      PremiuimAmountPackagesID: premiumPackageAmountId,
      days: days,
      amount: amount,
      pkgName: pkgName,
    })
    //updatePremiumAmountPackages(premiumPackageAmountId, days, amount, pkgName)
  }

  const onBlurUpdatePremiumAmountPackages = () => {
    updatePremiumAmountPackages(
      PremiuimAmountPackagesChanges.PremiuimAmountPackagesID,
      PremiuimAmountPackagesChanges.days,
      PremiuimAmountPackagesChanges.amount,
      PremiuimAmountPackagesChanges.pkgName
    )
  }

  const updatePremiumAmountPackages = async (pkgId: any, days: any, amount: any, pkgName: any) => {
    let result = await updatePremiumPackageAmountPlan(pkgId, days, amount, pkgName)
    if (result.status === 200) {
      ToastUtils({type: 'success', message: 'Premium Amount Package is Updated'})
    } else {
      ErrorToastUtils()
    }
  }

  //  update a premium config
  const updatePremiumAmountConfig = async (pkgId: any, days: any, amount: any, pkgConfig: any) => {
    let result = await updatePremiumPackageAmountConfig(pkgId, days, amount, pkgConfig)
    if (result.status === 200) {
      ToastUtils({type: 'success', message: 'Premium Amount Package Config is Updated'})
    } else {
      ErrorToastUtils()
    }
  }

  const handleChangePremiumAmountPackagesConfig = (event: any, premiumPkgId: any, index: any) => {
    let name = event.target.name

    let premiumPkgIndex = premiumAmountPackages.findIndex(
      (pkg: any) => pkg.premiumPackageAmountId === premiumPkgId
    )

    if (
      name === 'chat_day' ||
      name === 'undo_profile_day' ||
      name === 'live_stream' ||
      name === 'upload_reels' ||
      name === 'free_credits' ||
      name === 'spotlight'
    ) {
      let value = event.target.value.length === 0 ? 'e' : event.target.value
      let oldPremiumPackage = [...premiumAmountPackages]
      oldPremiumPackage[premiumPkgIndex]['premiumPackageConfig'][index]['value'] = value
      setPremiumAmountPackages(oldPremiumPackage)
    } else {
      let oldPremiumPackage = [...premiumAmountPackages]
      oldPremiumPackage[premiumPkgIndex]['premiumPackageConfig'][index]['value'] =
        event.target.checked
      setPremiumAmountPackages(oldPremiumPackage)
      onBlurUpdatePremiumAmountConfig(premiumPkgId)
    }
  }

  const onBlurUpdatePremiumAmountConfig = (premiumPkgId: any) => {
    let premiumPkgObject = premiumAmountPackages.filter(
      (pkg: any) => pkg.premiumPackageAmountId === premiumPkgId
    )

    // let oldpremiumPkgObject = oldPremiumAmountPackages?.filter(
    //   (pkg: any) => pkg.premiumPackageAmountId === premiumPkgId
    // )

    //console.log('premiumPkgObject', premiumPkgObject[0].premiumPackageConfig)

    updatePremiumAmountConfig(
      premiumPkgId,
      premiumPkgObject[0].days,
      premiumPkgObject[0].amount,
      premiumPkgObject[0].premiumPackageConfig
    )

    //console.log('premiumPkgObject', premiumPkgObject[0].premiumPackageConfig)
    //console.log('oldpremiumPkgObject', oldPremiumAmountPackages)
    // console.log(
    //   premiumPkgObject[0].premiumPackageConfig !== oldpremiumPkgObject[0].premiumPackageConfig
    // )

    // if any changes then and then only update
    // if (premiumPkgObject[0].premiumPackageConfig !== oldpremiumPkgObject[0].premiumPackageConfig) {
    //   console.log('272')
    //   // updatePremiumAmountConfig(
    //   //   premiumPkgId,
    //   //   premiumPkgObject[0].days,
    //   //   premiumPkgObject[0].amount,
    //   //   premiumPkgObject[0].premiumPackageConfig
    //   // )
    // }
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
                              onBlur={onBlurUpdateCreditAmountPackages}
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
                              onBlur={onBlurUpdateCreditAmountPackages}
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
              <button
                className='btn btn-primary'
                data-bs-toggle='modal'
                data-bs-target='#add_premium_plan'
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
                  <th>Days</th>
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
                              onBlur={onBlurUpdatePremiumAmountPackages}
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
                              onBlur={onBlurUpdatePremiumAmountPackages}
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
                              onBlur={onBlurUpdatePremiumAmountPackages}
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

      <div className='card p-3 mt-5'>
        <div className='card-title fs-2 fw-bold'>Premium Packages Config</div>
        <div className='row mt-4'>
          <div className='col-3 mt-13'>
            {configName.map((config: any, index: any) => {
              return (
                <div key={index} className='fs-4 mb-4 text-black'>
                  {config.name === 'Live stream' ? `${config.name} (in Minutes)` : config.name}
                </div>
              )
            })}
          </div>
          <div className='row col-9'>
            {premiumAmountPackages !== undefined &&
              premiumAmountPackages.map((packageItem: any, index: any) => (
                <>
                  <div className='col-2'>
                    <div className='mb-4'>
                      <div className='fs-7 fw-bold'>{packageItem.premiumPackageName}</div>
                    </div>
                    <hr />
                    <div key={index} className='row mb-4 '>
                      {/*className='row mb-4' */}

                      {/* Display inputs in col-4 */}
                      <div className=''>
                        {/*className='col-4' */}
                        {packageItem?.premiumPackageConfig.map(
                          (configItem: any, configIndex: any) => (
                            <div key={configIndex}>
                              {configItem.type === 'checkbox' ? (
                                <input
                                  type='checkbox'
                                  className='form-check-input mb-4'
                                  checked={configItem.value}
                                  name={configItem.name}
                                  onChange={(e) =>
                                    handleChangePremiumAmountPackagesConfig(
                                      e,
                                      packageItem.premiumPackageAmountId,
                                      configIndex
                                    )
                                  }
                                />
                              ) : (
                                <input
                                  type='number'
                                  className={clsx('form-control form-control-solid mb-4')}
                                  style={{height: '25px'}}
                                  value={configItem.value}
                                  name={configItem.name}
                                  onChange={(e) =>
                                    handleChangePremiumAmountPackagesConfig(
                                      e,
                                      packageItem.premiumPackageAmountId,
                                      configIndex
                                    )
                                  }
                                  onBlur={() =>
                                    onBlurUpdatePremiumAmountConfig(
                                      packageItem.premiumPackageAmountId
                                    )
                                  }
                                />
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <br></br>
                </>
              ))}
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
                placeholder='Enter Package Days'
                type='number'
                name='package_days'
                className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                autoComplete='off'
                value={PremiumPackageDays}
                onChange={(e) => setPremiumPackageDays(Math.abs(parseInt(e.target.value)))}
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
