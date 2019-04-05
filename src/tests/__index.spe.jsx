import 'babel-polyfill'
import { mount, shallow } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils';

import {
  configureFetchDataWithRequestFail,
  configureFetchDataWithRequestSuccess
} from './configure'
import Bar from './Bar'
import DataContext from '../DataContext'
import Foos from './StateFoos'

describe('useData with Foos basic usage', () => {

  beforeEach(() => {
    fetch.resetMocks()
  })

  describe('snapshot', () => {
    it('should match snapshot', () => {
      // when
      const wrapper = shallow(<Foos />)

      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('mount with DataContext', () => {
    describe('request with success', () => {
      it.only('should render test component whith foo items', done => {
        // when
        // const store = configureTestStore()
        configureFetchDataWithRequestSuccess()

        // then
        act(() => {
          mount(
            <DataContext.Provider>
              <Foos onSuccessUpdateCallback={done} />
            </DataContext.Provider>
          )
        })
      })
    })

    describe('request with fail', () => {
      it('should render test component whith no foo items', done => {
        // when
        // const store = configureTestStore()
        configureFetchDataWithRequestFail()

        // then
        act(() => {
          mount(
            <DataContext.Provider>
              <Foos onFailUpdateCallback={done} />
            </DataContext.Provider>
          )
        })
      })
    })
  })

  describe('mount with DataContext for several components', () => {
    describe('request with success', () => {
      it('trigger success in other component than the one that did request', done => {
        // when
        // const store = configureTestStore()
        configureFetchDataWithRequestSuccess()

        // then
        act(() => {
          mount(
            <DataContext.Provider>
              <Foos />
              <Bar onSuccessUpdateCallback={done} />
            </DataContext.Provider>
          )
        })
      })
    })
  })
})
