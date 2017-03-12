import React, { Component, PropTypes } from 'react'
import { Chip, ChipContact } from 'react-mdl'

class VoteResult extends Component {
  render() {
    let { vote } = this.props,
      sum = 0
    return (
      <ul>
        {
          vote.map((v, i) => {
            sum += v.reaction
            return v.reaction ? (
              <li key={`vote-${i}`}>
                <Chip>
                  <ChipContact className={`mdl-color--${v.reaction > 0 ? 'red' : 'teal'} mdl-color-text--white`}>
                    { v.reaction > 0 ? '♥' : 'x' }
                  </ChipContact>
                  {v.name}
                </Chip>
              </li>
            ) : false
          })
        }
        <li>
          SCORE:{sum}
        </li>
      </ul>
    )
  }
}

VoteResult.defaultProps = {
  vote: []
}

VoteResult.propTypes = {
  vote: PropTypes.array
}

export default VoteResult
