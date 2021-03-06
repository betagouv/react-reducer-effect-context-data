import PropTypes from 'prop-types'
import React, { Fragment, useContext } from 'react'

import { DataContext } from './DataContext'
import { requestData } from '../actionCreators'

const Foos = props => {
  const { onSuccessUpdateCallback } = props
  const { data, dispatch } = useContext(DataContext)
  const { foos } = data || {}
  dispatch(requestData({ apiPath: '/foos' }))

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

Foos.defaultProps = {
  onSuccessUpdateCallback: () => {}
}

Foos.propTypes = {
  onSuccessUpdateCallback: PropTypes.func
}

export default Foos
