import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import { get as _get, merge as _merge, clone as _clone } from 'lodash'
import VoteByDate from './voteByDate'
import request from 'superagent'

class Vote extends Component {
  constructor(props) {
    super(props)
    this._getPollData = this._getPollData.bind(this)
    this._getHotelImages = this._getHotelImages.bind(this)
    this.state = {
      voteList: {}
    }
  }

  componentDidMount() {
    this._getPollData()
  }

  _getPollData(pollId = '7f1d14239e8d1b52f0c8debce9e8fc4f36f697ea') {
    request.get(`http://taipeihack.patricks.tw/poll/${pollId}`)
      .set({'Accept': 'application/json'})
      .end((err, res) => {
        if (err) return
        let voteList =  _get(res, 'body', []),
          hotelIdList = _clone(voteList.data).map((d, i) => d.booking_id).concat()
        this._getHotelImages(hotelIdList)
          .then((urls) => {
            let data = voteList.data || []
            _merge(data, urls)
            voteList.data = data
            this.setState({ voteList: voteList })
          })
      })

  }

  _getHotelImages(hotelId) {
    return new Promise((resolve, reject) => {
      request
        .get(`https://distribution-xml.booking.com/json/bookings.getHotelDescriptionPhotos?hotel_ids=${hotelId}`)
        .auth('hacker234', '8hqNW6HtfU')
        .end((err, res) => {
          const body = res.body;
          const urls = body.map(d => ({ hotelData: {image: d.url_max300}}));

          if (err) reject(err);
          resolve(urls);
        });
    });
  }

  render() {
    let voteList = this.props.voteList,
      data = _get(voteList, 'data', []),
      title = _get(voteList, 'title', ''),
      startDate = _get(voteList, 'startDate', ''),
      endDate = _get(voteList, 'endDate', ''),
      startDateObject = moment(startDate),
      endDateOcject = moment(endDate),
      diffDays = endDateOcject.diff(startDateObject, 'day', true) + 1,
      voteGroup = []

    for(var i=0; i<diffDays; i++) {
      voteGroup.push({
        date: startDateObject.add(i, 'day').format('YYYY-MM-DD')
      })
    }

    return (
      <div>
        <h3>{ title }</h3>
        <h4>travel start date: { startDate }</h4>
        <h4>travel end date: { endDate }</h4>
        {
          voteGroup.map((dateGroup, i) => (
              <VoteByDate key={`group-${dateGroup.date}`}
                date={dateGroup.date}
                data={data} />
            )
          )
        }
      </div>
    )
  }
}

Vote.defaultProps = {
  voteList: {
    id: '123abc',
    title: 'Where are we going to stay in Tokyo?',
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().add(2, 'day').format('YYYY-MM-DD'),
    personAmount: 2,
    data: [
      {
        hotelData: {
          'image': 'http://t-ec.bstatic.com/images/hotel/square200/485/4852587.jpg',
          'id': 419820,
          'name': 'ezBookers - Fuxing A',
          'city': 'Taipei',
          'minrate': 1880,
          'review_score': 7.2
        },
        checkIn: '2017-03-12',
        checkOut: '2017-03-13',
        note: 'note',
        location: 'hotel location',
        vote: [
          {
            name: 'Anne Chen',
            reaction: 1
          },
          {
            name: 'Peter Lee',
            reaction: -1
          },
          {
            name: 'Lucy Chou',
            reaction: 1
          },
          {
            name: 'Chester Li',
            reaction: 0
          }
        ]
      },
      {
        hotelData: {
          'image': 'http://s-ec.bstatic.com/images/hotel/square200/738/7387579.jpg',
          'id': 382029,
          'name': 'Shangri-la\'s Far Eastern Plaza Hotel, Taipei',
          'city': 'Taipei',
          'minrate': 1980,
          'review_score': 7.6
        },
        checkIn: '2017-03-12',
        checkOut: '2017-03-13',
        note: 'note',
        location: 'hotel location',
        vote: [
          {
            name: 'Anne Chen',
            reaction: 1
          },
          {
            name: 'Peter Lee',
            reaction: 1
          },
          {
            name: 'Lucy Chou',
            reaction: 1
          },
          {
            name: 'Chester Li',
            reaction: 0
          }
        ]
      },
      {
        hotelData: {
          'image': 'http://s-ec.bstatic.com/images/hotel/square200/535/53536605.jpg',
          'id': 327938,
          'name': 'Dolamanco Hotel',
          'city': 'Taipei',
          'minrate': 2700,
          'review_score': 7.8
        },
        checkIn: '2017-03-13',
        checkOut: '2017-03-14',
        note: 'note',
        location: 'hotel location',
        vote: [
          {
            name: 'Anne Chen',
            reaction: 0
          },
          {
            name: 'Peter Lee',
            reaction: -1
          },
          {
            name: 'Lucy Chou',
            reaction: 1
          },
          {
            name: 'Chester Li',
            reaction: 0
          }
        ]
      },
      {
        hotelData: {
          'image': 'http://t-ec.bstatic.com/images/hotel/square200/447/44796857.jpg',
          'id': 311840,
          'name': 'Royal Palace Hotel',
          'city': 'Taipei',
          'minrate': 2880,
          'review_score': 8.2
        },
        checkIn: '2017-03-13',
        checkOut: '2017-03-14',
        note: 'note',
        location: 'hotel location',
        vote: [
          {
            name: 'Anne Chen',
            reaction: 1
          },
          {
            name: 'Peter Lee',
            reaction: 1
          },
          {
            name: 'Lucy Chou',
            reaction: 1
          },
          {
            name: 'Chester Li',
            reaction: 0
          }
        ]
      }
    ]
  }
};

Vote.propTypes = {
};

export default Vote
