import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

const Foos = ({ foos, requestDataEffect, onSuccessUpdateCallback }) => {
  requestDataEffect({ apiPath: '/foos' })

  if (foos && foos.length === 2) {
    onSuccessUpdateCallback()
  }
  return (
    <Fragment>
      {(foos || []).map(bar => (
        <div className="bar" key={bar.id}>
          {bar.text}
        </div>
      ))}
    </Fragment>
  )
}

Foos.defaultProps = {
  foos: null,
  onSuccessUpdateCallback: () => {}
}

Foos.propTypes = {
  foos: PropTypes.arrayOf(PropTypes.shape()),
  onSuccessUpdateCallback: PropTypes.func
}

export default Foos
