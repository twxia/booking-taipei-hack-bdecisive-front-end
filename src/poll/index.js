/**
 * Created by angelachuang on 12/03/2017.
 */
import React, { Component, PropTypes } from 'react'
import Vote from '../../components/Vote'
import { get as _get } from 'lodash'

class Poll extends Component {
  render() {
    return (
      <Vote />
    )
  }
}

Poll.defaultProps = {
}

Poll.propTypes = {
}

export default Poll
