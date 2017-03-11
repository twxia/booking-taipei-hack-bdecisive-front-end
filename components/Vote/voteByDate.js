/**
 * Created by angelachuang on 11/03/2017.
 */
import React, { Component, PropTypes } from 'react'
import { DataTable, TableHeader } from 'react-mdl'

class VoteByDate extends Component {
  render() {
    const tableHeaders = ['id', 'image', 'name', 'city', 'minrate'];
    let { data, date } = this.props,
      list = data.filter((hotel, i) => hotel.checkIn === date)
        .map((hotel, i) => hotel.hotelData);

    return list.length ? (
      <DataTable
        selectable
        shadow={0}
        rowKeyColumn="id"
        rows={list}>
        {
          tableHeaders.map((col) => (
              <TableHeader key={`${col}`}
                name={col}
                tooltip={col}>
                {col}
              </TableHeader>
            )
          )
        }
      </DataTable>
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
