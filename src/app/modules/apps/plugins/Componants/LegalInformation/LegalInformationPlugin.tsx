import React, {useEffect, useState} from 'react'
import {
  UpdatePolicy,
  getAllPolicies,
  getConfigurationByName,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils from '../../../../../../utils/ToastUtils'

const LegalInformation = () => {
  const [configID, setConfigId] = useState(0)
  const [policyList, setPolicyList] = useState<any>(undefined)
  const [policyText, setPolicyText] = useState<any>()

  useEffect(() => {
    getConfiguration()
  }, [])

  const handleChange = (event: any, index: any) => {
    if (event.target.value.length !== 0) {
      let oldPolicy = [...policyList]
      oldPolicy[index]['html'] = event.target.value
      setPolicyList(oldPolicy)
      setPolicyText(event.target.value)
    }
  }

  const getConfiguration = async () => {
    let result = await getAllPolicies()
    if (result.status === 200) {
      setPolicyList(result.data)
    }
  }

  const onBlurUpdate = (policyId: any) => {
    updateConfiguration(policyId, policyText)
  }

  const updateConfiguration = async (policyId: any, htmlText: any) => {
    let result = await UpdatePolicy(policyId, htmlText)
    if (result.status === 200) {
      getConfiguration()
      ToastUtils({type: 'success', message: 'Configuration Saved SuccessFully'})
    } else {
      ToastUtils({type: 'error', message: 'Something Went Wrong'})
    }
  }

  return (
    <div className='card'>
      <div className='card-title p-8'>
        <h2>Legal Information settings</h2>
      </div>
      <div className='card-body'>
        <div className='row no-gutters'>
          {policyList !== undefined &&
            policyList.map((policy: any, index: any) => {
              return (
                <div className='row' key={index}>
                  <div className='col-lg-4 card-body bg-light'>
                    <p>
                      <strong className='headings-color'>{policy.title}</strong>
                    </p>
                  </div>
                  <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
                    <div className='flex'>
                      <textarea
                        className='form-control'
                        name='policy'
                        value={policy.html}
                        onChange={(event) => handleChange(event, index)}
                        onBlur={() => onBlurUpdate(policy.policyId)}
                        rows={10}
                        cols={60}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default LegalInformation
