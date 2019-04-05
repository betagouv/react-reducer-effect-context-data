import { useReducer } from 'react'

import { failData, successData } from './actionCreators'
import { fetchData } from './fetchData'
import { getUrlFromConfig } from './getUrlFromConfig'
import { isSuccessStatus } from './status'

export const createDataEffect = (dataReducer, config) => {
  const { handleFail, handleSuccess } = config

  const [data, dispatch] = useReducer(dataReducer, initialState)

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
        dispatch(successData(action, config))

        if (handleSuccess) {
          handleSuccess(data, action)
        }

        return
      }

      if (payload.errors) {

        dispatch(failData(payload, config))

        if (handleFail) {
          handleFail(data, action)
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
      dispatch(failData({ payload: { errors } }, config))

      handleFail(data, { config, payload: { errors } })

      throw Error(errors)
    }
  }

  return dataEffect
}

export default createDataEffect
