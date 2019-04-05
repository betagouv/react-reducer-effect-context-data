import PropTypes from 'prop-types'
import React, { Fragment, useContext } from 'react'

import { DataContext } from './DataContext'

const Bar = props => {
  const { onSuccessUpdateCallback } = props
  const { data } = useContext(DataContext)
  const { foos } = data || {}
  if (foos && foos.length === 2) {
    onSuccessUpdateCallback()
  }
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

Bar.defaultProps = {
  onSuccessUpdateCallback: () => {}
}

Bar.propTypes = {
  onSuccessUpdateCallback: PropTypes.func
}

export default Bar
