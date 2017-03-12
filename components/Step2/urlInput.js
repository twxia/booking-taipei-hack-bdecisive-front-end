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
      urlNum: 1,
      previewImageUrls: [],
      previewInfo: {
        name: '',
        address: '',
        url: '',
      },
    };

    this.getHotelImages = this.getHotelImages.bind(this);
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
      .get(`https://distribution-xml.booking.com/json/bookings.getHotelDescriptionPhotos?hotel_ids=${hotelId}`)
      .auth('hacker234', '8hqNW6HtfU')
      .end((err, res) => {
        const body = res.body;
        const urls = body.map(d => d.url_max300);

        this.setState({ previewImageUrls: urls });
      });
  }

  handleChange(event) {
    const value = event.target.value;
    console.log(`request: ${value}`);
    if (this.validUrl(value)) {
      request
        .get('https://taipeihacks.azurewebsites.net/getHotelByUrl')
        .query({ url: value })
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            const body = res.body;
            const { address, hotel_id, name, url } = body.data[0];
            const info = {
              address: address,
              name: name,
              url: url,
            };
            this.setState({ previewInfo: info });
            this.getHotelImages(hotel_id);
          }
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
          <PreviewCard imageUrls={this.state.previewImageUrls} info={this.state.previewInfo} />

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
