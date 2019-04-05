import React, { useContext } from 'react'

import { createDataContext } from './createDataContext'

export const withData = (config, mapDataToProps) => WrappedComponent => {
  const DataContext = createDataContext(config)

  const DataProvider = props => (
    <DataContext.Provider>
      <Mapper {...props} />
    </DataContext.Provider>
  )

  const Mapper = props => {
    const { data, dispatch, requestDataEffect } = useContext(DataContext)
    const dataProps = mapDataToProps(data, props)
    return (
      <WrappedComponent
        {...props}
        {...dataProps}
        dispatch={dispatch}
        requestDataEffect={requestDataEffect}
      />
    )
  }

  return DataProvider
}

export default withData
