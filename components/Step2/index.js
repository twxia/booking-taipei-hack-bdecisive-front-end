import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import UrlInput from './urlInput'

class Step2 extends Component {
  constructor(props) {
    super(props)
    let { startDate, endDate } = props,
      days = endDate.diff(startDate, 'day', true) + 1,
      defaultUrlPerDayByDefault = 1,
      daysWithUrl = []

    for (let i = 0; i < days; i++) {
      daysWithUrl.push({
        date: moment(startDate).add(i, 'day'),
        urlNum: defaultUrlPerDayByDefault
      })
    }

    this.state = {
      daysWithUrl: daysWithUrl || [],
      daysDetail: {},
    };

    this.handleDetail = this.handleDetail.bind(this);
  }

  handleDetail(date, data) {
    let daysDetail = this.state.daysDetail;
    daysDetail[date.format('YYYY-MM-DD')] = data;
    this.setState({ daysDetail: daysDetail });

    this.props.handleProposal(this.state.daysDetail);
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
                  <UrlInput date={d.date} number={d.urlNum} handleDetail={this.handleDetail} />
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
  endDate: PropTypes.object,
  handleProposal: React.PropTypes.func
}

export default Step2
