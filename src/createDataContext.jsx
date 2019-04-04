// from https://www.codementor.io/sambhavgore/an-example-use-context-and-hooks-to-share-state-between-different-components-sgop6lnrd
// https://medium.com/@jaryd_34198/seamless-api-requests-with-react-hooks-part-1-7531849d8381
import PropTypes from "prop-types"
import React, { createContext, useState } from "react"

import { createDataEffect } from './createDataEffect'
import {
  getConfigWithDefaultValues,
  getTypeSuffixFromConfig
} from './utils'

export const createDataContext = extraConfig => {
  const Context = createContext({})
  const BaseProvider = Context.Provider

  const Provider = props => {

    const { children, data: initialData } = props

    const [data, setData] = useState(initialData)

    function requestData(config) {

      let localConfig = Object.assign({}, extraConfig, config)
      localConfig = getConfigWithDefaultValues(localConfig)

      createDataEffect(data, setData, localConfig)

      return {
        config: localConfig,
        type: `REQUEST_DATA_${getTypeSuffixFromConfig(localConfig)}`
      }
    }

    const value = {
      data,
      requestData,
      setData,
    }

    return (
      <BaseProvider value={value}>
        {children}
      </BaseProvider>
    )
  }

  Provider.propTypes = {
    children: PropTypes.node,
    data: PropTypes.shape()
  }

  Provider.defaultProps = {
    children: null,
    data: {}
  }

  Context.Provider = Provider

  return Context
}

export default createDataContext
