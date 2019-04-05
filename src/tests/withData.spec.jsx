import 'babel-polyfill'
import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils';

import {
  configureFetchDataWithRequestSuccess
} from './configure'
import Foos from './BetterFoos'
import { withData } from '../withData'

describe('useData with Foos basic usage', () => {

  beforeEach(() => {
    fetch.resetMocks()
  })

  describe('mount with DataContext', () => {
    describe('request with success', () => {
      it.only('should render test component whith foo items', done => {
        // when
        configureFetchDataWithRequestSuccess()
        const mapDataToProps = (data, props) => ({
          foos: data.foos.filter(foo => foo.type === props.type)
        })
        const FoosContainer = withData(mapDataToProps)(Foos)

        // then
        act(() => {
          mount(<FoosContainer type="good" onSuccessUpdateCallback={done} />)
        })
      })
    })
  })
})
