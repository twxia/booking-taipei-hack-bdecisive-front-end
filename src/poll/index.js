/**
 * Created by angelachuang on 12/03/2017.
 */
import React, { Component, PropTypes } from 'react'
import Vote from '../../components/Vote'
import Layout from '../../components/Layout';
import { get as _get } from 'lodash'

class Poll extends Component {
  render() {
    return (
      <Layout>
        <Vote />
      </Layout>
    )
  }
}

Poll.defaultProps = {
}

Poll.propTypes = {
}

export default Poll
