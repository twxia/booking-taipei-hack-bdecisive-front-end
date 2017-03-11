import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import UrlInput from './urlInput'
import { Button } from 'react-mdl'

class Step2 extends Component {
  constructor(props) {
    super(props)
    let { startDate, endDate } = props,
      days = endDate.diff(startDate, 'day', true) + 1,
      defaultUrlPerDayByDefault = 1,
      daysWithUrl = []

    for (let i=0; i< days ;i++) {
      daysWithUrl.push({
        date: moment(startDate).add(i, 'day'),
        urlNum: defaultUrlPerDayByDefault
      })
    }

    this.state = {
      daysWithUrl: daysWithUrl || []
    }
  }


  render() {
    let { daysWithUrl } = this.state

    return (
      <div>
        {
          daysWithUrl.map((d, i) => {
            return (
              <div key={`${d.date}-${i}`} className="mdl-typography--text-center">
                {
                  <UrlInput date={d.date} number={d.urlNum} />
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

Step2.defaultProps = {
  startDate: moment(),
  endDate: moment().add(2, 'day')
}

Step2.propTypes = {
  startDate: PropTypes.object,
  endDate: PropTypes.object
}

export default Step2
