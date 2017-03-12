/**
 * Created by angelachuang on 11/03/2017.
 */
import React, { Component, PropTypes } from 'react'
import { DataTable, TableHeader } from 'react-mdl'
import { merge as _merge, clone as _clone } from 'lodash'
import VoteResult from './voteResult'
import { Badge } from 'react-mdl'

class VoteByDate extends Component {
  render() {
    let { data, date } = this.props,
      currentDateData = data.filter((hotel, i) => hotel.checkIn === date),
      list = _clone(currentDateData).map((hotel, i) => hotel.hotelData),
      voteList = _clone(currentDateData).map((hotel, i) => ({vote: hotel.vote}))

    return list.length ? (
      <div>
        <h4>check in: {date}</h4>
        <DataTable selectable shadow={0} rowKeyColumn="id" rows={_merge(list, voteList)}>
          <TableHeader name="hotel_id">ID</TableHeader>
          <TableHeader name="image"
            cellFormatter={(imageUrl) => (<img src={imageUrl} width={120} height={100}/>)}>
          </TableHeader>
          <TableHeader name="name">name</TableHeader>
          <TableHeader name="url"
            cellFormatter={(url) => (<a href={url} target="_blank">link</a>)}>link
          </TableHeader>
          <TableHeader name="review_score">review score</TableHeader>
          <TableHeader name="city">city</TableHeader>
          <TableHeader numeric name="minrate"
            cellFormatter={(minrate) => `\$${minrate}`}
            tooltip="Price for 2 Adults pet night">Price</TableHeader>
          <TableHeader name="vote"
            cellFormatter={(vote) => (<VoteResult vote={vote} />)}
            tooltip="Who vote for this hotel?">who vote for this Hotel</TableHeader>
        </DataTable>
      </div>
    ) : false
  }
}

VoteByDate.defaultProps = {
  data: [],
  date: ''
}

VoteByDate.propTypes = {
  data: PropTypes.array,
  date: PropTypes.string
}

export default VoteByDate
