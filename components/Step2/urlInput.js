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
      urlsPreviewDetail: {},
    };
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

  getHotelImages(hotelId) {
    return new Promise((resolve, reject) => {
      request
        .get(`https://distribution-xml.booking.com/json/bookings.getHotelDescriptionPhotos?hotel_ids=${hotelId}`)
        .auth('hacker234', '8hqNW6HtfU')
        .end((err, res) => {
          const body = res.body;
          const urls = body.map(d => d.url_max300);

          if (err) reject(err);
          resolve(urls);
        });
    });
  }

  handleChange(event) {
    const { id, value } = event.target;
    console.log(`request: ${value}`);

    if (this.validUrl(value)) {
      event.target.disabled = true;
      request
        .get('http://taipeihack.patricks.tw/getHotelByUrl')
        .query({ url: value })
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            const body = res.body;
            const { address, hotel_id, name, url } = body.data[0];
            const info = {
              id: hotel_id,
              address: address,
              name: name,
              url: url,
            };
            let urlsPreviewDetail = this.state.urlsPreviewDetail;
            
            this.getHotelImages(hotel_id).then((urls) => {
              event.target.remove();
              urlsPreviewDetail[id] = {
                info: info,
                imageUrls: urls,
              };
              this.setState({ urlsPreviewDetail: urlsPreviewDetail });
              this.props.handleDetail(this.props.date, this.state.urlsPreviewDetail);
              event.target.disabled = false;
            }).catch((err) => {
              console.log(err);
              event.target.disabled = false;
            });
          }
        });
    }
    event.persist();
    event.preventDefault();
  }

  render() {
    let { urlNum } = this.state,
      { date } = this.props,
      textFields = []

    for (let i = 1; i <= urlNum; i++) {
      const key = `url-${date}-${i}`;
      const previews = this.state.urlsPreviewDetail[key];
      const imageUrls = (previews) ? previews.imageUrls : [];
      const info = (previews) ? previews.info : { name: '', address: '', url: '' };
      textFields.push(
        <div key={key}>
          <Textfield data-date={date}
            id={key}
            onChange={this.handleChange}
            label="URL@Booking.com"
            style={{ width: '200px' }}
            name="url"
          />
          <PreviewCard style={{ display: (previews) ? 'block' : 'none', marginBottom: '24px' }} imageUrls={imageUrls} info={info} />
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
  date: PropTypes.object,
  handleDetail: React.PropTypes.func,
}

export default UrlInput
