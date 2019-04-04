// https://medium.com/@jaryd_34198/seamless-api-requests-with-react-hooks-part-1-7531849d8381
import { useEffect } from "react"

import { fetchData } from './fetchData'
import { getUpdatedState } from './getUpdatedState'
import { getUrlFromConfig } from './getUrlFromConfig'
import { isSuccessStatus } from './status'

export const createDataEffect = (data, setData, config) => {
  const { handleFail, handleSuccess } = config

  async function dataEffect() {
    const url = getUrlFromConfig(config)

    const fetchDataMethod = config.fetchData || fetchData

    try {

      const fetchResult = await fetchDataMethod(url, config)

      if (!fetchResult) {
        return
      }

      const { ok, payload, status } = fetchResult
      Object.assign(config, { ok, status })
      const action = { config, payload }

      const isSuccess = isSuccessStatus(status)

      if (isSuccess) {
        const updatedState = getUpdatedState(data, action)
        setData(updatedState)

        if (handleSuccess) {
          handleSuccess(data, action)
        }

        return
      }

      if (payload.errors) {
        if (handleFail) {
          handleSuccess(data, action)
        }
        throw Error(payload.errors)
      }

    } catch (error) {
      Object.assign(config, { ok: false, status: 500 })
      const errors = [
        {
          global: ['Erreur serveur. Tentez de rafraîchir la page.'],
        },
        {
          data: [String(error)],
        },
      ]
      const action = { payload: errors }
      handleSuccess(data, action)
      throw Error(errors)
    }
  }


  useEffect(() => { dataEffect() })
}

export default createDataEffect
