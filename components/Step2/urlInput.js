import React, { Component, PropTypes } from 'react'
import { Textfield, FABButton, Icon } from 'react-mdl'
import PreviewCard from './previewCard';
import * as request from 'superagent';
import moment from 'moment'
import { get as _get } from 'lodash'

class UrlInput extends Component {
  constructor(props) {
    super(props)
    this._onAddBtnClickd = this._onAddBtnClickd.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      urlNum: 1
    }
  }

  _onAddBtnClickd(e) {
    e.preventDefault()
    let { urlNum } = this.state
    this.setState({
      urlNum: urlNum += 1
    })
  }

  validUrl(url) {
    return url.indexOf('www.booking.com') !== -1;
  }

  displayCard() {

  }

  getHotelImages(hotelId) {
    request
      .get(`https://hacker234:8hqNW6HtfU@distribution-xml.booking.com/json/bookings.getHotelDescriptionPhotos?hotel_ids=${hotelId}`)
      .end((err, res) => {
      });
  }

  handleChange(event) {
    const value = event.target.value;
    console.log(`request: ${value}`);
    if (this.validUrl(value)) {
      request
        .get('https://taipeihacks.azurewebsites.net/getHotelByUrl')
        .query({ url: value })
        .set({
          'Accept': 'application/json'
        })
        .end((err, res) => {
          console.log(res);
          if (err) console.log(err);
        });

    }
    event.preventDefault();
  }

  render() {
    let { urlNum } = this.state,
      { date } = this.props,
      textFields = []

    for (let i = 1; i <= urlNum; i++) {
      textFields.push(
        <div key={`url-${date}-${i}`}>
          <Textfield data-date={date}
            onChange={this.handleChange}
            label="URL@Booking.com"
            style={{ width: '200px' }}
            name="url"
          />
          <PreviewCard imageUrls={['http://aff.bstatic.com/images/hotel/max300_watermarked_standard/513/51369f9e77e110b5ad05e1a4fc522f832e501fd3.jpg']} />

        </div>
      )
    }
    return (
      <div>
        <h3>{moment(date).format('YYYY-MM-DD')}</h3>
        {textFields}
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
