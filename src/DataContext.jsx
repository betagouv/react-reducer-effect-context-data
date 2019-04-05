// from https://www.codementor.io/sambhavgore/an-example-use-context-and-hooks-to-share-state-between-different-components-sgop6lnrd
// https://medium.com/@jaryd_34198/seamless-api-requests-with-react-hooks-part-1-7531849d8381
import PropTypes from "prop-types"
import React, { createContext, useEffect, useState } from "react"

import { dataEffect } from './dataEffect'
import {
  getConfigWithDefaultValues,
  getTypeSuffixFromConfig
} from './utils'

export const Context = createContext({})
export default Context

export const Provider = props => {

  const { children, config: providerConfig, data: initialData,  } = props

  const state = useState(initialData)

  function requestData(config) {

    let localConfig = Object.assign({}, providerConfig, config)
    localConfig = getConfigWithDefaultValues(localConfig)

    useEffect(() => { dataEffect(state, localConfig) })

    return {
      config: localConfig,
      type: `REQUEST_DATA_${getTypeSuffixFromConfig(localConfig)}`
    }
  }

  const [data, setData] = state
  const value = {
    data,
    requestData,
    setData,
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.node,
  config: PropTypes.shape(),
  data: PropTypes.shape()
}

Provider.defaultProps = {
  children: null,
  config: null,
  data: {}
}

export const { Consumer } = Context
