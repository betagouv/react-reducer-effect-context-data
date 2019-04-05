// from https://www.codementor.io/sambhavgore/an-example-use-context-and-hooks-to-share-state-between-different-components-sgop6lnrd
// https://medium.com/@jaryd_34198/seamless-api-requests-with-react-hooks-part-1-7531849d8381
import PropTypes from "prop-types"
import React, { createContext, useEffect, useReducer } from "react"

import { dataEffect } from './dataEffect'
import { createDataReducer } from './createDataReducer'
import { getConfigWithDefaultValues } from './utils'

export const createDataContext = (extraConfig={}) => {
  const { initialState } = extraConfig
  const Context = createContext({})
  const BaseProvider = Context.Provider

  const dataReducer = createDataReducer(initialState)

  const Provider = props => {
    const { children } = props
    const reducer = useReducer(dataReducer, initialState)
    const [data, dispatch] = reducer

    function requestDataEffect (config) {
      const effectConfig = getConfigWithDefaultValues(
        Object.assign({}, extraConfig, config)
      )
      useEffect(() => { dataEffect(reducer, effectConfig) }, [dispatch])
    }

    const value = {
      data,
      dispatch,
      requestDataEffect
    }

    return (
      <BaseProvider value={value}>
        {children}
      </BaseProvider>
    )
  }

  Provider.propTypes = {
    children: PropTypes.node
  }

  Provider.defaultProps = {
    children: null
  }

  Context.Provider = Provider

  return Context
}

export default createDataContext
