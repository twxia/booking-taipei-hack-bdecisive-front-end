import React, { Component, PropTypes } from 'react'
import Step2 from '../../components/Step2'

require('react-datepicker/dist/react-datepicker.css');

class CreatePoll extends Component {


  render() {

    return (
      <div>
        <Step2 />
      </div>
    )
  }
}

CreatePoll.defaultProps = {
}

CreatePoll.propTypes = {
}

export default CreatePoll
