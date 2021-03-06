import { fetchData } from './fetchData'
import { getUpdatedState } from './getUpdatedState'
import { getUrlFromConfig } from './getUrlFromConfig'
import { isSuccessStatus } from './status'

export async function dataEffect(state, config) {
  const [data, setData] = state
  const { handleFail, handleSuccess } = config

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

export default dataEffect
