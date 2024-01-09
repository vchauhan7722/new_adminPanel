import React, {useEffect, useState} from 'react'
import {
  getConfigurationByName,
  getPremiumPackageAmountPlans,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils, {ErrorToastUtils} from '../../../../../../utils/ToastUtils'

const RewardPlugin = () => {
  const [configID, setConfigId] = useState(0)
  const [premiumPackageName, setPremiumPackageName] = useState<any>([])
  const [rewardConfig, setRewardConfig] = useState<any>({
    initialCredit: 200,
    isEnableRewards: true,
    genderId: 2,
    freePremium: 30,
    profileCompleteCredit: 100,
    PremiumPackageID: 1,
  })

  useEffect(() => {
    getConfiguration()
    getPremiumPlans()
  }, [])

  const getPremiumPlans = async () => {
    let response = await getPremiumPackageAmountPlans()

    const newArray = response.data.map((item) => {
      return {
        premiumPackageAmountId: item.premiumPackageAmountId,
        premiumPackageName: item.premiumPackageName,
      }
    })
    setPremiumPackageName(newArray)
  }

  const handleChange = (event: any) => {
    let name = event.target.name
    let value = event.target.checked

    if (name !== 'isEnableRewards') {
      setRewardConfig({...rewardConfig, [name]: event.target.value})
      if (name === 'genderId' || name === 'PremiumPackageID') {
        updateConfiguration({...rewardConfig, [name]: event.target.value})
      }
    } else {
      setRewardConfig({...rewardConfig, [name]: value})
      updateConfiguration({...rewardConfig, [name]: value})
    }
  }

  const getConfiguration = async () => {
    let result = await getConfigurationByName('rewards')
    if (result.status === 200) {
      let parsedData = JSON.parse(result.data.values)
      setConfigId(result.data.id)
      setRewardConfig({
        initialCredit: parsedData?.initialCredit,
        isEnableRewards: parsedData?.isEnableRewards,
        genderId: parsedData?.genderId,
        freePremium: parsedData?.freePremium,
        profileCompleteCredit: parsedData?.profileCompleteCredit,
        PremiumPackageID: parsedData?.PremiumPackageID,
      })
    }
  }

  const updateConfiguration = async (config: any) => {
    let result = await updateConfigurationByConfigID(configID, config, null)
    if (result.status === 200) {
      getConfiguration()
      ToastUtils({type: 'success', message: 'Configuration Saved SuccessFully'})
    } else {
      ErrorToastUtils()
    }
  }

  const onBlurUpdate = () => {
    updateConfiguration(rewardConfig)
  }

  return (
    <div className='card'>
      <div className='card-title p-8'>
        <h2>Reward settings</h2>
      </div>
      <div className='card-body'>
        <div className='row no-gutters'>
          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Enable Rewards plugin</strong>
            </p>
            <p className='text-muted'>Enable or disable Rewards plugin</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='isEnableRewards'
                checked={rewardConfig.isEnableRewards}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>New accounts free credits</strong>
            </p>
            <p className='text-muted'>Give some free credits to new account users</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='number'
                className='form-control'
                name='initialCredit'
                value={rewardConfig.initialCredit}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Give free premium to new accounts</strong>
            </p>
            <p className='text-muted'>Give free premium in days to new accounts</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='number'
                className='form-control'
                name='freePremium'
                value={rewardConfig.freePremium}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Give Profile Complete Credit</strong>
            </p>
            <p className='text-muted'>Give Profile Complete Credit to new accounts</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='number'
                className='form-control'
                name='profileCompleteCredit'
                value={rewardConfig.profileCompleteCredit}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Filter free premium</strong>
            </p>
            <p className='text-muted'>
              Only the selected gender will get the free premium reward to new account
            </p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-kt-user-table-filter='gender'
                data-hide-search='true'
                //defaultValue={rewardConfig.search}
                name='genderId'
                value={rewardConfig.genderId}
                onChange={(event) => handleChange(event)}
              >
                <option value={0}>All Gender</option>
                <option value={1}>Male</option>
                <option value={2}>Female</option>
              </select>
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Premium Package Name</strong>
            </p>
            <p className='text-muted'>Only the selected Premium Package will give to new account</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-hide-search='true'
                //defaultValue={rewardConfig.search}
                name='PremiumPackageID'
                value={rewardConfig.PremiumPackageID}
                onChange={(event) => handleChange(event)}
              >
                {premiumPackageName.map((pkg: any, index: any) => {
                  return (
                    <option key={index} value={pkg.premiumPackageAmountId}>
                      {pkg.premiumPackageName}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RewardPlugin
