import React, { Component, PropTypes } from 'react'
import { Textfield, FABButton, Icon } from 'react-mdl'
import moment from 'moment'
import { get as _get } from 'lodash'

class UrlInput extends Component {
  constructor(props) {
    super(props)
    this._onAddBtnClickd = this._onAddBtnClickd.bind(this)
    this.state = {
      urlNum: 1
    }
  }

  _onAddBtnClickd(e) {
    e.preventDefault()
    let { urlNum } = this.state
    this.setState({
      urlNum: urlNum+=1
    })
  }

  render() {
    let { urlNum } = this.state,
      { date } = this.props,
      textFields = []

    for(let i=1; i<= urlNum; i++) {
      textFields.push(
        <div key={`url-${date}-${i}`}>
          <Textfield data-date={date}
            onChange={() => {}}
            label="URL@Booking.com"
            style={{width: '200px'}}
            name="url"
          />
        </div>
      )
    }
    return (
      <div>
        <h3>{moment(date).format('YYYY-MM-DD')}</h3>
        { textFields }
        <div>
          <FABButton mini colored onClick={this._onAddBtnClickd}>
            <Icon name="add" />
          </FABButton>
        </div>
      </div>
    )
  }
}

UrlInput.defaultProps = {
  date: ''
}

UrlInput.propTypes = {
  date: PropTypes.object
}

export default UrlInput
