import PropTypes from 'prop-types'
import React, { Fragment, useContext } from 'react'

import { DataContext } from './DataContext'

const Foos = props => {
  const { onFailUpdateCallback, onSuccessUpdateCallback } = props
  const { data, requestData } = useContext(DataContext)
  const { foos } = data || {}

  if (foos && foos.length === 2) {
    onSuccessUpdateCallback()
  }

  requestData({
    apiPath: '/foos',
    handleFail: () => onFailUpdateCallback(),
  })
  return (
    <Fragment>
      {(foos || []).map(foo => (
        <div className="foo" key={foo.id}>
          {foo.text}
        </div>
      ))}
    </Fragment>
  )
}

Foos.defaultProps = {
  onFailUpdateCallback: () => {},
  onSuccessUpdateCallback: () => {}
}

Foos.propTypes = {
  onFailUpdateCallback: PropTypes.func,
  onSuccessUpdateCallback: PropTypes.func
}

export default Foos
